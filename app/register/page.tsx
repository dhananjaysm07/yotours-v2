"use client";

import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUDIOTOURS_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.log("Error:", err);
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUDIOTOURS_BACKEND_URL}/auth/verify-email`,
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
        // Redirect to login page or dashboard after successful verification
        setRegistrationComplete(true);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.log("Error", err);
      setError("Failed to verify email. Please try again.");
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
        <h1 className="text-22 fw-500">Create Account</h1>
      </div>

      {error && (
        <div className="col-12">
          <div className="text-red-1">{error}</div>
        </div>
      )}

      {!otpSent ? (
        <form onSubmit={handleRegister} className="row y-gap-20">
          <div className="col-12">
            <p className="text-14 text-light-1">
              Create your account to get started with AudioTours.
            </p>
          </div>

          <div className="col-12">
            <div className="form-input">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label className="lh-1 text-14 text-light-1">Full Name</label>
            </div>
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
            <div className="form-input">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <label className="lh-1 text-14 text-light-1">Password</label>
            </div>
          </div>

          <div className="col-12">
            <button
              type="submit"
              disabled={loading}
              className="button py-20 -dark-1 bg-blue-1 text-white w-100"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
      ) : registrationComplete ? (
        <div className="col-12">
          <p className="text-16 text-center">
            🎉 Your registration is complete! You can now install the YoTours
            app from the Play Store and App Store.
          </p>
        </div>
      ) : (
        <form onSubmit={handleVerifyEmail} className="row y-gap-20">
          <div className="col-12">
            <p className="text-14 text-light-1">
              We&apos;ve sent a verification code to <strong>{email}</strong>.
              Please enter it below to complete your registration.
            </p>
          </div>

          <div className="col-12">
            <div className="form-input">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                pattern="[0-9]{6}"
              />
              <label className="lh-1 text-14 text-light-1">Enter OTP</label>
            </div>
          </div>

          <div className="col-12">
            <button
              type="submit"
              disabled={loading}
              className="button py-20 -dark-1 bg-blue-1 text-white w-100"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </div>

          <div className="col-12">
            <p className="text-14 text-light-1 text-center">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                  setError("");
                }}
                className="text-blue-1 border-0 bg-transparent p-0"
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Go back and try again
              </button>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
