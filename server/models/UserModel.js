import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    firstName: {
        type:String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    color: {
        type: Number,
        required: false,
    },
    profileSetup: {
        type: Boolean,
        default: false,
    }
})

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password,10);
    next();
})

const User = mongoose.model ("Users",userSchema);
export default User;