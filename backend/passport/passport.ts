import { ExtractJwt, Strategy } from 'passport-jwt';
import User from '../models/UserModel'


const APP_SECRET: string = process.env.APP_SECRET || 'secret';

export const Passport = (passport: any) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: APP_SECRET,
  };
  passport.use(
    new Strategy(opts, async (jwtPayload, done) => {
        try {
            const user = await User.findById({ _id: jwtPayload.data._id });
            if(!user) {
                return done(null, false);
            }else {
                return done(null, user);
            }
        } catch (error) {
            return done(error, false);
        }
    })
  );
};
