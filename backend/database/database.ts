import mongoose from 'mongoose';
import User from '../models/UserModel'

export class DataBase {
  async connect(username: string, password: string): Promise<void> {
   
    try {
      await mongoose.connect(
        `mongodb+srv://${username}:${password}@hyperiondev.u561a24.mongodb.net/HyperionDev?retryWrites=true&w=majority`
      );
      console.log(`Database connection successfull...`);
    } catch (error) {
      console.log(`Database connection failed...`);
      console.log(error);
      
      process.exit(1);
    }
  }

  async findUserByUsernameOrEmail (loginId: string): Promise<any> {
  const query = {
    $or: [{ emailAddress: loginId }, { username: loginId }],
  };
  return await User.findOne(query)
  }
}

export const database = new DataBase();
