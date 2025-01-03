import mongoose from 'mongoose';
import User from "./dbModel1.js"




const Reels = new mongoose.Schema({
    username : {type:String},
    idxUsername :{type:String},
    uuid: {type:String},
    email:{type:String},
    myimg : {type:String},
    title: { type: String },
    videoContent: { type: String },
    Like:[],
    Share : [],


    comments: [
        {
            textReply: { type: String, required: true },
            UserTextId: {type:String},
            Imguser : {type:String},
            usernameComment:{type:String},
            replies: [
                {
                    text: { type: String, required: true },
                    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                    Imguser : {type:String},
                    usernameComment:{type:String}
                },
            ],
        },
    ],



});

export default mongoose.model('reels', Reels);
