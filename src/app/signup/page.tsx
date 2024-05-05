"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  // const router = useRouter();
  const [disablebtn, setdisablebtn] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [user, adduser] = React.useState({
    email: "",
    username: "",
    password: "",
  });

  const handlesingup = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const router = useRouter();
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log("signup success", res.data);
      toast.success("user has been created");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setdisablebtn(false);
    } else {
      setdisablebtn(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 px-4">
      <h1>{isLoading ? "loading..." : "signup"}</h1>
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
      <label htmlFor="email">email</label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="email"
        className="py-2 outline-none text-black rounded-lg px-4 "
        value={user.email}
        onChange={(e) => adduser({ ...user, email: e.target.value })}
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
        onClick={handlesingup}
        className="bg-red-400 px-2 mt-6 "
        disabled={disablebtn}
      >
        {disablebtn ? "no signup" : "signup"}
      </button>
      <Link href={"/login"} className="text-white mt-4 px-3">
        login here
      </Link>
    </div>
  );
}
