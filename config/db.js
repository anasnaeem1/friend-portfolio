import mongoose from "mongoose";

/** MongoDB collection for portfolio content */
export const COLLECTION_NAME = "biba";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
      dbName: "biba",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
