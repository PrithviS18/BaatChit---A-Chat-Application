import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const maxAge = 3*24*60*60*1000;

const createToken = (email,userId) => {
    return jwt.sign({email,userId},process.env.JWT_KEY, {expiresIn: maxAge})
};

export const signup = async (request, response, next) => {
    try{
        const {email,username,password} = request.body;
        if (!email || !password || !username) {
            return response.status(400).send("All the fields are required")
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(409).send("Email already in use");
        }


        const user = await User.create({email,password,username});

        response.cookie("jwt",createToken(email,user.id), {
            maxAge,
            secure:true,
            sameSite: "None",
        });

        return response.status(201).json({
            user: {
                id:user.id,
                email:user.email,
                username:user.username,
                profileSetup:user.profileSetup,
            },
        })
    }catch(error){
        console.log({error});
        return response.status(500).send("Internal Server Error");
    }
}

export const login = async (request, response, next) => {
    try{
        const {email,password} = request.body;
        if (!email || !password ) {
            return response.status(400).send("All the fields are required");
        }
        const user = await User.findOne({email});
        if (!user){
            return response.status(404).send("User not Found");
        }
        
        const auth = await bcrypt.compare(password,user.password);
        
        if (!auth){
            console.log("yes")
            return response.status(400).send("Password is incorrect");
        }
        response.cookie("jwt",createToken(email,user.id), {
            maxAge,
            secure:true,
            sameSite: "None",
        });

        return response.status(200).json({
            user: {
                id:user.id,
                email:user.email,
                username:user.username,
                profileSetup:user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color
            },
        })
    }catch(error){
        console.log({error});
        return response.status(500).send("Internal Server Error");
    }
}

export const getUser = async (request, response, next) => {
    try{
       const user = await User.findById(request.userId);
       if (!user) return response.status(404).send("User not Found");

       return response.status(200).json({
            user: {
                id:user.id,
                email:user.email,
                username:user.username,
                profileSetup:user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color
            },
        })
    }catch(error){
        console.log({error});
        return response.status(500).send("Internal Server Error");
    }
}

export const updateProfile = async (request, response, next) => {
    try{
       
       const {firstName,lastName, color} = request.body;

       if (!firstName || !lastName) return response.status(400).send("All Fields are required");

       const user = await User.findByIdAndUpdate(request.userId,{firstName,lastName,color,profileSetup:true},{new:true, runValidators:true}); 

       if (!user) return response.status(404).send("User not Found");

       return response.status(200).json({
            user: {
                id:user.id,
                email:user.email,
                username:user.username,
                profileSetup:user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color
            },
        })
    }catch(error){
        console.log({error});
        return response.status(500).send("Internal Server Error");
    }
}

export const addProfileImage = async (request, response, next) => {
    try{
       const {color} = request.body;
       if (!request.file) return response.status(400).send("No Image Uploaded");
       const user = await User.findByIdAndUpdate(request.userId,{color:color,image:request.file.path},{new:true, runValidators:true}); 

       if (!user) return response.status(404).send("User not Found");

       return response.status(200).json({
            user: {
                id:user.id,
                email:user.email,
                username:user.username,
                profileSetup:user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color
            },
        })
    }catch(error){
        console.log({error});
        return response.status(500).send("Internal Server Error");
    }
}

export const deleteProfileImage = async (request, response, next) => {
    try{
       const user = await User.findById(request.userId); 

       if (!user) return response.status(404).send("User not Found");

       user.image=undefined;
       await user.save();
       return response.status(200).json({
            user: {
                id:user.id,
                email:user.email,
                username:user.username,
                profileSetup:user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color
            },
        })
    }catch(error){
        console.log({error});
        return response.status(500).send("Internal Server Error");
    }
}

export const logout = async (request, response, next) => {
    try{
       response.cookie("jwt","",{maxAge:1,secure:true, sameSite:"None"})

       response.status(200).send("Logout Successful.");
    }catch(error){
        console.log({error});
        return response.status(500).send("Internal Server Error");
    }
}