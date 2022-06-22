const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/test")
  .then((_) => {
    console.log("Veri tabanı bağlanıldı");
  })
  .catch((error) => {
    console.log("We have an error about connection... Mongoose");
  });
const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

const yakup = User({ name: "Yakup", surname: 4555, age: 27 });

// veri tabanına kaydetmek için document.save yapmak lazım.
yakup
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
