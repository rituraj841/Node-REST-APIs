const db = require("../config/db.config");
const CRUD = db.CRUDdetail;//binding local var to db values
// Create and Save a new data
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create data
  const crud = new CRUD({
    //define fields as defined in db model
      title: req.body.title,
      year: req.body.year ,
      rated: req.body.rated ,
      runtime: req.body.runtime ,
      countries: req.body.countries ,
      genres: req.body.genres ,
      director: req.body.director ,
      writers: req.body.writers ,
      actors: req.body.actors ,
      plot: req.body.plot ,
      poster: req.body.poster ,
      imdb: req.body.imdb ,
      tomato: req.body.tomato ,
      metacritic: req.body.metacritic ,
      awards: req.body.awards ,
      type: req.body.type
  });
  // console.log("Values in const crud::--"+crud);
  // Save data in the database
  crud
    .save(crud)
    .then(data => {
      res.send(data);
      // console.log("dtata ata "+data);

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating.."
      });
    });
};

//Find all entries in DB.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  CRUD.find(condition)
    .then(data => {

      res.send(data);
      // console.log("Find All Data::- "+data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving."
      });
    });
};

// Find a single entry with :id parameter
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id);

  CRUD.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Item with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Item with id=" + id });
    });
};

// Update with :id parameter in request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  CRUD.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update item with id=${id}. Maybe item was not found!`
        });
      } else res.send({ message: "Item was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating item with id=" + id
      });
    });
};

// Delete with :id parameter in request
exports.delete = (req, res) => {
  const id = req.params.id;

  CRUD.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete item with id=${id}. Maybe item was not found!`
        });
      } else {
        res.send({
          message: "Deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete item with id=" + id
      });
    });
};

// Delete all from DB.
exports.deleteAll = (req, res) => {
  CRUD.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Deleteion successfull!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing."
      });
    });
};
