"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Draggable from 'react-draggable'
import "./login.css"

export default function Component() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    // Dummy API call
    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        alert("Login successful!")
      } else {
        setError("Invalid email or password")
      }
      setLoading(false)
    }, 2000)
  }
  const remStyle = {
    margin: "20px 0px",
    marginLeft: "4px"

  }
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400 px-4 py-8 sm:px-6 lg:px-8">
      <div className="log-div w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            <span className="mainFont inline-block whitespace-nowrap overflow-hidden pr-3 animate-typewriter">WELCOME BACK</span>
          </h2>
        </div>
        <form className="mt-4 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm rounde">
            <div className="mb-6">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mainFont log-input relative block w-full appearance-none rounded-2xl border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition-colors duration-300 ease-in-out focus:shadow-lg"
                  placeholder="Email address"
                  value={email}
                  onChange={handleEmailChange}
                />
                {isEmailValid(email) && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="mainFont log-input relative block w-full appearance-none rounded-2xl border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition-colors duration-300 ease-in-out focus:shadow-lg"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handleShowPassword}>
                  <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                </div>
              </div>
            </div>
            <div style={remStyle} className="mainFont rem-div flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
            </div>
            <div className="mainFont mb-4 log-btn-p">
              <motion.button
                type="submit"
                className=" log-btn group relative flex w-full justify-center rounded-2xl border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none transition-colors duration-300 ease-in-out"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                disabled={loading}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                {loading ? "Loading..." : "Login"}
              </motion.button>
            </div>
            <div className="mainFont mb-4 log-btn-p">
              <motion.button
                type="button"
                className=" log-btn group relative flex w-full justify-center rounded-2xl border border-transparent bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  transition-colors duration-300 ease-in-out"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* <ChromeIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" /> */}
                  <img className="w-6" src="/google.png" alt="" />
                </span>
                Login with Google
              </motion.button>
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}
        </form>
        <div className="mainFont flex items-center justify-center mt-6">
          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Not have an account? Sign up
            </a>
          </div>
        </div>
        {/* <Draggable>
          <div className="absolute top-10 right-10 p-2 bg-indigo-300 rounded-full shadow-lg cursor-pointer">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              😊
            </motion.div>
          </div>
        </Draggable> */}
      </div>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}


function EyeOffIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  )
}



function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}