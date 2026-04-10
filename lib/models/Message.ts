import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  name: string;
  message: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);
