import passport from "passport";
import passportLocal from 'passport-local';
import { isValidPassword,createHash } from "../utils.js";
import { userModel } from "../models/user.models.js";
import GithubStrategy from 'passport-github2';
import dotenv from 'dotenv'
dotenv.config();

const localStrategy = passportLocal.Strategy;

const initializePassport = () => {
    //Estrategia de Github
    passport.use('github', new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    },
    async (accesToken,refreshToken,profile,done) => {
        console.log(profile);
        try {
            let user = await userModel.findOne({email:profile._json.email})
            if(!user) {
                let githubDTO = {
                    first_name: profile._json.name,
                    last_name: ``,
                    email: profile._json.email,
                    loggedBy: 'Github'
                }
                const result = await userModel.create(githubDTO);
                return done(null,result)
            }
            return done(null,user)
        } catch (error) {
            return done(error)
        }
    }
))

    //Estrategia local
    passport.use('register', new localStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, isValidPassword, done) => {
            try {
                const {name,age,email,password} = req.body;
                const exists = await userModel.findOne({email})
                    if (exists) {
                        return done(null,false)
                    }
                    let userDTO = {
                        name,
                        age,
                        email,
                        password: createHash(password),
                        loggedBy: `Passport Local`
                    }
                    const result = await userModel.create(userDTO)
                    return done(null,result)
            } catch (error) {
                return done(error,null)
            }
        },
    ))
    passport.use('login', new localStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req,username,password,done) => {
            try {
                const {email,password} = req.body;
                const user = await userModel.findOne({email})
                if (!user) {
                    return done(null,false)
                }
                if (!isValidPassword(user.password, password)) {
                    return res.status(401).send({status: "error", message: "Credenciales incorrectas"})
                }
                return done(null,user)
            } catch (error) {
                return done(error,null)
            }
        }
    ))
    passport.serializeUser((user,done) => {
        done(null,user._id)
    })
    passport.deserializeUser(async (id,done) => {
        try {
            const user = await userModel.findById(id);
            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    })
}

export default initializePassport;