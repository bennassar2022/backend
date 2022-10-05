const mongoose =require('mongoose');
const program = mongoose.Schema({
  user_id:{
    type: String,
    required: true
  },

    place_id:{
        type: String,
        required: true
      },
      place_Name:{
        type: String,
        required: true
      },
   start: {
    type:String,
    required:true
  },
   end:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
   email:{
    type:String,
    required:true
  },
}); 
module.exports = mongoose.model("PROGRAM", program);
