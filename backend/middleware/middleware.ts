import { Request, Response, NextFunction } from 'express';
import constants from '../constants/constants';
import User from '../models/UserModel'


export const middleware = {
  filterBadWords: (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
    const isBasword = constants.BADWORDS.includes(username);
    if (isBasword) {
      return res.status(constants.BAD_REQUEST_CODE).json({
        success: false,
        message: `Username is not allowed!`,
      });
    } else {
      next();
    }
  },

  canViewProfile: async (req: Request, res: Response, next: NextFunction) => {
    let user
    const { username, emailAddress } = req.user as Record<string, any>
     const query = {
       $or: [{ emailAddress }, { username }],
     };
    user = await User.findOne(query)
    
    if (user?.username == username || user?.emailAddress == emailAddress) {
      next()
    } else {
      return res.status(constants.FORBIDDEN_CODE).json({
        success: false,
        message: `Forbidden!`,
      });
    }
  },
}; 