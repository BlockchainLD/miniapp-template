"use client";

import { Spinner, Typography } from "@worldcoin/mini-apps-ui-kit-react";

interface LoadingProps {
  message?: string;
  title?: string;
  fullScreen?: boolean;
  className?: string;
}

export function Loading({ message = "Loading...", title, fullScreen = false, className = "" }: LoadingProps) {
  if (fullScreen) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-7 space-y-7 text-center">
        <div className="space-y-3">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
          {title && <h2 className="font-sans antialiased font-semibold leading-narrow tracking-[-0.01em] text-2xl text-gray-900">{title}</h2>}
          <p className="font-sans antialiased font-normal leading-compact text-base text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
  return <div className={`flex items-center space-x-3 ${className}`}><Spinner /><Typography variant="body" className="text-gray-600">{message}</Typography></div>;
}
