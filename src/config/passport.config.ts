import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2'
import { Request } from 'express';
import User, { IUser } from '../models/user.model';
import { compareData, hashData } from '../helpers/Encryption';
import Cart from '../models/cart.model';

passport.use(
    "login",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req: Request, email: string, password: string, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false);
                }

                const isPasswordValid = await compareData(password, user.password);
                if (!isPasswordValid) {
                    return done(null, false);
                }
                const isAdmin = (email === 'adminCoder@coder.com' && password === 'adminCod3r123')
                if (!user.cart) {
                    const newCart = await Cart.create({ /* Cart properties */ });
                    user.cart = newCart._id;
                    await user.save();
                }
                req.session.user = {
                    email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: isAdmin ? 'admin' : 'user',
                    cart: user.cart
                };
                return done(null, user);
            } catch (error) {
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
            const { firstName, lastName, age } = req.body;
            const user = {
                firstName,
                lastName,
                age,
                email,
                password: await hashData(password),
                role: 'user',
                cart: null
            }
            try {
                const userExists = await User.findOne({ email })
                if (userExists) {
                    return done(null, false)
                }
                else {
                    const createdUser = await User.create(user)
                    return done(null, createdUser)
                }
            }
            catch (error) {
                return done(error)
            }
        }
    )
);

passport.use("github", new GithubStrategy(
    {
        clientID: "Iv1.f070c7997e1dacfb",
        clientSecret: "331262fd9a955ee5f28e0052149abc9e9b43f213",
        callbackURL: "http://localhost:8080/api/login/github",
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
                cart: null
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
