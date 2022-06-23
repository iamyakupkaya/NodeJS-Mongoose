// we create a dataset how have 100 data from JSON Generator
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// mongosee version ==> ^6.4.0"
mongoose
  .connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connection database is successful");
  })
  .catch((error) => {
    console.log("WARN.! Conneciton database is unsuccessful");
  });

/* Eğer veri eklerken kuralımız yok varolan bir yapıyı kullanıyorsak
  schema oluşturmamız gerekmiyor direkt model oluşturabilirz */

// bir şemamız olmadığı için boş obje verdik ayrıca collection adımızı users yaptık

const userSchema = mongoose.Schema(
  { eyeColor: String },
  { collection: "users" }
);
const User = mongoose.model("user", userSchema);

// age 25 olanları getir ama 3 tane getir, sort ile name değerine göre tersten sırala, select değerine göre name getir, age getir id getirme

/* User.find({ age: 25 })
  .limit(3)
  .sort({ name: -1 })
  .select({ name: 1, age: 1, _id: 0 })
  .then((users) => {
    console.log(users);
  })
  .catch((err) => {
    console.log(err);
  }); */

// Comparation Operators $
/* 
  $eq = equal = eşittir =
  $ne = not equal = eşit değildir !=
  $gt = greater than = büyüktür >
  $gte = greater than or equal = büyük veya eşit >=
  $lt = less than = küçüktür <
  $lte = less than or equal = küçük veya eşit <=
  $in = içersinde olanları, dahil olanları getir. dizi olarak belirtilir.
  $nin = not in  = verilen dizi elemanı dışındakileri getir.

*/

//yaşları 25ten büyük ve eşit 35 ten küçük ve eşit olanların adlarını ve yaşlarını getirecek
// yani 25 ila 35 arasında
/* User.find({ age: { $gte: 25, $lte: 35 } }, { name: 1, age: 1, _id: 0 })
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  }); */

//$in
// yaşı 23, 35 ve 28 olanları getir demektir
/* User.find({ age: { $in: [23, 35, 28] } }, { name: 1, age: 1, _id: 0 })
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  }); */

//$nin
// yaşı 23, 35 ve 28 dışında olanları getir
/* User.find({ age: { $nin: [23, 35, 28] } }, { name: 1, age: 1, _id: 0 })
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  }); */

// LOGICAL OPERATORS AND, OR

// şartı sağlayan tüm alanları getir
/* User.find()
  .and([{ age: 23, gender: "male" }])
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  });
 */

//AND
// şartı sağlayan ve verieln filtreye uyan tüm alanları getir
//şartları and ile yazdığımız için find filteleme kısmına boş obje veriyoruz ama görmek istediğimiz
//  ... alanlar için querymizi veriyoruz.
/* User.find({}, { name: 1, gender: 1, age: 1, _id: 0 })
  .and([{ age: 23},{gender: "male" }])
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  }); */

// OR
/* User.find({}, { name: 1, eyeColor: 1, age: 1, _id: 0 })
  .or([{ age: 23 }, { eyeColor: "blue" }])
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  }); */

// ----------------------------------------------------------------
// UPDATE
/* //new:true güncellemeyi consolda da döndürür ama normalde new:false bize eski datayı döndürür ve güncelleme sadece veritabanında olur geri dönen obje güncellenmiş
//... obje olmaz
// ÖNEMLİ.! Eğer schema da belirttiğimiz alanlar yoksa güncelleme olmaz
//... eğer güncelleyeceğimiz alanlar varsa bunu schema da belirtmek zorundayız.
// ÇOK öNEMLİ Normlade overwrite default olarak false değerdedir zaten ama biz onu true yaparsak güncellediğimiz değer sadece kalır diğer tüm değerlerin üzerine yazılır
//... yani önceki tüm değerleri siler binevi saece güncellediğimiz değerler güncel hali ile kalır. O yüzden true yapmadım ve ona göre de kullnılmalı :)
// tabii amacımız buysa bunu Model.findOneAndReplace metodunu kullarak yapmak daha doğru olacaktır.

User.findByIdAndUpdate(
  "62b41244ff06f8f163129adf",
  { age: 35 }, // bu aslında {$set: {age:45}} demektir yani age değerini set ediyoruz
  // {$inc:{age:2}} dersek bu normalde age değerini alır ve 2 ekler
  { new: true, overwrite: false }
)
  .lean() // lean kullanımı bize direkt JS tabanlı data verir eğer lean yapmazsak bunu mongoose documente dönültürdğü için daha yavaş olur
  // daha hızlı olmasını istiyorsak eğer lean() kullanmak daha mantıklı
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  }); */

//indexi 5 olan değeri güncelleyeceğiz dedik. Ama update etmek için schema ya update edeceğimiz alanları eklemekliyiz.
User.updateOne({ index: 5 }, { eyeColor: "red" })
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  });
