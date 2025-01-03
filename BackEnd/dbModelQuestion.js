import mongoose from "mongoose";

// Schema for questions
const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true },           // The question text
    description: { type: String, required: true },    // Description of the question
    imgItem: String,                                  // Optional image for the question
}, { timestamps: true });

// Schema for users who join a question
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },       // User's name
    email: { type: String, required: true },          // User's email
    imgItem: String,                                  // Optional profile picture
    Score:Number,
    id:String
}, { timestamps: true });
 

const CommentPeople = new mongoose.Schema({
    id: { type: String, required: true },       // User's name
    comment: { type: String, required: true },          // User's email
    imgComment : {type:String},
    UsernameComment :{type:String},
    ProfileImg :{type : String}
}, { timestamps: true });



const veiewT = new mongoose.Schema({
     id:{type:String,unique:true}   
    ,                                 
}, { timestamps: true });




// Main schema for tracking people and questions
const QUESTION = new mongoose.Schema({
    question: { type: QuestionSchema },  
    TypQuestion : String,
    peopleJoined: [UserSchema],                          
    view : [],
    vote: {type:Number,default:0},
    answers : {type:Number,default:0},
    Comment : [CommentPeople],
    
}, { timestamps: true });

export default mongoose.model('SectionQuestion', QUESTION);
