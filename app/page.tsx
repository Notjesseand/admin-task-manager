import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="text-5xl text-center justify-center items-center h-screen">
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
};

export default page;
