import connectdb from "@/dbconfig/dbconfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";

connectdb();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { username, email, password } = reqbody;

    console.log(reqbody);
    const user = await User.findOne({ email });
    if (user)
      return NextResponse.json(
        { error: "user already exist" },
        { status: 400 }
      );
    //hashing password
    const bcryptjs = require("bcryptjs");

    // Generate a salt
    const salt = await bcryptjs.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcryptjs.hash(password, salt);

    //creating user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "user created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.meessage }, { status: 500 });
  }
}
