import mongoose from "mongoose";

const MONGODB_URI = process.env.devConnection;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables!");
}

// Global cache object (only works in serverless environments)
let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn; // ✅ Reuse existing connection if available

  if (!cached.promise) {
    // Create a new connection only if no cached connection exists
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;  // Await the promise to ensure DB connection is established
    console.log('DB connected successfully!');
  } catch (error) {
    console.error('DB connection failed:', error);
    throw new Error('Failed to connect to the database');
  }


  return cached.conn;
}
