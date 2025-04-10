"use client";

import { useState } from "react";
import Link from "next/link";

export default function DeleteAccount() {
  console.log(
    "Environment variable",
    process.env.NEXT_PUBLIC_AUDIOTOURS_BACKEND_URL
  );
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUDIOTOURS_BACKEND_URL}/auth/delete-account/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDeletion = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUDIOTOURS_BACKEND_URL}/auth/delete-account/confirm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        window.location.href = "/";
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.log("Error", err);
      setError("Failed to delete account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="row y-gap-20"
      style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}
    >
      <div className="col-12">
        <h1 className="text-22 fw-500">Delete Account</h1>
        <p className="mt-10">
          Changed your mind?{" "}
          <Link href="/" className="text-blue-1">
            Return to home
          </Link>
        </p>
      </div>

      {error && (
        <div className="col-12">
          <div className="text-red-1">{error}</div>
        </div>
      )}

      {!otpSent ? (
        <form onSubmit={handleRequestOTP} className="row y-gap-20">
          <div className="col-12">
            <p className="text-14 text-light-1">
              Warning: This action cannot be undone. All your data will be
              permanently deleted.
            </p>
          </div>

          <div className="col-12">
            <div className="form-input">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="lh-1 text-14 text-light-1">Email</label>
            </div>
          </div>

          <div className="col-12">
            <button
              type="submit"
              disabled={loading}
              className="button py-20 -dark-1 bg-red-1 text-white w-100"
            >
              {loading ? "Processing..." : "Request Account Deletion"}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleConfirmDeletion} className="row y-gap-20">
          <div className="col-12">
            <div className="form-input">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <label className="lh-1 text-14 text-light-1">Enter OTP</label>
            </div>
          </div>

          <div className="col-12">
            <button
              type="submit"
              disabled={loading}
              className="button py-20 -dark-1 bg-red-1 text-white w-100"
            >
              {loading ? "Processing..." : "Confirm Account Deletion"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
