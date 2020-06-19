module.exports = mongoose => {
  // enter DB CollectionName here
  var dbCollectionName= "movies";
  var schema = mongoose.Schema(
    {
      title:String,
      year:String,
      rated:String,
      runtime:String,
      countries:Array,
      genres:Array,
      director:Array,
      writers:Array,
      actors:Array,
      plot:String,
      poster:String,
      imdb:Array,
      tomato:Array,
      metacritic:String,
      awards:Array,
      type:String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const crudModel = mongoose.model(dbCollectionName, schema);
  return crudModel;
};
