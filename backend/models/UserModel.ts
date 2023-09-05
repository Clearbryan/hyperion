import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  emailAddress: { type: String, required: true, unique: true, index: true },
  password: { type: String },
});


export = mongoose.model('User', userSchema)
