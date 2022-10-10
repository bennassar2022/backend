const placeService = require("../services/placeService");
const Auth = require("../models/User");


// Create and Save a new place

exports.create = async (req, res, next) => {
  console.log(req.body.user_id)
  const usetData= await Auth.findById(req.body.user_id);
  if(usetData){ 
    try{
  
     let filesArray =[];
     req.files.forEach(element => {
      const file= {
      path: "http://192.168.1.17:3000/uploads/"+element.filename,
      }
    //  console.log(element.path) ;
      filesArray.push(file);
     });
    
      var model = {
        user_id:req.body.user_id,
        Name: req.body.Name,
        description: req.body.description,
        Adresse: req.body.Adresse,
        images: filesArray,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        city:req.body.city
      };

      placeService.createPlace(model, (error, results) => {
        if (error) {
          return next(error);
        }
        return res.status(200).send({
          message: "Success",
          data: results,
        });
      });

}catch(error){
  res.status(400).send(error.message);
}
}else{
  return res.status(400).send({msg:"this id not compatible"})
 }
};
// Retrieve all Products from the database.
exports.findAll = (req, res, next) => {
  var model = {
    Name: req.query.Name,
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
// Find a single Tutorial with an id
exports.findOne = (req, res, next) => {
  var model = {
    placeId: req.params.id,
  };

  placeService.getPlaceById(model, (error, results) => {
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
exports.findbyCity = async(req, res, next) => {
   (req.body.city) ?  filter = {city : req.body.city} : filter={city:""}
  
  placeService.getPlaceByCity(filter, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });

};


// Update a place by the id in the request
exports.update = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      var arrImages =[];
      if(req && req.file && req.file.filename){
        var arrImages = req.file.filename;
       }
      
       for(var i =0; i < arrImages.length; i++){
  // Get the purchased details passed from the form
        arrImages[i];
       }

   


      placeService.updatePlace(req.body, (error, results) => {
        if (error) {
          return next(error);
        }
        return res.status(200).send({
          message: "Success",
          data: results,
        });
      });

      model2 = "";
    }
  });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res, next) => {
  var model = {
    placeId: req.params.id,
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
