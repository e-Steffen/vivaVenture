import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
