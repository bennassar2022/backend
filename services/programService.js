const program  = require("../models/program");

async function createPlace(params, callback) {
 

  const programModel = new program(params);
  programModel
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getPlaces(params, callback) {
  const Name = params.place_id;
  var condition = Name
    ? { Name: { $regex: new RegExp(Name), $options: "i" } }
    : {};

    program
    .find(condition)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}



async function getPlaceByUser(params, callback) {
  const user_id = params.user_id;

  program
    .find({user_id})
    .then((response) => {
      if (!response) callback("Not found Product with city " + user_id);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}
async function deletePlace(params, callback) {
  const programId = params.programId;

  program
    .findByIdAndRemove(programId)
    .then((response) => {
      if (!response) callback(`Cannot delete place with id=${programId}. Maybe place was not found!`);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}


module.exports = {
    createPlace,
    getPlaces,
    getPlaceByUser,
    deletePlace
  };