import FeedbackDisplay from "@/components/interview/FeedbackDisplay";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await currentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/interviews");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id || "",
  });

  return <FeedbackDisplay interview={interview} feedback={feedback} id={id} />;
};

export default Page;
