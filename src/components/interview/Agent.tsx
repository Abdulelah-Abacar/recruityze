"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";
import {
  Mic,
  PhoneOff,
  Phone,
  Timer,
  ChevronDown,
  MessageCircle,
  Volume2,
  Loader2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    // Set up audio analyzer for volume visualization
    const setupAudioAnalyzer = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        const updateVolume = () => {
          if (analyserRef.current && callStatus === CallStatus.ACTIVE) {
            const dataArray = new Uint8Array(
              analyserRef.current.frequencyBinCount,
            );
            analyserRef.current.getByteFrequencyData(dataArray);
            const average =
              dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
            setVolumeLevel(Math.min(100, average * 2)); // Scale to 0-100
            animationFrameRef.current = requestAnimationFrame(updateVolume);
          }
        };

        updateVolume();
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    if (callStatus === CallStatus.ACTIVE) {
      setupAudioAnalyzer();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [callStatus]);

  useEffect(() => {
    // Scroll to bottom of messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      // Start timer
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsProcessing(true);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.error("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interviews/interview/${interviewId}/feedback`);
      } else {
        router.push("/interviews");
      }
    };

    if (
      callStatus === CallStatus.FINISHED &&
      messages.length > 0 &&
      isProcessing
    ) {
      if (type === "generate") {
        router.push("/interviews");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [
    messages,
    callStatus,
    feedbackId,
    interviewId,
    router,
    type,
    userId,
    isProcessing,
  ]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      const formattedQuestions =
        questions?.map((q) => `- ${q}`).join("\n") || "";
      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-8">
      {/* Status Bar */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex w-full items-center justify-between rounded-lg bg-gray-100 p-4 shadow-sm dark:bg-gray-800"
      >
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "px-3 py-1",
              callStatus === CallStatus.INACTIVE &&
                "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
              callStatus === CallStatus.CONNECTING &&
                "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
              callStatus === CallStatus.ACTIVE &&
                "animate-pulse bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
              callStatus === CallStatus.FINISHED &&
                "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
            )}
          >
            {callStatus === CallStatus.INACTIVE && "Ready to Start"}
            {callStatus === CallStatus.CONNECTING && "Connecting..."}
            {callStatus === CallStatus.ACTIVE && "Interview in Progress"}
            {callStatus === CallStatus.FINISHED && "Interview Complete"}
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          {(callStatus === CallStatus.ACTIVE ||
            callStatus === CallStatus.FINISHED) && (
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="font-mono">{formatTime(callDuration)}</span>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTranscript(!showTranscript)}
            className="gap-1"
          >
            <MessageCircle className="h-4 w-4" />
            {showTranscript ? "Hide" : "Show"} Transcript
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                showTranscript && "rotate-180",
              )}
            />
          </Button>
        </div>
      </motion.div>

      {/* Main Interview Interface */}
      <div className="grid w-full gap-6 md:grid-cols-2">
        {/* AI Interviewer Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full overflow-hidden border-0 shadow-md">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:from-blue-950/40 dark:to-indigo-950/40">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full",
                      isSpeaking &&
                        "animate-ping-slow bg-primary/20 dark:bg-primary/30",
                    )}
                  />
                  <Image
                    src="/ai-avatar.png"
                    alt="AI Interviewer"
                    width={150}
                    height={150}
                    className="rounded-full border-4 border-white shadow-md dark:border-gray-800"
                  />
                  {isSpeaking && (
                    <div className="absolute -right-1 bottom-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md dark:bg-gray-800">
                      <Volume2 className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                <CardTitle className="mb-1 text-2xl">AI Interviewer</CardTitle>
                <Badge
                  className={cn(
                    "mt-2",
                    isSpeaking
                      ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
                  )}
                >
                  {isSpeaking ? "Speaking" : "Listening"}
                </Badge>
              </div>
            </div>

            <CardFooter className="flex justify-center bg-white p-4 dark:bg-gray-900">
              {isSpeaking && (
                <div className="flex h-8 w-full items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 rounded-full bg-primary/80"
                      style={{
                        height: `${20 + Math.random() * 20}px`,
                        animation: `soundWave 0.5s ease infinite alternate`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}
              {!isSpeaking && callStatus === CallStatus.ACTIVE && (
                <div className="text-sm italic text-gray-500 dark:text-gray-400">
                  Listening to your response...
                </div>
              )}
            </CardFooter>
          </Card>
        </motion.div>

        {/* User Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full overflow-hidden border-0 shadow-md">
            <div className="bg-gradient-to-r from-gray-50 to-slate-100 p-6 dark:from-gray-900 dark:to-slate-900">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Image
                    src="/user-avatar.png"
                    alt={userName}
                    width={150}
                    height={150}
                    className="rounded-full border-4 border-white shadow-md dark:border-gray-800"
                  />
                  {callStatus === CallStatus.ACTIVE && !isSpeaking && (
                    <div className="absolute -right-1 bottom-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md dark:bg-gray-800">
                      <Mic className="h-5 w-5 text-blue-500" />
                    </div>
                  )}
                </div>
                <CardTitle className="mb-1 text-2xl">{userName}</CardTitle>
                <Badge
                  variant="outline"
                  className="mt-2 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/50 dark:text-blue-400"
                >
                  Candidate
                </Badge>
              </div>
            </div>

            <CardFooter className="bg-white p-4 dark:bg-gray-900">
              {callStatus === CallStatus.ACTIVE && !isSpeaking && (
                <div className="w-full">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Voice level
                    </span>
                    <span className="text-xs font-medium">
                      {Math.round(volumeLevel)}%
                    </span>
                  </div>
                  <Progress value={volumeLevel} className="h-2" />
                </div>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Transcript Panel */}
      <AnimatePresence>
        {showTranscript && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full"
          >
            <Card className="w-full border-2 border-gray-200 shadow-md dark:border-gray-700">
              <CardHeader className="bg-gray-50 pb-3 dark:bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Interview Transcript
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-white dark:bg-gray-800"
                  >
                    {messages.length} messages
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto p-0">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: idx === messages.length - 1 ? 0.1 : 0,
                      }}
                      className={cn(
                        "p-4",
                        msg.role === "assistant"
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : "bg-white dark:bg-gray-900",
                      )}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={
                                msg.role === "assistant"
                                  ? "/ai-avatar.png"
                                  : "/user-avatar.png"
                              }
                              alt={msg.role === "assistant" ? "AI" : userName}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="mb-1 font-medium">
                            {msg.role === "assistant"
                              ? "AI Interviewer"
                              : userName}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call Controls */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.3 }}
        className="w-full max-w-md"
      >
        {callStatus === CallStatus.INACTIVE && (
          <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-6">
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-xl font-bold">
                  Ready to Begin Your Interview
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Click the button below to start your interview session
                </p>
              </div>

              <Button
                size="lg"
                onClick={handleCall}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-6 text-lg shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg dark:bg-primary/90 dark:hover:bg-primary/80"
              >
                <Phone className="h-5 w-5" />
                Start Interview
              </Button>
            </CardContent>
          </Card>
        )}

        {callStatus === CallStatus.CONNECTING && (
          <Card className="border-0 bg-yellow-50 p-6 text-center shadow-md dark:bg-yellow-900/20">
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-yellow-500 dark:text-yellow-400" />
              <div>
                <h3 className="text-lg font-medium">Connecting to Interview</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Please wait while we set up your session...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {callStatus === CallStatus.ACTIVE && (
          <Button
            variant="destructive"
            size="lg"
            onClick={handleDisconnect}
            className="w-full gap-2 py-6 text-lg shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <PhoneOff className="h-5 w-5" />
            End Interview
          </Button>
        )}

        {callStatus === CallStatus.FINISHED && isProcessing && (
          <Card className="border-0 bg-blue-50 p-6 text-center shadow-md dark:bg-blue-900/20">
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500 dark:text-blue-400" />
              <div>
                <h3 className="text-lg font-medium">
                  Processing Your Interview
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Preparing your feedback report...
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Additional context if active */}
      {callStatus === CallStatus.ACTIVE && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground"
        >
          Speak clearly and take your time when responding to questions.
          <br />
          The interviewer will wait for your complete answer before continuing.
        </motion.div>
      )}

      {/* Add to global CSS */}
      <style jsx global>{`
        @keyframes soundWave {
          0% {
            height: 10px;
          }
          100% {
            height: 30px;
          }
        }
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Agent;
