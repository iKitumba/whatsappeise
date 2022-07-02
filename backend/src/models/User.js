import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 15,
    },
    bio: {
      type: String,
      required: true,
      maxlength: 255,
    },
    avatar: String,
    password: {
      type: String,
      required: true,
      select: false,
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.avatar = `${process.env.APP_URL}/avatar/${this.avatar}`;

  next();
});

export default mongoose.model("User", UserSchema);
