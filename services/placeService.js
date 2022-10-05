const place  = require("../models/place");

async function createPlace(params, callback) {
  if (!params.Name) {
    return callback(
      {
        message: "place Name Required",
      },
      
    );
  }

  const placeModel = new place(params);
  placeModel
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getPlaces(params, callback) {
  const Name = params.Name;
  var condition = Name
    ? { Name: { $regex: new RegExp(Name), $options: "i" } }
    : {};

    place
    .find(condition)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getPlaceById(params, callback) {
  const placeId = params.placeId;

  place
    .findById(placeId)
    .then((response) => {
      if (!response) callback("Not found Product with id " + placeId);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

//city
async function getPlaceByCity(params, callback) {
  const city = params.city;

  place
    .find({city})
    .then((response) => {
      if (!response) callback("Not found Product with city " + city);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}


//update
async function updatePlace(params, callback) {
  const placeId = params.placeId;

  place
    .findOneAndUpdate(placeId,{$set:{...params} }, { useFindAndModify: false,new:true })
    .then((response) => {
      if (!response) callback(`Cannot update Tutorial with id=${placeId}. Maybe Tutorial was not found!`);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function deletePlace(params, callback) {
  const placeId = params.placeId;

  place
    .findByIdAndRemove(placeId)
    .then((response) => {
      if (!response) callback(`Cannot delete place with id=${placeId}. Maybe place was not found!`);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  createPlace,
  getPlaces,
  getPlaceById,
  getPlaceByCity,
  updatePlace,
  deletePlace,
};