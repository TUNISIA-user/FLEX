import mongoose from 'mongoose';



const PrivateSessionAdmin = new mongoose.Schema({
    textQuestion: { type: String, required: true },
    id: { type: String, required: true }, // Plain String ID
    name: { type: String, required: true },
    answerUser: { type: String },
    rept : {type:String} // this goona be the order of answer
    
}, { timestamps: true });




const ChatSession = new mongoose.Schema({
    idSession: { type: String },  // Optional field
    nameidSession: { type: String, required: true },  // Required field
    PrivateSession: [PrivateSessionAdmin],
    stautsSession : {type:Boolean,default:false}
}, { timestamps: true });

export default mongoose.model('ChatSession', ChatSession);
