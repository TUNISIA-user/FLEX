import mongoose from 'mongoose';
 



const Pdf = new mongoose.Schema({
   groupName : {type:String},
   LinkkPdf : {type:String}



});

export default mongoose.model('pdf', Pdf);
