"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import "@/styles/star-background.css";

const Page = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const usernames = [
    "it_admin",
    "tech_admin",
    "academic_admin",
    "finance_admin",
  ];
  const password = "admin123";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black font-montserrat relative overflow-x-hidden text-sm">
      {/* Starry Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="stars small"></div>
        <div className="stars medium"></div>
        <div className="stars large"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 max-w-lg relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl p-8 w-full border border-gray-700">
          <h1 className="text-xl font-bold text-white text-center mb-6">
            Admin Login Details
          </h1>
          <div className="space-y-6">
            {/* Usernames Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-300 mb-3">
                Usernames
              </h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {usernames.map((username) => (
                  <li
                    key={username}
                    className="flex items-center gap-2 justify-between"
                  >
                    <span>{username}</span>
                    <button
                      onClick={() =>
                        handleCopy(username, `username-${username}`)
                      }
                      className="relative text-gray-400 hover:text-blue-400 transition-colors duration-200"
                      aria-label={`Copy ${username} to clipboard`}
                      title="Copy to clipboard"
                    >
                      {copied === `username-${username}` ? (
                        <Check className="h-5 w-5 text-green-400" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                      {copied === `username-${username}` && (
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                          Copied!
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Password Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-300 mb-3">
                Password
              </h2>
              <div className="flex items-center gap-2 justify-between">
                <p className="text-gray-300 bg-gray-900 px-4 py-2 rounded-lg">
                  {password}
                </p>
                <button
                  onClick={() => handleCopy(password, "password")}
                  className="relative text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="Copy password to clipboard"
                  title="Copy to clipboard"
                >
                  {copied === "password" ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                  {copied === "password" && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Dashboard Link */}
          <div className="mt-8 text-center">
            <Link
              href="/dashboard"
              target="_blank"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200 font-medium"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
