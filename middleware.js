import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const protectedRoutes = ["/post", "/dashboard", "/profile"]; // Add your protected routes here

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log("middleware always runs");

  // Check if the current route requires authentication
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      // Redirect to login if token is missing, with callbackUrl
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname); // Add the current path to query
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify the token using JWT
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      return NextResponse.next(); // Proceed if valid
    } catch (error) {
      // Invalid token, redirect to login with callbackUrl
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If the route is public, proceed normally
  return NextResponse.next();
}
