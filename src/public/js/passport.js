import passport from "passport";
import { Users } from "../../dao/manager/usermana.js";
import { Strategy as LocalStrategy } from "passport-local";
import { hashData, compareData } from "../../utils.js";
import { Strategy as GithubStrategy } from "passport-github2";

//GITHUB STRATEGY

passport.use('github', new GithubStrategy({ clientID: "Iv1.5d84a30f74163ffa",
    clientSecret: '5611405690a3dd7631d2274ae6e5bb3474743908',
    callbackURL: 'http://localhost:8080/api/session/callback'}, 
    async(accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
            const userDB = await Users.findByEmail(profile._json.email)
            //login
            if(userDB){
                if(userDB.isGithub){
                    return done(null, userDB)
                }else {
                    return done(null, false)
                }
            }
            const infoUser = {
                name: profile._json.name.split(" ")[0],
                last_name: profile._json.name.split(" ")[1],
                email: profile._json.email,
                isGithub: true,
            }
            const createdUser = await Users.createOne(infoUser)
            done(null, createdUser)
        } catch (error) {
            done(error)
        }
} ))



//LOCAL STRATEGY
passport.use(
'signup', 
new LocalStrategy(
{passReqToCallback:true,
usernameField: 'email' }
,async (req,email,password,done) => {
const { name, last_name } = req.body;
console.log(req.body);
if (!name || !last_name || !email || !password) {
   return done(null, false)
}
try {
    const hashPassword= await hashData(password)
    const createdUser = await Users.createOne({
    ...req.body, 
    password: hashPassword});
    done(null, createdUser)
}
 catch (error) {
    done(error)
}
}))


passport.use('login', new LocalStrategy({usernameField: 'email'}, async (email,password,done) => {
    if ( !email || !password) {
        return done(null, false);
    }
        try {
        const user = await Users.findByEmail(email)
        console.log("user",user)
        if (!user){
         return done(null,false)
        }
    const isPasswordValid = await compareData(password, user.password)
        if(!isPasswordValid){
            return done(null,false)
        }
  /*       const sessionInfo = email === "adminCoder@coder.com" && password === "adminCod3r123" ?
        {email, name:user.name, isAdmin: true}
        : {email, name:user.name, isAdmin: false} 
        req.session.user = sessionInfo */
        /* console.log(sessionInfo); */
        done(null, user)
    } catch (error) {
        done(error)
    }
}))


//SERIALIZERS
passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser(async (id,done) => {
try {
    const user = await Users.findById(id)
    done(null, user)
} catch (error) {
    done(error)
}
})