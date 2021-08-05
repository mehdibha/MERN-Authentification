import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Le prénom est requis"],
    },
    lastName: {
      type: String,
      required: [true, "le nom est requis"],
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
    },
    password: {
      type: String,
      required: false,
      minLength: 6
    },
    avatar: {
      type: String,
      default: "https://edovel.com/wp-content/uploads/2019/06/Quentin.jpg",
    },
    googleId: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
