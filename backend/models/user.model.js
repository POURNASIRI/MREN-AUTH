import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePhoto:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw0TV9rTq0e1-fvslZ-ZxrCl&ust=1701696372366000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOCTkJCv84IDFQAAAAAdAAAAABAE"
    }
},{timestamps:true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User