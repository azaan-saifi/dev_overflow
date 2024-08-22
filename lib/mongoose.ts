import mongoose from "mongoose";

let isConnected: boolean = false;

export async function connectToDatabase() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MongoDB URL refused connection");
  }

  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devOverflow",
    });

    isConnected = true;
    console.log("MongoDB is successfully connected Alhamdulillah!");
  } catch (error) {
    console.log("MongoDB connected failed", error);
  }
}
