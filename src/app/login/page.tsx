"use client";

import React from "react";
import Link from "next/link";
import axios from "axios";
// import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Login() {
  // const router = useRouter();
  const [disablebtn, setdisablebtn] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [user, adduser] = React.useState({
    username: "",
    password: "",
  });

  const handlelogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      console.log("signup success", res.data);
      toast.success("user login sucssfull");
    } catch (error: any) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      setdisablebtn(false);
    } else {
      setdisablebtn(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 px-4">
      <h1>{isLoading ? "laoding..." : "login"}</h1>
      <label htmlFor="username">username</label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="username"
        className="py-2 outline-none text-black rounded-lg px-4"
        value={user.username}
        onChange={(e) => adduser({ ...user, username: e.target.value })}
      />

      <label htmlFor="password">password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        className="py-2 outline-none text-black rounded-lg px-2"
        value={user.password}
        onChange={(e) => adduser({ ...user, password: e.target.value })}
      />
      <button
        onClick={handlelogin}
        className="bg-red-400 px-2 mt-6"
        disabled={disablebtn || isLoading}
      >
        {isLoading
          ? "Loading..."
          : disablebtn
          ? "Please enter username & password"
          : "Login"}
      </button>

      <Link href={"/signup"} className="text-white mt-4 px-3">
        signup here
      </Link>
    </div>
  );
}
