// File contains various utility/helper functions for the application
import Joi from 'joi';
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken';

const APP_SECRET: string = process.env.APP_SECRET as string;

interface IUser {
  username: string;
  emailAddress: string;
  password: string;
}

export default {
  // validate user registraiton input
  validateUserDetails: async (data: IUser): Promise<any> => {
    const schema = Joi.object({
      username: Joi.string()
        .required()
        .min(3)
        .max(30)
        .error(new Error(`Username is required`)),
      emailAddress: Joi.string()
        .email({
          minDomainSegments: 2,
          multiple: false,
          allowFullyQualified: true,
        })
        .required()
        .error(new Error(`Please enter a valid email address`)),
      password: Joi.string()
        .pattern(new RegExp(`^[a-zA-Z0-9]{3,30}$`))
        .min(8)
        .max(12)
        .required()
        .error(new Error(`Please enter a strong password`)),
      confirmPassword: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .messages({
          'any.only': 'Passwords do not match',
        }),
    });
    return schema.validate(data);
  },
  hashPassword: (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  // compare hash
  comparePassword: async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
  },

  // generate token
  generateToken: (data: any): string => {
    return Jwt.sign({ data }, APP_SECRET, { expiresIn: `1h` });
  },
  stripPassword: (user: any) => {
    const { password, __v, ...rest } = user._doc;
    return rest
  }
};


