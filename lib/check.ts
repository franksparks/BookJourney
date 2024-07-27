import { prisma } from "@/db/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  console.log("User ID from Clerk:", userId);

  if (!userId) {
    console.log("Unauthorized access");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (user) {
    console.log("User found:", user);
    return res.status(200).json(user);
  } else {
    console.log("User not found");
    return res.status(404).json({ message: "User not found" });
  }
}
