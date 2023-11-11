import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2'
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

passport.use("github", new GithubStrategy(
    {
        clientID: "Iv1.f070c7997e1dacfb",
        clientSecret: "331262fd9a955ee5f28e0052149abc9e9b43f213",
        callbackURL: "http://localhost:8080/api/login/github"
    },
    async (accessToken, refreshToken, profile: any, done) => {
        try {
            const email = profile._json.email
            const user = await User.findOne({ email })
            if (user) {
                if (user.isGithub) {
                    return done(null, user)
                }
                else {
                    return done(null, false)
                }

            }
            const infoUser = {
                firstName: profile._json.name?.split(' ')[0] ?? ' ',
                lastName: profile._json.name?.split(' ')[1] ?? ' ',
                email: profile._json.email,
                password: ' ',
                role: 'user',
                age: 0,
                isGithub: true,
            }
            const createdUser = await User.create(infoUser)
            done(null, createdUser)
        }
        catch (error) {
            done(error)
        }
    }))

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
