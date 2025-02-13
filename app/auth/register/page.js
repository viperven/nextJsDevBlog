"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Modal } from "../../components/ui/Modal"
import { BaseUrl } from "../../lib/url";

function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  const handleSendOtp = async () => {
    try {
      const res = await fetch(`${BaseUrl}auth/sendotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (data?.isSuccess) {
        setIsOtpModalOpen(true);
      } else {
        alert("Failed to send OTP. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while sending OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch(`${BaseUrl}auth/verifyotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (data?.isSuccess) {
        setIsEmailVerified(true);
        setIsOtpModalOpen(false);
        alert("Email verified successfully!");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while verifying OTP.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isEmailVerified) {
      alert("Please verify your email first.");
      return;
    }
    try {
      const res = await fetch(`${BaseUrl}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data?.isSuccess) {
        setName("");
        setEmail("");
        setPassword("");
        router.push(callbackUrl);
      } else {
        alert("Registration failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during registration.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full mt-1"
              required
              disabled={isEmailVerified}
            />
            {!isEmailVerified && (
              <button
                onClick={handleSendOtp}
                className="btn btn-secondary w-full mt-2"
              >
                Send OTP
              </button>
            )}
          </div>

          {isEmailVerified && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full mt-1"
                required
              />
            </div>
          )}

          <button
            onClick={handleSignup}
            className="btn btn-primary w-full"
            disabled={!isEmailVerified}
          >
            Sign Up
          </button>
        </div>
      </div>



      <Modal isOpen={isOtpModalOpen} onClose={() => setIsOtpModalOpen(false)}>
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-bold">Verify OTP</h3>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter OTP"
          />
          <button onClick={handleVerifyOtp} className="btn btn-success w-full">Verify OTP</button>
          <button onClick={() => setIsOtpModalOpen(false)} className="btn btn-ghost w-full mt-2">Cancel</button>
        </div>
      </Modal>

    </div>
  );
}

export default function SignupPage() {
  return (
    <React.Suspense fallback={<div>Loading.......</div>}>
      <Signup />
    </React.Suspense>
  );
}
