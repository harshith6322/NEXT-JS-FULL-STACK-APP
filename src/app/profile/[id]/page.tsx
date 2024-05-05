"use client";

export default function Profilepage({ params }: any) {
  return (
    <div className=" flex justify-center items-center h-screen">
      <h1>profile</h1>
      <p>{params.id}</p>
    </div>
  );
}
