const mongoose =require('mongoose');
const place = mongoose.Schema({
  user_id:{
        type: String,
        required: true
      },
      city:{
        type: String,
        required: true
      },
   Name: {
    type:String,
    required:true
  },
   description:{
    type:String
  },
   Adresse: {
    type:String,
    required:false
  },
  longitude: {
    type:String,
      required:false
    },
    latitude: {
      type:String,
        required:false
      },
 images:{
    type:Array,
    required: false,
    validate:[ArrayLimit ,'you can pass only 5 places images']
  }
}); 
place.index({location:'2dsphere'});

function ArrayLimit(val){
    return val.length <=4;
}
module.exports = mongoose.model("PLACE", place);
