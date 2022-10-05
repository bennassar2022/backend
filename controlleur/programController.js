const placeService = require("../services/programService");
const Auth = require("../models/User");

// Create and Save a new program
exports.create = async (req, res, next) => {
  //const usetData= await Auth.findOne({_id:req.body.user_id});
  //if(usetData){
    
      var model = {
        user_id:req.body.user_id,
        place_id: req.body.place_id,
        place_Name: req.body.place_Name,
        start:req.body.start,
        end: req.body.end,
        state: req.body.state,
        email:req.body.email
      };

      placeService.createPlace(model, (error, results) => {
        if (error) {
          return next(error);
        }
        return res.status(200).send({
          message: "Success",
          data: results , 
        
        });
      });
//}else{
 // return res.status(400).send({msg:"this id not fund"})
 //}
};

// Retrieve all Products from the database.
exports.findAll = (req, res, next) => {
  var model = {
    Name: req.query.place_id,
  };

  placeService.getPlaces(model, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};


// Find a single Tutorial with an city
exports.findbyUser = async(req, res, next) => {
  (req.body.user_id) ?  filter = {user_id : req.body.user_id} : filter={user_id:""}
 
 placeService.getPlaceByUser(filter, (error, results) => {
   if (error) {
     return next(error);
   }
   return res.status(200).send({
     message: "Success",
     data: results,
   });
 });

};

exports.delete = (req, res, next) => {
  var model = {
    programId: req.params.id,
  };

  placeService.deletePlace(model, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",

    });
  });
};