import { Request, Response, NextFunction, Router } from 'express';
import Utils from '../utils/utils'
import constants from '../constants/constants';
import User from '../models/UserModel';
import { middleware } from '../middleware/middleware';
import passport from 'passport';
import { database } from '../database/database';

const router: Router = Router()

/**
 * Returns information about the server.
 *
 * @return Object.
 */
router.get(`/`, (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ 
    serverStatus: 'Online',
    date: new Date().toString()
 });
});

/**
 * @POST
 * Returns boolean based on the user registration status.
 * @param {user: Object} obj user registration details.
 * @return {success: boolean} x raised to the n-th power.
*/
router.post(`/register`, middleware.filterBadWords, async (req: Request, res: Response, _next: NextFunction) => {
    const { error, value } = await Utils.validateUserDetails(req.body);
    if (error) {
      return res.status(constants.BAD_REQUEST_CODE).json({
        success: false,
        message: error.message,
      });
    }else {
        // encrypt user password
        const hash = Utils.hashPassword(value.password);
        const user: Record<string, any> = new User({ ...value, password: hash })
        try {
            await user.save();
            return res.json({
                sucess: true,
                message: `User registration successful.`,
            });
            
        } catch (error: any) {
            let errorMessage: string | null = null;
            if(error.code == 11000) {
                const errorDetails = Object.entries(error.keyValue).map(
                  ([key, value]) => { return { key, value }});
                errorMessage = `${errorDetails[0].key}: ${errorDetails[0].value} is already registered!`;
            }
            
            if(error.code == 11000) {
              return res.json({
                 success: false,
                 message: errorMessage || error.message,
               });
            }
        }
    }
})

// login user
router.post(`/login`, async(req: Request, res: Response, _next: NextFunction) => {
    const { loginId, password } = req.body
    try {
      const found = await database.findUserByUsernameOrEmail(loginId);
        if(!found) {
            return res.status(constants.NOT_FOUND_CODE).json({
              success: false,
              message: `User not found`,
            });
        }
       else {
        const passwordsMatch = await Utils.comparePassword(password, found.password);
        if(!passwordsMatch) {
          return res.status(constants.BAD_REQUEST_CODE).json({
            success: false,
            message: `Incorrect password`,
          });
        }
        else {
          const user = Utils.stripPassword(found);
          const token = Utils.generateToken(user);
          if (!token) {
            return res.status(constants.INTERNAL_SERVER_CODE).json({
              success: false,
              message: `Internal server error.`,
            });
          }
          return res.json({
            sucess: true,
            token,
          });
        }
      }
        
    } catch (error) {
        return res.status(constants.NOT_FOUND_CODE).json({
          success: false,
          message: `User not found`,
        });
    }
})

// profile route
router.post(`/profile`, passport.authenticate(`jwt`, { session: false }), middleware.canViewProfile, (req: Request, res: Response, _next: NextFunction) => {
    const user = Utils.stripPassword(req.user);
    return res.json({
        success: true,
        user
    })
})


export = router