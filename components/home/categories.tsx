import React from "react";
import Link from "next/link";

const categories = () => {
  return (
    <div className="flex justify-center font-montserrat">
      <div className="inline-block mx-auto justify-center gap-x-4 space-x-7 border-b-2 border-orange-500">
        <Link href="">Politics</Link>
        <Link href="">Sports</Link>
        <Link href="">Finance</Link>
        <Link href="">Health and Fitness</Link>
        <Link href="">Travel</Link>
        <Link href="">Tech</Link>
        <Link href="">Gadgets</Link>
        <Link href="">Tech</Link>
      </div>
    </div>
  );
};

export default categories;
