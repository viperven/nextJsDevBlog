import mongoose from "mongoose";

const MONGODB_URI = process.env.devConnection;

// Global cache object (only works in serverless environments)
let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn; // ✅ Reuse existing connection if available

  if (!cached.promise) {
    // Create a new connection only if no cached connection exists
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
