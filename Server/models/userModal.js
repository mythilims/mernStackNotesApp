import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jsToken from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: [true,'Email is required'], unique: true },
    password: {
      type: String,
      minlength: [3, "Password must be at least 3 characters"],
      maxlength: [6, "Password cannot exceed 6 characters"],
      required: [true, "Password is required"],
    },
  },
  { timestapms: true }
);

userSchema.pre("save", async function (next) {
  let users = this;
  try {
    let slat = await bcrypt.genSalt(10);
    users.plainPassword = users.password;
    users.password = await bcrypt.hash(users.password, slat);
    next();
  } catch (e) {
    next(e);
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (e) {
    return e;
  }
};

userSchema.methods.generateToken = async function () {
  try {
    let token = jsToken.sign({ id: this._id, email: this.email }, secretKey, {
      expiresIn: "1d",
    });
    return token;
  } catch (e) {
    return e;
  }
};
const Users = mongoose.model("users", userSchema);
export default Users;
