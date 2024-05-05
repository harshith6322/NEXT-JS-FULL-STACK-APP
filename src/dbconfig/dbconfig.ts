import mongoose from "mongoose";

export default async function connectdb() {
  try {
    mongoose.connect(process.env.MONGOOSE_URI!);
    const connection = mongoose.connection;
    connection.on("connect", () => {
      console.log("connected sucssfully");
    });
    connection.on("err", (err) => {
      console.log(err);
      process.exit();
    });
  } catch (erro) {
    console.log("some thing went wrong");
    console.log(erro);
  }
}
