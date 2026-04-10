import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env",
  );
}

declare global {
  var mongoose:
    | {
        conn: typeof import("mongoose") | null;
        promise: Promise<typeof import("mongoose")> | null;
      }
    | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// We assert that it's no longer undefined.
const cachedDB = cached as NonNullable<typeof cached>;

async function connectToDatabase() {
  if (cachedDB.conn) {
    return cachedDB.conn;
  }

  if (!cachedDB.promise) {
    const opts = {
      bufferCommands: false,
    };

    cachedDB.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cachedDB.conn = await cachedDB.promise;
  } catch (e) {
    cachedDB.promise = null;
    throw e;
  }

  return cachedDB.conn;
}

export default connectToDatabase;
