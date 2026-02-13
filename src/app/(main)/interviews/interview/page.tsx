import React from "react";
import Agent from "@/components/interview/Agent";
import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
  const user = await currentUser();
  console.log("user", user);
  return (
    <main className="flex flex-col gap-8 px-4 py-8">
      <Agent
        userName={user?.firstName || ""}
        avatar={user?.imageUrl || "/user-avatar.png"}
        userId={user?.id!}
        type="generate"
      />
    </main>
  );
};
export default Page;
