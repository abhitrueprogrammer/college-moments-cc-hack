"use client";
import { useState } from "react";
import { auth } from "@/app/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPasswordStrength(e.target.value);
    checkPasswordMatch();
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkPasswordMatch();
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 8) {
      setPasswordStrength("Weak");
    } else if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    ) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  };

  const checkPasswordMatch = () => {
    setPasswordMatch(password === confirmPassword);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = () => {
    return isValidEmail(email) && passwordStrength === "Strong" && passwordMatch;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/your-redirect-page"); // Redirect to your desired page after sign up
    } catch (error) {
      console.error("Error during Google sign-up:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-[#1e293b] p-8 rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary-foreground">
            Create Your Account
          </h2>
        </div>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MailIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleEmailChange}
                className={`block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-[#1e293b] placeholder-[#1e293b] focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isValidEmail(email) ? "border-green-500" : "border-red-500"
                }`}
                placeholder="Email address"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={handlePasswordChange}
                className={`block w-full rounded-md border-0 py-1.5 pl-10 pr-10 text-[#1e293b] placeholder-[#1e293b] focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  passwordStrength === "Strong"
                    ? "border-green-500"
                    : passwordStrength === "Medium"
                    ? "border-yellow-500"
                    : "border-red-500"
                }`}
                placeholder="Password"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={handleTogglePassword}
              >
                <div
                  className={`mr-2 h-3 w-3 rounded-full ${
                    passwordMatch ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                {showPassword ? (
                  <EyeIcon className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <EyeOffIcon className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <div
                className={`inline-block h-3 w-3 rounded-full ${
                  passwordStrength === "Strong"
                    ? "bg-green-500"
                    : passwordStrength === "Medium"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                } mr-2`}
              />
              Password strength: {passwordStrength}
            </div>
          </div>
          <div>
            <label htmlFor="confirm-password" className="sr-only">
              Confirm Password
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="confirm-password"
                name="confirm-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`block w-full rounded-md border-0 py-1.5 pl-10 pr-10 text-[#1e293b] placeholder-[#1e293b] focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  passwordMatch ? "border-green-500" : "border-red-500"
                }`}
                placeholder="Confirm Password"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={handleTogglePassword}
              >
                <div
                  className={`mr-2 h-3 w-3 rounded-full ${
                    passwordMatch ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                {showPassword ? (
                  <EyeIcon className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <EyeOffIcon className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={!isFormValid()}
              className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Sign up
            </button>
          </div>
          <div className="flex justify-center items-center">
            <hr className="flex-grow border-t border-muted-foreground" />
            <span className="mx-4 text-muted-foreground">or</span>
            <hr className="flex-grow border-t border-muted-foreground" />
          </div>
          <div>
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="flex w-full justify-center rounded-md border border-primary bg-white py-2 px-4 text-sm font-medium text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <img
                src="/path/to/google-icon.svg"
                alt="Google"
                className="mr-2 h-5 w-5"
              />
              Sign up with Google
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary/90"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.95 13.53a3.75 3.75 0 11-5.9 0 9.025 9.025 0 01-2.343 1.18 10.305 10.305 0 007.457 0 9.025 9.025 0 01-2.343-1.18z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.172 9.172a4.5 4.5 0 015.677-.168c.733.634 1.425 1.417 2.151 2.267M20.828 9.172a4.5 4.5 0 00-5.677-.168 15.852 15.852 0 00-2.151 2.267M19.207 3.207L3.207 19.207"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.798 6.798a3.75 3.75 0 015.9 0 9.025 9.025 0 002.343 1.18 10.305 10.305 0 00-7.457 0 9.025 9.025 0 002.343-1.18z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.95 13.53a3.75 3.75 0 11-5.9 0M3.172 9.172a4.5 4.5 0 015.677-.168c.733.634 1.425 1.417 2.151 2.267M20.828 9.172a4.5 4.5 0 00-5.677-.168 15.852 15.852 0 00-2.151 2.267M19.207 3.207L3.207 19.207"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 8.25L12 13.5 2.25 8.25M3.75 6.75h16.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25H3.75c-.69 0-1.25-.56-1.25-1.25v-8.5c0-.69.56-1.25 1.25-1.25z"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 9.75v-2.25a5.25 5.25 0 00-10.5 0v2.25M7.5 9.75V7.5a5.25 5.25 0 0110.5 0v2.25M5.25 12h13.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25H5.25C4.56 23 4 22.44 4 21.75v-8.5C4 12.56 4.56 12 5.25 12z"
    />
  </svg>
);
