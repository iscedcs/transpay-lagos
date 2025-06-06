import React from "react";

interface PROFILE_INFORMATIONI {
  title: string;
  entry: string;
}

export default function ProfileInformation({
  title,
  entry,
}: PROFILE_INFORMATIONI) {
  return (
    <div className="pt-[20px]">
      <h4 className="text-title1 text-gray-500">{title}</h4>
      <p className="text-title1">{entry}</p>
    </div>
  );
}
