"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    // const { page = 1, pageSize = 10, filter, searchQuery } = params;

    const allUsers = await User.find({}).sort({ createdAt: -1 });
    return { allUsers };
  } catch (error) {
    console.log("Error fetching All users data:", error);
    throw error;
  }
}
export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log("Error fetching user by ID:", error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log("Error while creating the user:", error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.log("Error while updating the user:", error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found!");
    }

    // Delete user from our database
    // and their questions, answers, comments etc.

    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );
    // Deleting the questions
    await Question.deleteMany({ author: user._id });

    // TODO: Delete answers, comments

    return user;
  } catch (error) {
    console.log("Error while deleting the user:", error);
    throw error;
  }
}

export async function toggleSavedQuestions(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, userId, path } = params;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    let updateQuery = {};

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      updateQuery = {
        $pull: { saved: questionId },
      };
    } else {
      updateQuery = {
        $addToSet: { saved: questionId },
      };
    }

    const question = await User.findByIdAndUpdate(userId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
