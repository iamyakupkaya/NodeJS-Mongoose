const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// connection of database
mongoose
  .connect("mongodb://localhost/test")
  .then((_) => {
    console.log("Veri tabanına bağlandı..");
  })
  .catch((err) => console.log("WARN! ", err));

// Önce veri tabanına bağlanma kodu yaz
// Daha sonra Schemanı oluştur
// Daha Sonra Schemadan Modelini oluştur
// Daha sonra modelden Nesne Yarat İnstance of Document :)

let blogSchema = new Schema(
  {
    title: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: { votes: Number, favs: Number },
  },
  // minimize false yaparsak boş objelerde veri tabanında görünmeye başlar ama
  // sadece objeler author vs String olduğundan oları karıştırmamak lazım
  // mesela meta bir objedir boş olduğu halde minimize yaptığımız için db de görürürüz
  // ama arraylar boşta olsa default olarak database de görünürler ama diğer boş alanlar görünmez
  { minimize: false }
  // { collection: "mycollection" } collection adını burada da tanımlayabiliriz ya da
  // model içerisinde de tanımlayabiliriz.
); // artık collection ismi modelde geçen isim olmayacak

// istersek schemaya fonksiyonda tanımlayabiliriz burada dikkat etmemiz gereken iki nota vardır
//1- schema.methods ile tanımlayacağımız fonksiyonu tanımlamak
// 2 ve en önemlisi arrow function kullanmamak çünkü bind yapılması gerekir.
blogSchema.methods.baslikGoster = function () {
  return "Fonksiyon Çalışıyor: " + this.title;
};

// ayrıca eğer istersek static methodlar da tanımlayabiliriz.
blogSchema.statics.basligaGoreVeri = function (baslik) {
  return this.find({ title: baslik });
};

const Blog = mongoose.model("blog", blogSchema, "newcollection");
const myBlog = new Blog({ title: "İlk blog" });

// VİRTUAL OLUŞTURMA
blogSchema.virtual("cagirVirtual").get(function () {
  return "Bu bloğun " + this.title + " ve Yazarı: " + this.author;
});

const myBlog2 = new Blog({ title: "ikinci title", author: "Yakup KAYA" });
console.log(myBlog2.cagirVirtual);
console.log(myBlog2.toJSON({ virtuals: true })); // buda myBlog2 yi JSON formatında getir demek ayrıca..
// ... virtual option true verdiğim için bana virtual olanları da gösterecek
//virtualler veritabanına eklenmez sadece sanal olarak bize görünürler.
// aşağıdaki çağırım statik method çağırımıdır ki zaten modelden oluşan sınıf ile çağırıldı
Blog.basligaGoreVeri("İlk blog")
  .then((result) => console.log("Gelen Static Değer:", result))
  .catch((err) => console.log(err));
console.log(myBlog.baslikGoster());
//myBlog2.save();

//ayrıca Sınıf üzerinden Blog.create metodu ile data kayıt edebilirz.
//bir promise döndürür ve bu şekilde ekrana dönen objeyi tmamiyle döndürebilirz bu da aynı zamanda
// ... şemayı kullanılıyor sadece bilgi girme şekli farklı yoksa belirlediğimiz alanların aynısı vardır
Blog.create({ title: "üçüncü title" }).then((result) => console.log(result));
myBlog
  .save()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
