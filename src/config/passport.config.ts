import passport from 'passport';
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import { Request } from 'express';
import User, { IUser } from '../models/user.model';
import { compareData, hashData } from '../helpers/Encryption';

passport.use(
    "login",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req: Request, email: string, password: string, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    console.log('cant find user')
                    return done(null, false);
                }

                const isPasswordValid = await compareData(password, user.password);
                if (!isPasswordValid) {
                    console.log('password invalid')
                    return done(null, false);
                }

                req.session.user = { email, firstName: user.firstName, lastName: user.lastName, role: user.role };
                return done(null, user);
            } catch (error) {
                console.log(error)
                return done(error);
            }
        }
    )
);

passport.use(
    "register",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            const { first_name, last_name } = req.body;
            if (!first_name || !last_name || !email || !password) {
                return done(null, false);
            }
            try {
                const hashedPassword = await hashData(password);
                const createdUser = await User.create({
                    ...req.body,
                    password: hashedPassword,
                });
                done(null, createdUser);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
