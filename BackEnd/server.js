import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import  QUESTION from "./dbModelQuestion.js"
import Admin from "./dbAdminSchema.js"
import User from "./dbModel1.js"
import ChatSession from "./dbChatMessages.js"
import ChatTalking  from "./dbTalking.js"
import postBluskyg from "./dbCurrentPost.js" 
import Reels from "./dbReels.js"
import Pdf from "./PdfSehma.js"
import cors from "cors"
import multer from 'multer';
import path from "path"
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http  from "http"
dotenv.config();
 
const app = express();




// web socket io 

const PORT = process.env.PORT ;
app.use(bodyParser.json());
app.use(express.json());
const allowedOrigins = process.env.CORS_ORIGINS.split(',');

mongoose.connect(process.env.CONNECTION_DATABASE)
.then(() => {
    console.log('MongoDB connected'); 
})
.catch(err => console.error(err));
app.use(cors({
    origin: ['http://flex-tunisia-users-projects.vercel.app','https://flex-tunisia-users-projects.vercel.app', 'http://localhost:3000',"https://flex-roan.vercel.app","https://flex-social-social-app.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));

app.use(bodyParser.json({ limit: '10mb' })); // Increase the limit
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));




// app multer 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

 
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Increase as needed
});
 
 



app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
 
    res.status(200).json({ fileUrl: `/uploads/${req.file.filename}` });
});


app.post("/uplod/pdf/busky", async (req, res) => {
    try {
        const newPdf = new Pdf(req.body); // Create a new instance with req.body
        const savedPdf = await newPdf.save(); // Save to the database

        res.status(201).json(savedPdf); // Respond with the saved PDF data
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});



app.get("/all/pdf",async(req,res)=>{
    try{

        const data = await Pdf.find()
        res.status(200).json(data)

    }catch(eroor){
        res.status(404).json(eroor)
    }
})

 



 
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: ['http://flex-tunisia-users-projects.vercel.app','https://flex-tunisia-users-projects.vercel.app', 'http://localhost:3000',"https://flex-roan.vercel.app"],
        
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }
});
 
 
 
 
io.on('connection', (socket) => {
    // console.log('Client connected:', socket.id);
  

    console.log(socket.id)
     
     socket.emit("notifactionFlex",socket.id)

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });

});

 


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

 //--------------------------------------------------------------------


app.get("/",(req,res)=>res.status(200).json("hello test api +9999"))


 



app.post("/postQuestion", async (req, res) => {
    try {
   

     

        const SectionQustion = new QUESTION(req.body);
        await SectionQustion.save();
        res.status(201).send(SectionQustion);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(400).json({ message: error.message });
    }
});



app.get("/getQuestion",async(req,res)=>{
    try{ 

        const SectionQustion =  await  QUESTION.find();
        const DataSorted = SectionQustion.sort((a,b)=>b.creVIatedAt-a.createdAt)
        res.status(201).send(DataSorted)
    }
    catch(eroor){
        res.status(404).json({message : eroor})
        console.log(`this eroor  by ${eroor}`)
    }
})
// here change user data with this user
app.post('/setUserWithAnswer', async (req, res) => {
    try {
      const { username, email, password, imgUser } = req.body;
  
      // Create a new user with the uploaded image URL and other form data
      const newUser = new User({
        username,
        email,
        password, // Store password as plain text (not recommended for production)
        imgUser,  // Cloudinary URL
      });
  
      await newUser.save();
      res.status(200).json(newUser);
    } catch (error) {
      res.status(404).json({ message: error.message });
      console.error(`Error occurred: ${error}`);
    }
  });
  


    // fix this  pictuer here 
app.post("/setAdmin",async(req,res)=>{
    try{
     const setAdmin = new Admin(req.body)
     await setAdmin.save()
     res.status(200).json(setAdmin)
    }catch(eror){
        res.status(404).json({message : eror})
        console.log(`the error by ${eror}`)
    }
})
 app.put('/Admins/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const newComments = req.body.commentsFromAdmin;
        const admin = await Admin.findById(userId);
        if (!admin) {
            return res.status(404).send('Admin not found')}
        admin.commentsFromAdmin.push(...newComments);
        await admin.save();
        res.send('Comments added successfully');
    } catch (error) {
        res.status(400).send(error);
    }
});
app.put('/setAdminstoUser/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const newComments = req.body.receiveMessages;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('Admin not found')
        
        }
        user.receiveMessages.push(...newComments);
        await user.save();
        res.send('Comments added successfully');
    } catch (error) {
        res.status(400).send(error);
    }
});
app.put('/putComment/:id', upload.single('image'), async (req, res) => {
    try {
        // Find the specific question by ID
        const UserCommentData = await QUESTION.findById(req.params.id);

        if (!UserCommentData) {
            return res.status(404).json({ message: "We did not find the question, we're sorry about that." });
        }

        // Add comments to the question
        if (req.body.Comment) {
            // Assuming req.body.Comment is an array of comment objects
            const comments = req.body.Comment
            UserCommentData.Comment.push(...comments);
        }

        // Handle image if it's uploaded
        if (req.file) {
            // Save image details (like path) to your database if necessary
            UserCommentData.images = UserCommentData.images || []; // Initialize if not present
            UserCommentData.images.push(req.file.path); // Store the image path
        }

        // Save updated data
        await UserCommentData.save();

        res.status(200).json({ message: "Updated successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get("/callComments/:id", async (req, res) => {
    try {
        // Find the specific question by ID
        const CallAllComment = await QUESTION.findById(req.params.id);
        if (!CallAllComment) {
            return res.status(404).json({ message: "We don't have anything for this ID" });
        }

        // Find all documents in the QUESTION collection
        const allQuestions = CallAllComment.Comment.sort((a,b)=>b.createdAt-a.createdAt)
       
            
        // Return all the extracted comments
        res.status(200).json(allQuestions);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get("/DashbordAdmin",async(req,res)=>{
    try{ 

        const AdminDashbord =  await  Admin.find();
        const res1 = AdminDashbord.map((b)=>b.commentsFromAdmin).flat()

        res.status(201).send(res1)
    }
    catch(eroor){
        res.status(404).json({message : eroor})
        console.log(`this eroor  by ${eroor}`)
    }
})
app.get("/allUsers",async(req,res)=>{
    try{
        const data = await User.find()
        res.status(200).json(data)
    }catch(eroor){
        console.log(`this eroor by ${eroor}`)
        res.status(402).json({message : eroor})
    }
})
app.post('/test-upload/:id', upload.single('image'), async (req, res) => {
    try {
        // Find the question by ID
        const UserCommentData = await QUESTION.findById(req.params.id);
        if (!UserCommentData) {
            return res.status(404).json({ message: "We did not find the question, we're sorry about that." });
        }

        // Create a new comment object
        const newComment = {
            id: req.body.id, // User ID
            comment: req.body.CommentText, // Comment text
            UsernameComment: req.body.UsernameComment, // Username
            ProfileImg : req.body.ProfileImg
        };

        // Add image path if an image was uploaded
        if (req.file) {
            newComment.imgComment = req.file.path; // Image path
        }

        // Add the comment to the question
        UserCommentData.Comment.push(newComment);

        // Save the updated question data
        await UserCommentData.save();

        res.status(200).json({ message: 'Comment uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
});
app.post("/ChatSession", async (req, res) => {
    try {
        const { idSession, PrivateSession } = req.body;

        // Log the request body to inspect the data
        console.log("Request Body:", req.body);

        if (!idSession || !Array.isArray(PrivateSession)) {
            return res.status(400).json({ message: "idSession and PrivateSession are required." });
        }

        // Create a new ChatSession object with multiple messages in the PrivateSession array
        const newChatSession = new ChatSession(req.body);

        // Log the newly created ChatSession object
        console.log("New ChatSession:", newChatSession);

        // Save the new chat session to the database
        await newChatSession.save();

        // Respond with a success message
        res.status(201).json({ message: "Chat session created successfully", session: newChatSession });
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
app.get("/getChatPostForAdmin",async(req,res)=>{
    try{
        const responseId = await ChatSession.find()
        res.status(200).json(responseId)

    }
    catch(index){
        console.log(index)
        res.status(404).json({message : index})
    }
})
app.put("/ChatSession/:idSession", async (req, res) => {
    try {
        const { idSession } = req.params;
        const { PrivateSession } = req.body; // Array of new messages

        if (!Array.isArray(PrivateSession)) {
            return res.status(400).json({ message: "PrivateSession should be an array of messages." });
        }

        // Find the session by idSession and push the new messages into the PrivateSession array
        const updatedSession = await ChatSession.findOneAndUpdate(
            { idSession },
            { $push: { PrivateSession: { $each: PrivateSession } } }, // Push each new message into the array
            { new: true } // Return the updated document
        );

        if (!updatedSession) {
            return res.status(404).json({ message: "Chat session not found" });
        }

        res.status(200).json({ message: "Messages added successfully", session: updatedSession });
    } catch (error) {
        console.error(`Error occurred: ${error}`);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
app.get("/getChat/:userid",async(req,res)=>{
    try{
     const reponseGetData  = await ChatSession.find({idSession:req.params.userid})
     res.status(200).json(reponseGetData[0].PrivateSession) // and this should be Handel This Data 
     
    }
    catch(eroor){
        console.log(`this eroor by ${eroor}`)
        res.status(404).json({message :  "this user not found in this data base check other data bases"})
        res.status(405).json({message : eroor})
    }
})
app.get("/auth/:email",async(req,res)=>{
    try{
     const response = await User.find({email:req.params.email})
     // here just add password for u to know which user you gonna user
     res.status(202).json(response)
    }
    catch(eroor){
        console.log(`this eroor by ${eroor}`)
        res.status(404).json({message : eroor})
    }
})
app.put("/check/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,
            {chatWithAdmin1:true},
            {new : true}
        );
        if (!user) {
            return res.status(404).json({ message: "This user does not exist" });
        }
        // inside  the user their chalo bame chatWithadmin i wanna chang this ture 
        res.status(200).json(user);
    } catch (error) {
        console.log(`This error caused: ${error}`);
        res.status(500).json({ message: error });
    }
});
app.post("/pushMyBasket/:id", async (req, res) => {
    try {
        const Document = req.body;
         
        const testUser = await User.findById(req.params.id);
        
        if (!testUser) {
            return res.status(404).json({ message: "This user does not exist" });
        }

        const existingPost = testUser.SaveMyPost.find(post => post.text === Document.text);
        
        if (existingPost) {
            return res.status(400).json({ message: "This question is already in your basket." });
        }  


        testUser.SaveMyPost.push(Document);
        await testUser.save(); // Save the updated user document

        res.status(200).json({ message: "Document successfully added", SaveMyPost: testUser.SaveMyPost });

    

    } catch (error) {
        console.log(`This error: ${error}`);
        res.status(500).json({ message: "An error occurred" });
    }
});
app.get("/getProfile/:id",async(req,res)=>{
    try{
       const response = await User.findById(req.params.id)
       
       if(!response){
        res.status(400).json({message : "this id not here exist"})
       }
       res.status(200).json(response.SaveMyPost)
    }catch(eroor){
        console.log(`this eroor by ${eroor}`)
        res.status(404).json({message :eroor})
    }
})
app.post("/postVies/:id",async(req,res)=>{
    try{
        const {userIdJoin} = req.body

     const  userQuestion = await QUESTION.findById(req.params.id)
     const  testIdUser = await User.find({_id:userIdJoin})
     if(!testIdUser){
        res.status(404).json({msssage : "ops this user ddens not here"})
     }
     
     if(!userQuestion){
        res.status(404).json({message :" we dont find the user here "})
     }
    const CheckQuestion = userQuestion.view.filter((b)=>b===userIdJoin)
     if(CheckQuestion.length>0){
          res.status(400).json({message :"This id already here"})
}
else{
    const UpdateOne = await QUESTION.findOneAndUpdate(
        {_id:req.params.id},
        {$push :{view : req.body.userIdJoin}},
        {new:true}
     )
     res.status(202).json(UpdateOne)

}
   

    }
    catch(eroor){
        console.log(`This Eroor by ${eroor}`)
        res.status(404).json({message : eroor})
    }
})
app.get("/viewLen/:id",async(req,res)=>{
    try{
      const View =  await QUESTION.findById(req.params.id)
     
     
      res.status(200).send(View.view)
    }
    catch(eroor){
        console.log(`this eroor by ${eroor}`)
        res.status(404).json({message :eroor})
    }
})
 app.post("/deltevi/:id",async(req,res)=>{
     try{
      
      const  userQuestion = await QUESTION.findById(req.params.id)

      if(!userQuestion){
         res.status(404).json({message :" we dont find the user here "})
      }
 
      const UpdateOne = await QUESTION.findOneAndUpdate(
         {_id:req.params.id},
         {$pull :{view : req.body.userIdJoin}},
         {new:true}
      )
      res.status(202).json(UpdateOne)
      

     }
     catch(eroor){
         console.log(`This Eroor by ${eroor}`)
         res.status(404).json({message : eroor})
     }
 })

app.post("/deltePosts/:id",async(req,res)=>{
    try{
    const {userPost} = req.body
     const Data = await User.findById(req.params.id)
     if(!Data){
        res.status(404).json("This Post Does Not Exist")
     }
   
      

     const UpdateOne = await User.findOneAndUpdate(
        {_id:req.params.id},
        {$pull :{SaveMyPost : {_id:userPost}}},
        {new:true}
     )

    res.status(200).json(UpdateOne)


    }catch(eroor){
        res.status(404).json({message : eroor})
    }
}) // and this data goona be dlet it 

// -----------------------section Chat app------------------------------------------------------------
app.post("/accesMessage/:id", async (req, res) => {
    try {
        const { userId, txt ,imgUser,imgProfile} = req.body; 
 
        let isChat = await ChatTalking.findOne({
            $and: [
                { users: { $elemMatch: { $eq: req.params.id } } }, 
                { users: { $elemMatch: { $eq: userId } } }  
            ]
        });
        

        if (isChat) {

          
            isChat.messages.push({
                imgUser : imgUser,
                senderId: userId,  
                content: txt,  
                timestamp: new Date() ,
                imgProfile : imgProfile,

            });
             
            io.emit("PrvMessages", { room: isChat });

            await isChat.save();
            // like here if i push some message to user  get preveous message and increamnt to my new message and send it again to front and this mean should be do  the logic if this chat exisit get it instead this telle me this good idea for this or no ? 
            return res.json(isChat);  
           

        } else {
             
            const newChat = new ChatTalking({
                users: [req.params.id, userId],  
                messages: []
            });
            await newChat.save(); // Save the new chat
            return res.json(newChat); // Return the new chat
       
        }

    } catch (error) {
        console.log(`This Error by ${error}`); // Log the error
        res.status(404).json({ message: error }); // Send a 404 response with the error message
    }
});
app.post("/get/access/message/:id",async(req,res)=>{

try{

    const { userId } = req.body; 
 
    let isChat = await ChatTalking.findOne({
        $and: [
            { users: { $elemMatch: { $eq: req.params.id } } }, 
            { users: { $elemMatch: { $eq: userId } } }  
        ]
    });
 
    res.status(200).json(isChat)


}catch(eroor){
    res.status(404).json({message : eroor})
}

})
//-----------------------------------------Delete Messages-----------------
app.post("/delete/access/message/:id", async (req, res) => {
    try {
      const { userId, messageId } = req.body;
      
                                           
      // Use $pull to directly attempt to remove the message from the chat
      const result = await ChatTalking.updateOne(
        { 
          users: { $all: [req.params.id, userId] }  // Ensure both users are part of the chat
        },
        { $pull: { messages: { _id: messageId } } }
      );
  
      if (result.modifiedCount > 0) {
        res.status(200).json("Message deleted successfully");
      } else {
        res.status(404).json("Chat or message not found");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

//----------------------------------------------------------
app.get("/get/access/specif/:id", async (req, res) => {
    try {
      // Get the user ID from the URL parameters
      const userId = req.params.id;
  
      // Find all chats that include the specified user
      let chats = await ChatTalking.find({
        users: userId // Check if the user ID is in the users array
      });
  
     
      if (chats.length > 0) {
        let TalkingWith  = []
        const matchedChat = chats.filter(chat=>chat.users.includes(userId))
        matchedChat.forEach(chat=>{
           
          

            chat.users.forEach(user=>{
                if(user !==userId){
                    TalkingWith.push(user)
                }
            })
        })
        const reallyUnique = TalkingWith.filter((item)=>item!=req.params.id)
      // get operation from data  ----------------------------------------------------------
     
      const userf =  await Promise.all(
        reallyUnique.map((item)=>User.find({_id:item._id})) // in this part give me this eroor
   


      )
      //currentid:req.params.id,data:reallyUnique,
    
    
        res.status(200).json(userf.flat()); 
      } else {
        res.status(404).json({ message: "No chats found for this user" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle server errors
    }
  });
  
app.get("/get/allAuthor",async(req,res)=>{
    try{
           const Users1  = await User.find()
           res.status(200).json(Users1)
    }catch(eroor){
        res.status(404).json({messsage : eroor})
    }
})

app.get("/get/accesUser",async(req,res)=>{
    try{
    
    const keyWord = req.query.search  ? {
        $or : [
            {username : {$regex : req.query.search,$options:'i'}},
            {email : {$regex : req.query.search,$options:'i'}}
        ]
    }: {}

     const funcdata = await User.find(
        {...keyWord,
        _id:{$ne : req.body.currentid}})

     res.status(200).json(funcdata)

    }
    catch(eroor){
        res.status(404).json({message  : eroor.message})
    }
})


//-------------------check server online --------------------------


app.post('/update/user/status/:id',async(req,res)=>{
    try{
            await User.findByIdAndUpdate(
            {_id  : req.params.id},
            {isOnline : "true"},
            {new : true}
          )
          res.status(200).json("we Update status")
    }catch(eroor){
        res.status(404).json({message : eroor})
    }
})
app.post('/update/offline/user/status/:id',async(req,res)=>{
    try{
            await User.findByIdAndUpdate(
            {_id  : req.params.id},
            {isOnline : "false"},
            {new : true}
          )
          res.status(200).json("we Update status false succesfully")
    }catch(eroor){
        res.status(404).json({message : eroor})
    }
})
app.post('/update/offline/user/lastseen/:id',async(req,res)=>{
    try{
           const fata =  await User.findByIdAndUpdate(
            {_id  : req.params.id},
            {LastSeen : req.body.lastseen},
            {new : true}
          )
          res.status(200).json(fata)
    }catch(eroor){
        res.status(404).json({message : eroor})
    }
})
app.get("/get/date/user/:id",async(req,res)=>{
    try{
      const reponse = await User.findById(req.params.id)

  
      res.status(200).json(reponse)
}catch(eroor){
    res.status(404).json({message : eroor})
}
})



// ------------------------------------------------POSTS SECTION ----------------------
 

// so this punlic  posts 
app.post("/post-posts/:id", async (req, res) => {
    try {
        const findUser = await User.findById(req.params.id);

        if (!findUser) {
            return res.status(404).json({ message: "We couldn't find the user" });
        }

        // Create a new post
        const uploadPosts = new postBluskyg({
            userId: findUser._id,  // Reference the user by their ObjectId
            post: req.body.post,
            view: req.body.view,
            vote: req.body.vote,
            Comment: [],
            onwerHasPictuer : req.body.onwerHasPictuer,
            ownerUserName: req.body.ownerUserName,
            email : req.body.email,
            LikesPost :[],
            repostUser :[]
        });

        await uploadPosts.save();

        // Optionally populate user information
        const populatedPost = await postBluskyg.findById(uploadPosts._id)
       
            io.emit("event_post",populatedPost)
            
        res.status(200).json(populatedPost);   
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message || "An unknown error occurred" });
    }
});

// here let create fast api 

app.post("/postPost/profileY/:id", async (req, res) => {
    try {
        const FindIdUser = await User.findById(req.params.id);
        
        if (!FindIdUser) {
            return res.status(404).json({ message: "User not found" });
        }

   
 

        
        FindIdUser.postIpostsINthisApp.push(req.body);
        await FindIdUser.save();

        res.status(200).json(FindIdUser);  // Return updated user document
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message || "An unknown error occurred" });
    }
});

// post comment 
app.post('/post-comment/:id', async (req, res) => {
    try {
        const {  comment, imgComment, UsernameComment, ProfileImg } = req.body; // Destructure necessary fields

        // Find the post by ID
        const post = await postBluskyg.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Create a comment object to push
        const newComment = {
            idUserx: req.params.id, // Ensure currentUserId is an ObjectId
            comment,
            imgComment,
            UsernameComment,
            ProfileImg,
        };

        // Push the new comment into the Comment array
        post.Comment.push(newComment);

        // Save the updated post
        await post.save();  

        res.status(200).json(post); // Return the updated post
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: "An error occurred", error });
    }
});
 
app.post('/post-comment/replies/:postId', async (req, res) => {
    try {
        const { currentUserId, comment, imgComment, UsernameComment, ProfileImg, commentId } = req.body;

        // Find the post by ID
        const post = await postBluskyg.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Find the specific comment by its ID inside the post's comments array
        const targetComment = post.Comment.find((com) => com._id.toString() === commentId);
        if (!targetComment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        // Create the reply object
        const newReply = {
            idUserx: currentUserId,
            comment,
            imgComment,
            UsernameComment,
            ProfileImg,
        };

        // Push the new reply into the replies array of the specific comment
        targetComment.replies.push(newReply);

        // Save the updated post
        await post.save();  

        res.status(200).json(post); // Return the updated post
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: "An error occurred", error });
    }
});


  app.get('/post-comment/fetch', async (req, res) => {
  
      try {
          const allComments = await postBluskyg.find()
          const sortTeodata = allComments.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
          res.status(200).json(sortTeodata);
      } catch (error) {
          console.error(error); // Log the error
          res.status(500).json({ message: "An error occurred", error });
      }
  });


//-----------------------------------------------------------------------------------

 


app.get('/post-comment/fetchx/:id', async (req, res) => {
    console.log("Received request:", req.params);
    try {
        // Find the post by ID
        const allComments = await postBluskyg.findById(req.params.id);

        if (!allComments) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Sort comments by `createdAt`, newest first
        const sortedComments = allComments.Comment.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt); // descending order (latest first)
        });

        // Respond with the sorted comments
        res.status(200).json({ AllComment: allComments, specifCommnt: sortedComments });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: "An error occurred", error });
    }
});



// reply section

 
app.post("/set/typing/:id", async (req, res) => {
    try {
        // Find the user by ID
        const waitingD = await User.findById(req.params.id);
        if (!waitingD) {
            // Send 404 if the user is not found and return to stop execution
            return res.status(404).json({ message: "This user does not exist" });
        }

        // Update the typing status
        const updateTyping = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { waiting: req.body.isTyping } },
            { new: true } // This option returns the updated document
        );

        // Send the updated user back as a response
        res.status(200).json(updateTyping);
    } catch (error) {
        console.log(`This error occurred: ${error}`);
        // Send an error response in case of failure
        res.status(500).json({ message: "Server error" });
    }
});



// ---------------------------------post likes----------------------
app.post("/setLikePost/:id", async (req, res) => {
    try {
      // Find the user by ID
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json("User not found");
      }
  
      // Check if the post exists
      const post = await postBluskyg.findById(req.body.PostId);
      if (!post) {
        return res.status(404).json("Post not found");
      }
  
      // Check if the user already liked the post
      const isLiked = post.LikesPost.some(like => like.id === req.params.id);
      if (isLiked) {
        return res.status(409).json("User already liked this post");
      }
  
      // Create an object to push to LikesPost array
      const userObject = {
        id: req.params.id,  // User ID
        name: user.username,    // User name
        email: user.email  , // User email
        imgUser :user.imgUser,
      };
      
      // Push the user's object using updateOne
      const updatedPost = await postBluskyg.updateOne(
        { _id: req.body.PostId },  // Find the post by its ID
        { $push: { LikesPost: userObject } },  // Add the user object to the LikesPost array
        { new: true }
      );
  
      
      if(updatedPost){
        res.status(200).json("susccess : )")
      }else{
        res.status(404).json("failed : )")
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });
  // -------get post like ------------------------------------

app.post("/getLikesPost/:id",async(req,res)=>{
    try{
        const getData = await postBluskyg.findById(req.params.id)
        if(getData){
            res.status(200).json(getData.LikesPost)
        }
    }catch(eroor){
        console.log(eroor)
    }
})
app.post("/verifyIfyouHaveLikeOrNo/:id", async (req, res) => {
    try {
        // Find the post by ID
        const getData = await postBluskyg.findById(req.params.id);

        if (getData) {
            // Check if the user has already liked the post
            const userLiked = getData.LikesPost.find(b => b.id === req.body.PostId);

            if (userLiked) {
                // Use $pull to remove the user from LikesPost array
                await postBluskyg.findByIdAndUpdate(
                     req.params.id,
                    { $pull: { LikesPost: { id: req.body.PostId } } },
                    { new: true } // Return the updated document
                );

                return res.status(200).json("User removed from LikesPost.");
            } else {
                return res.status(404).json("User has not liked this post.");
            }
        } else {
            return res.status(404).json("Post not found.");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error.");
    }
});





// check request if this user already have or no


app.post("/verifyD/:id", async (req, res) => {
    try {
        const getData = await postBluskyg.findById(req.params.id);

         if (getData) {
             // Filter LikesPost to find the specific user
           const userLiked = getData.LikesPost.filter(b => b.id ==req.body.PostId); //Assuming you're passing userId in request body

           if (userLiked.length>0) {
               
               return res.status(200).json("true");
            } else {
                return res.status(404).json("false");
            }
        } else {
            return res.status(404).json("Post not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
});
app.post("/remove/post/:id", async (req, res) => {
    try {
      // Find post by its ID
      const post = await postBluskyg.findById(req.params.id);
      if (!post) {
        return res.status(404).json("This post does not exist.");
      }
  
      // Verify if the post belongs to the user (based on userId)
      if (post.userId.toString() !== req.body.useridIdentfy) {
        return res.status(405).json("This user ID is not authorized to delete this post.");
      }
      
  
      // Delete the post
      const deletedPost = await postBluskyg.findByIdAndDelete(req.params.id);
  
      if (deletedPost) {
        return res.status(200).json("Post successfully deleted 🎉🎉🎉");
      } else {
        return res.status(404).json("Failed to delete the post, please try again.");
      }
    } catch (error) {
      // Handle any other errors
      return res.status(500).json("An error occurred: " + error.message);
    }
  });
app.post("/testIfIexist/:id",async(req,res)=>{
    try{
        const data = await postBluskyg.findById(req.params.id)
        
        if(!data){
            res.status(404).json("we dont found this ueser here")
        }
        const datF  = (data.userId.toString()===req.body.useridIdentfy)
        if(datF){
            res.status(200).json({message :"true"})
        }else{
            res.status(404).json({message : "false"})
        }
    }catch(eroor){
        console.log(eroor)
    }
})
 app.post("/copyText/:id",async(req,res)=>{
     try{
         const data = await postBluskyg.findById(req.params.id)
        
         if(!data){
             res.status(404).json("we dont found this ueser here")
         }
         
         res.status(200).json({message : data.post.imgItem})
     }catch(eroor){
         console.log(eroor)
     }
 })
  

 // ------- do logic avoide return data again-----

 app.post("/avoidRquest/:id",async(req,res)=>{ 
    try{
        const MatchUser  = await User.findById(req.params.id)
        if(!MatchUser){
            res.status(404).json("we dont found this users in this data base")
        }
        const StoreOne =  await User.findByIdAndUpdate(
            req.params.id,
            {$addToSet:{myListChatFriend :req.body.mycurrentId}},
            {new : true}
        )
        const SendRequestToMe  = await User.findOne({_id:req.body.mycurrentId})
        if(!SendRequestToMe){
            res.status(404).json("we dont found you")
        }
        const StoreMyRequest =  await User.findByIdAndUpdate(
            req.body.mycurrentId,
            {$addToSet:{myListChatFriend :req.params.id}},
            {new : true}
        )

        return res.status(200).json(StoreMyRequest)


    }catch(eroor){
        res.status(404).json(eroor)
    }
 })


 app.post("/getAvoideRequest/:id",async(req,res)=>{
    try{
        const Datat = await User.findById(req.params.id)
        res.status(200).json(Datat.myListChatFriend)

    }catch(eroor){
        res.status(404).json("this user does not found in this data base go check other data bases")
    }
 })


 

// In your API endpoint for posting a video
app.post('/api/videos/webSocket', async (req, res) => {

    try {
        const newVideo = new Reels(req.body);
        await newVideo.save();
  
        // Emit the new video data via WebSocket
    ;
        // wss.clients.forEach((client) => {
        //     if (client.readyState === WebSocket.OPEN) {
        //         console.log('Sending message to WebSocket client');
        //         client.send(JSON.stringify({ type: 'newVideo', video: newVideo }));
        //     }
        // });

        res.status(201).json(newVideo);
    } catch (error) {
        console.error('Error creating video:', error);
        res.status(500).json({ message: 'Error creating video', error: error.message });
    }
});


app.get("/api/video/get/websocket",async(req,res)=>{

    try{
        const data =await Reels.find()
        res.status(200).json(data)
    }catch(eroor){
        res.status(404).json(eroor)
    }
})


//-------------------------------------
 




app.post("/api/author/profile/:id",async(req,res)=>{

    try{
        const data =await User.findById(req.params.id)
        res.status(200).json(data)
    }catch(eroor){
        res.status(404).json(eroor)
    }
})



app.post("/send/notification/author/:id", async (req, res) => {
    try {
        
       
        // Use $push to add the notification to the 'noTifaction' array
        const Post = await User.findByIdAndUpdate(
             req.params.id,
            { $push: { noTifaction: req.body } }, // Push the data from req.body.notification
            { new: true } // Return the updated document
        );

        // Check if the user was found
        if (!Post) {
            return res.status(404).json("We didn't find a user");
        }

   
        console.log(req.body)
        if(req.body.myid!=req.body.recipientId){
            console.log("you have match with this ")
            io.emit(`${req.body.recipientId}`, { type: "increment", data: req.body });
            
        }
        res.status(200).json(Post); // Send back the updated user document

    } catch (error) {
        res.status(500).json(error); // Catch and handle any errors
    }
});

app.get("/get/notifacation/:id",async(req,res)=>{
    try{

         const GetDataD = await User.findById(req.params.id)
         res.status(200).json(GetDataD.noTifaction)
    }
    catch(eroor){
        res.status(404).json(eroor)
    }
})


// do this in personalle profile
app.get("/getScoreRank",async(req,res)=>{
    try{  
        const rankd = await User.find()
        res.status(200).json(rankd)
               
    }
    catch(eroor){
        console.log(eroor)
    }
})
app.use('/uploads', express.static('uploads'));



// ---------------Block User--------------
app.post("/blockChat/:id", async (req, res) => {
    try {
        const { userId} = req.body; 
 
        let UpdateChat  = await ChatTalking.findOneAndUpdate({

            $and: [
                { users: { $elemMatch: { $eq: req.params.id } } }, 
                { users: { $elemMatch: { $eq: userId } } }  
            ]


        },

        {$set : {Block:true}},
        {new : true}
    
    );
        if(!UpdateChat){
            res.status(404).json("we dont found this caht in this data bae")
        }
         
    
    res.status(200).json({ message: "Chat blocked successfully", chat: UpdateChat });
    }
   catch(eroor){
    res.status(404).json(eroor)
   }

}
)



app.post("/unblock/:id", async (req, res) => {
    try {
        const { userId} = req.body; 
 
        let UpdateChat  = await ChatTalking.findOneAndUpdate({

            $and: [
                { users: { $elemMatch: { $eq: req.params.id } } }, 
                { users: { $elemMatch: { $eq: userId } } }  
            ]


        },

        {$set : {Block:false},DataBlocker: []},
         
        {new : true}
    
    );
        if(!UpdateChat){
            res.status(404).json("we dont found this caht in this data bae")
        }
         
    
    res.status(200).json({ message: "Chat blocked successfully", chat: UpdateChat });
    }
   catch(eroor){
    res.status(404).json(eroor)
   }

}
)


app.post("/deleteConversation/:id", async (req, res) => {
    try {
        const { userId} = req.body; 
 
        let UpdateChat  = await ChatTalking.findOneAndUpdate({

            $and: [
                { users: { $elemMatch: { $eq: req.params.id } } }, 
                { users: { $elemMatch: { $eq: userId } } }  
            ]


        },

        {$set : {messages:[]}},
        {new : true}
    
    );
        if(!UpdateChat){
            res.status(404).json("we dont found this caht in this data bae")
        }
         
    
    res.status(200).json({ message: "Chat blocked successfully", chat: UpdateChat });
    }
   catch(eroor){
    res.status(404).json(eroor)
   }

}
)




app.post("/addBlocker/:id", async (req, res) => {
    try {
        const { userId} = req.body; 
 
        let UpdateChat  = await ChatTalking.findOneAndUpdate({

            $and: [
                { users: { $elemMatch: { $eq: req.params.id } } }, 
                { users: { $elemMatch: { $eq: userId } } }  
            ]


        },
        { $push: { DataBlocker: req.body.blokcerAccount } },
        {new : true},
    
    );
        if(!UpdateChat){
            res.status(404).json("we dont found this caht in this data bae")
        }
         
    
    res.status(200).json({ message: "Chat blocked successfully", chat: UpdateChat });
    }
   catch(eroor){
    res.status(404).json(eroor)
   }

}
)




app.post("/deleteConversation/:id", async (req, res) => {
    try {
        const { userId} = req.body; 
 
        let UpdateChat  = await ChatTalking.findOneAndUpdate({

            $and: [
                { users: { $elemMatch: { $eq: req.params.id } } }, 
                { users: { $elemMatch: { $eq: userId } } }  
            ]


        },

        {$set : {messages:[]}},
        {new : true}
    
    );
        if(!UpdateChat){
            res.status(404).json("we dont found this caht in this data bae")
        }
         
    
    res.status(200).json({ message: "Chat blocked successfully", chat: UpdateChat });
    }
   catch(eroor){
    res.status(404).json(eroor)
   }

}
)


// --- this section for get my post post it in this  app for thi react 🎉🎉🎉-------
// click  in top user to get his id 

app.post("/getMyposts/:id",async(req,res)=>{
    try{
 
         const getDataFromClient  = await User.findById(req.params.id)
         if(!getDataFromClient){
            res.status(404).json("we dont find this user in this data base ")
            
         }                           
         const v = getDataFromClient.postIpostsINthisApp

         res.status(200).json({myallData : getDataFromClient , specifPost:v })
    }catch(eroor){
        console.log(eroor)
    }
})




//

// app.get("/getMyposts/:id", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);

//         if (!user) {
//             return res.status(404).json({ message: "User not found in the database." });
//         }

//         const posts = user.postIpostsINthisApp;
//         res.status(200).json({ myallData: user, specifPost: posts });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "An error occurred on the server." });
//     }
// });

//


// build Tehme 



app.post("/ChangeTehme/:id", async (req, res) => {
    try {
        const {userId} = req.body; 
        const {nameTheme}  = req.body
 
        let UpdateChat  = await ChatTalking.findOneAndUpdate({

            $and: [
                { users: { $elemMatch: { $eq: req.params.id } } }, 
                { users: { $elemMatch: { $eq: userId } } }  
            ]


        },

        {$set : {tehmeTemplte:nameTheme}},
        {new : true}
    
    );
        if(!UpdateChat){
            res.status(404).json("we dont found this caht in this data bae")
        }
         
    
    res.status(200).json({ message: "Chat blocked successfully", chat: UpdateChat });
    }
   catch(eroor){
    res.status(404).json(eroor)
   }

}
)


// web socket messages 


// app.post("/check/users/freind/:id",async(req,res)=>{

//     try{
    
//         const { userId } = req.body; 
     
//         let isChat = await ChatTalking.findOne({
//             $and: [
//                 { users: { $elemMatch: { $eq: req.params.id } } }, 
//                 { users: { $elemMatch: { $eq: userId } } }  
//             ]
//         });
//         if (isChat) {
//             return res.status(200).json({ isFriend: true });
//           } else {
//             return res.status(404).json({ isFriend: false });
//           }
    
    
//     }catch(eroor){
//         res.status(404).json({message : eroor})
//     }
    
//     })

// check if user exsit here 



app.post("/check/users/freind/:id",async(req,res)=>{

    try{
    
        const { userId } = req.body

       const Math  = await  User.findById(req.params.id)
       
       const FilterData = Math.myListChatFriend.find((track)=>track===userId)
     
         res.status(200).json(FilterData?true:false)
    
    }catch(eroor){
        res.status(404).json({message : eroor})
    }
    
    })

    //------------------------------


    app.post("/request/:id",async(req,res)=>{

        try{
        
            
    
           const Math  = await  User.findById(req.params.id)
           
 
         
             res.status(200).json(Math.username)
        
        }catch(eroor){ 
            res.status(404).json({message : eroor})
        }
        
        })


        




   
