// src/lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connect to MongoDB Atlas with connection caching across serverless invocations.
 * Returns null if MONGODB_URI is not configured, allowing seamless static fallback.
 */
export async function connectDB(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI || MONGODB_URI;
  if (!uri) {
    return null;
  }

  // Fast path: if already connected, return in 0ms without re-handshaking
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: true,
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      cached.conn = mongooseInstance;
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    console.error("MongoDB Atlas Connection Error:", e);
    return null;
  }
}
