import 'dotenv/config';
import express, { Application } from 'express';
import passport from 'passport';
import session from 'express-session';
import helmet from 'helmet';
import cors from 'cors';
import router from './backend/routes/users'
import { database } from './backend/database/database';
import { Passport } from './backend/passport/passport';

const PORT = process.env.PORT || 3000;
const DB_USER: string = process.env.DB_USER as any;
const DB_PASS: string = process.env.DB_PASS as any;


const app: Application = express();
Passport(passport);
database.connect(DB_USER, DB_PASS)
const APP_SECRET = process.env.APP_SECRET || 'secret';

// application middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  session({
    secret: APP_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// application routes
app.use('/', router);

app.listen(PORT, () => console.log(`Hyperion server running on port: ${PORT}`));
