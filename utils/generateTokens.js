import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken.js";

const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.roles };
    const accessToken = jwt.sign(payload, process.env.PRIVATE_KEY, {
      expiresIn: "14m",
    });
    const refreshToken = jwt.sign(payload, process.env.PRIVATE_key, {
      expiresIn: "30d",
    });

    const userToken = await UserToken.findOne({ userId: user._id });
    console.log("userToken-generatetoken", userToken);

    if (userToken) await userToken.remove();

    await new UserToken({ userId: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateTokens;
