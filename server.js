//Import the mongoose module
const mongoose = require("mongoose");

require("dotenv").config();

// Database connection :Connect to MongoDB
mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Database connection error");
    } else {
      console.log("Database connection successful");
    }
  }
);

//   Define a schema : person shema
const { Schema } = mongoose;
const PersonSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Creat a model from schema :person model
const PersonMod = mongoose.model("person", PersonSchema);

// Create an instance of model PersonMod
const Per = new PersonMod({
  name: "beya",
  age: 27,
  favoriteFoods: ["djej mechwi"],
});

// Save the new model instance, passing a callback

Per.save(function (err, data) {
  if (err) {
    return handleError(err);
  } else {
    console.log(data);
  }
});

//Create Many Records with model.create()

PersonMod.create([
  { name: "salma", age: 25, favoriteFoods: ["ff", "gateaux", "burritos"] },
  { name: "sami", age: 10, favoriteFoods: ["hambrg"] },
  { name: "mariem", age: 10, favoriteFoods: ["hambrg"] },
  { name: "mariem", age: 10, favoriteFoods: ["hambrg"] },
]);

// Use model.find() to Search Your Database

PersonMod.find({ name: "salma" }).exec(function (err, data) {
  if (err) {
    return handleError(err);
  } else {
    console.log(data);
  }
});

//Use model.findOne()

PersonMod.findOne({ favoriteFoods: "kouskous" }).exec(function (err, data) {
  if (err) {
    return handleError(err);
  } else {
    console.log(data);
  }
});

// Use model.findById(()
PersonMod.findById("60d0fa8f99e18e0980c12674", function (err, data) {
  if (err) {
    return console.log(err);
  } else {
    console.log(data);
  }
});

//Perform Classic Updates by Running Find, Edit, then Save
PersonMod.findById("60d0fa8f99e18e0980c12673", function (err, data) {
  if (err) {
    return console.log(err);
  } else {
    data.favoriteFoods.push("hamburger");
    console.log(data);
    data.save();
  }
});

// model.findOneAndUpdate()
PersonMod.findOneAndUpdate(
  { name: "salma" },
  { new: true },
  { age: 20 },
  (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(data);
    }
  }
);

// Delete One Document Using model.findByIdAndRemove
PersonMod.findByIdAndRemove("60d0fa8f99e18e0980c12673", (err, data) => {
  if (err) {
    return console.log(err);
  } else {
    console.log(data);
  }
});

// Delete Many Documents with model.remove()
PersonMod.remove(
  { name: "mariem" },
  (done = (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(data);
      console.log(data.deletedCount);
    }
  })
);

// Chain Search Query Helpers to Narrow Search Results
PersonMod.find({ favoriteFoods: "burrito" })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(
    (done = (err, data) => {
      if (err) return console.log(err);
      done(data);
    })
  );
