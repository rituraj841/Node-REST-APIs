module.exports = app => {
  const crudRoute = require("../controllers/CRUDcontroller.js");
  var router = require("express").Router();

  router.post("/", crudRoute.create);// Create
  router.get("/", crudRoute.findAll);// Retrieve all
  router.get("/:id", crudRoute.findOne);// Retrieve single entry by :id
  router.put("/:id", crudRoute.update);// Update with id
  router.delete("/:id", crudRoute.delete);// Delete with id
  router.delete("/", crudRoute.deleteAll);// delete all
  app.use("/api/crud", router);
};
