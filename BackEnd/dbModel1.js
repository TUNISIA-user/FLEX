import mongoose from 'mongoose';
import postBluskyg from "./dbCurrentPost.js"; // Include .js extension if needed

const receiveMessageFromAdminSchema = new mongoose.Schema({
    textQuestion: { type: String, required: true },
    id: { type: String, required: true }, // Plain String ID
    name: { type: String, required: true },
    answerFromAdminToUser: { type: String },
    scoreUser: { type: Number }
}, { timestamps: true });



const myQuestion = new mongoose.Schema({
    textQuestion: { type: String, required: true },
    id: { type: String, required: true }, // Plain String ID
    name: { type: String, required: true },
    answerFromAdminToUser: { type: String },
    scoreUser: { type: Number }
}, { timestamps: true });




const myPosts = new mongoose.Schema({
    // textQuestion: { type: String, required: true },
    id: { type: String, required: true }, // Plain String ID
    imgItem : {type:String},
    text : {type: String},
    description:{type:String},

}, { timestamps: true });



 




// this awsome thing in this world


const notificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
  });



  const CopypostSchema = new mongoose.Schema({
    text: { type: String, required: true },            
    like : {type:Number,default:0},
    share  :{type:Number,default:0},
    imgItem: String,                                   
}, { timestamps: true });









const CommentPeople = new mongoose.Schema({
    idUserx: {String },
    comment: { type: String },
    imgComment: { type: String },
    UsernameComment: { type: String },
    ProfileImg: { type: String },
    
    replies: {
        type: [
            {
                idUserx: { type:String},
                comment: { type: String},
                imgComment: { type: String },
                UsernameComment: { type: String },
                ProfileImg: { type: String },
                createdAt: { type: Date, default: Date.now }
            }
        ],
        default: [] // Set default value for replies as an empty array
    }
}, { timestamps: true });



const mylikes = new mongoose.Schema({
    // textQuestion: { type: String, required: true },
    id: { type: String}, // Plain String ID
    name :{type:String},
    email : {type:String},
    imgUser :{type:String}

}, { timestamps: true });



const shareItForThis = new mongoose.Schema({
   
    id: { type: String},  
    namewhoShare :{type:String},
    emailWhoShareIt : {type:String},
    imgUserWhoShareIt :{type:String},
    contentWhoShareitOrText : {type:String},
    imgContentWhoShareit : {type:String}

}, { timestamps: true });




  
// Main schema for users and their questions
const UserSchema = new mongoose.Schema({
    // id:{type:Number,unique:true},
    username: { type: String, required: true },
    email: { type: String, required: true },  
    imgUser :{type:String},
    receiveMessages: [receiveMessageFromAdminSchema],
    myQuestionsBasket : [myQuestion] ,// here add basket to see my all question i wannna asked and then should be deleted for me if i want
    password : String ,
    chatWithAdmin1 :{type:Boolean,default:false},
    SaveMyPost :{type : [myPosts],default:[]},
    isOnline  :{type:String,default:'offline'},
    LastSeen: { type: String, default:""},
    waiting : {type:String,default:"stop"},

    myListChatFriend: {
        type: [String],  
        default: []     
      },
   
      postIpostsINthisApp: [

        { 
            testeur :{type:String,default:"Share"},
            shareItFrom :{type:[shareItForThis],default:[]},
            myPersonnalIdea :{type:String,default:"ShareDPost"},
            userId: {String },  
            post: { type: CopypostSchema },
            email : {type:String},

             view : [],
            vote: {type:Number,default:0},
            Comment :{type:  [CommentPeople] ,default : []} ,
             onwerHasPictuer : {type:String},
             ownerUserName: {type:String},
           
            LikesPost :{type:[mylikes],default:[]},
            repostUser :{type:[],defualt:[]}
          }

      ],

    ScoreRank : {type:Number,default:200},
    noTifaction : {type :[],default:()=>[]},
    getLastesMessages : {type:[],default:()=>[]}  // this handel to get last message you betweb you and user 
    
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
