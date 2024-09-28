import mongoose from "mongoose";
import User from "./dbModel1.js"

// Schema for questions
const postSchema = new mongoose.Schema({
    text: { type: String, required: true },            
    like : {type:Number,default:0},
    share  :{type:Number,default:0},


    imgItem: String,                                   
}, { timestamps: true });



 

 
const CommentPeople = new mongoose.Schema({
    idUserx: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    imgComment: { type: String },
    UsernameComment: { type: String, required: true },
    ProfileImg: { type: String },
    
    replies: {
        type: [
            {
                idUserx: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                comment: { type: String, required: true },
                imgComment: { type: String },
                UsernameComment: { type: String, required: true },
                ProfileImg: { type: String },
                createdAt: { type: Date, default: Date.now }
            }
        ],
        default: [] // Set default value for replies as an empty array
    }
}, { timestamps: true });


 


// Main schema for tracking people and questions
const postBluskyg = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
    post: { type: postSchema },                           
    view : [],
    vote: {type:Number,default:0},
    Comment :{type:  [CommentPeople] ,default : []} ,
    
}, { timestamps: true });

export default mongoose.model('postBluskyg', postBluskyg);
