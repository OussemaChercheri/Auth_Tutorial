import mongoose, { Schema } from 'mongoose';

const userSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            requires: true
        },
        lastName: {
            type:String,
            required:true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: false,
            default: 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        roles: {
            type: [Schema.Types.ObjectId],
            required: true,
            ref: "Role"
        }
        
    },
        
        {
            timestamps: true
        }
);

export default mongoose.model("User", userSchema);