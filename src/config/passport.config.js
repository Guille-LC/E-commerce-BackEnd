import passport from "passport";
import passportLocal from 'passport-local';
import jwtStrategy from 'passport-jwt';
import { PRIVATE_KEY } from "../utils.js";
import { isValidPassword,createHash } from "../utils.js";
import { userModel } from "../models/user.models.js";
import { cartModel } from "../models/carritos.models.js";
import GithubStrategy from 'passport-github2';
import dotenv from 'dotenv'
import { logger } from "./logger.js";
dotenv.config();

const localStrategy = passportLocal.Strategy;

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJwt = jwtStrategy.ExtractJwt;

const initializePassport = () => {

    logger.http('Passport inicializado')

    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), 
        secretOrKey: PRIVATE_KEY
        }, async(jwt_payload,done) => {
            try {
                logger.info("JwtStrategy")
                return done(null,jwt_payload)
            } catch (error) {
                logger.error(error)
                return done(error)
            }
    }))

    //Estrategia de Github
    passport.use('github', new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    },
    async (accesToken,refreshToken,profile,done) => {
        try {
            logger.info('Estrategia de Github inicializada')
            let user = await userModel.findOne({email:profile._json.email})
            if(!user) {
                let githubDTO = {
                    first_name: profile._json.name,
                    last_name: ``,
                    email: profile._json.email,
                    loggedBy: 'Github'
                }
                const result = await userModel.create(githubDTO);
                logger.info('Resultado de estrategia de Github => ' + result)
                return done(null,result)
            }
            logger.info('Resultado de estrategia de Github => ' + user)
            return done(null,user)
        } catch (error) {
            logger.error(error)
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
                logger.info('Registro de usuario')
                const {name,age,email,role ,password} = req.body;
                const exists = await userModel.findOne({email})
                    if (exists) {
                        logger.warn("Este usuario ya existe")
                        return done(null,false)
                    }
                    let cartId = null;
                    if(role === 'user') {
                        const newCart = await cartModel.create({ products: [] });
                        cartId = newCart._id;
                    }
                    let userDTO = {
                        name,
                        age,
                        email,
                        role,
                        password: createHash(password),
                        loggedBy: `Passport Local`,
                        cartId
                    }
                    const result = await userModel.create(userDTO)
                    logger.info(`Resultado del registro: ${result}`)
                    return done(null,result)
            } catch (error) {
                logger.error(error)
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
                logger.info(`Logueo de usuario`)
                const {email,password} = req.body;
                const user = await userModel.findOne({email})
                if (!user) {
                    logger.error("Este usuario no esta registrado")
                    return done(null,false)
                }
                if (!isValidPassword(user.password, password)) {
                    logger.warn("La contraseña es incorrecta")
                    return done(null,false)
                }
                logger.info(`Resultado del logue: ${user}`)
                return done(null,user)
            } catch (error) {
                logger.error(error)
                return done(error,null)
            }
        }
    ))

    //Serializar
    passport.serializeUser((user,done) => {
        logger.info('serializeUser')
        done(null,user._id)
    })

    //Deserializar
    passport.deserializeUser(async (id,done) => {
        try {
            const user = await userModel.findById(id);
            logger.info('deserializeUser')
            return done(null,user)
        } catch (error) {
            logger.error(error)
            return done(error,null)
        }
    })
}

//Token JWT en Cookie
const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        logger.info('Se obtuvo la jwtCokkieToken')
        token = req.cookies['jwtCookieToken']
    }
    return token
}

export default initializePassport;