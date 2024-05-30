import {User} from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import "dotenv/config";

export const registerUser = async(req, res) =>{
    try{
        const id = Math.floor(Math.random() * 1000000);
        const {name, password} = req.body;
        const userExists = await User.findOne({
            where:{name}
        })

        if(userExists){
            return res.status(400).send('Name is already associated with an account');
        }

        await User.create({
            id:id,
            name:name,
            password: await bcrypt.hash(password, 15)
        })
        return res.status(200).send('Registartion successful')

    }catch(err){
        return res.status(500).send('Error in registering user');
    }
}

export const signInUser = async (req, res) =>{
    try{
        const {name, password} = req.body;

        const user = await User.findOne({
            where:{
                name
            }
        });
        if(!user){
            return res.status(404).send('User not found!');
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if(!passwordValid){
            return res.status(404).json('Incorrect name or password');
        }

        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET , {
            expiresIn:process.env.JWT_REFRESH_EXPIRATION
        });
        User.update({id:user.id,name:user.name,password:user.password,token:token},{where:{id:user.id}});
        res.send({token:token})

    }catch(err){
        console.log(err);
        return res.status(500).send('Sign in error');
    }
}

export const verifyJwt = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.token = token; // Attach decoded user information to the request object
        next(); // Call next middleware or route handler
    } catch (err) {
        console.error('JWT verification failed:', err.message);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};

export const getUserByToken=async(req, res) =>{
    const token = req.token;
    const user = await User.findOne({where:{token:token}});
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({message: 'No user found'});
    }
}
