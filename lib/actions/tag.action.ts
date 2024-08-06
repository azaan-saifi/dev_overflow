"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return [
      { _id: "1", name: "Nextjs" },
      { _id: "2", name: "React" },
      { _id: "3", name: "Tailwind" },
    ];
  } catch (error) {
    console.log("error fetching tags", error);
    throw error;
  }
}
