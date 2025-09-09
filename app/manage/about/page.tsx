import React from "react";

export default function About() {
  return (
    <div className="flex flex-col gap-6 px-5 w-screen">
      <div className="mt-[20px]">
        <h3 className="text-h4Bold">{`About Us`}</h3>
        <p className="text-title1 text-gray-500">
          {`Learn about LASITRAS and it's features`}
        </p>
      </div>
    </div>
  );
}
