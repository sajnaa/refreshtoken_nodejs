import mongoose from "mongoose";

const dbConnect = () => {
  //mongodb con
  mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};

export default dbConnect;
