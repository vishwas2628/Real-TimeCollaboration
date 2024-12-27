import { Schema, model } from 'mongoose';
import { genSalt, hash } from 'bcrypt';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//for encrypting the password feild before saving into db
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  try {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    console.log('Hashed Password during Registration:', this.password);
    next();  // Ensure that next() is called after hashing
  } catch (err) {
    console.error('Error during password hashing:', err);
    next(err); // Pass the error to the next middleware
  }
});

export default model('User', userSchema);