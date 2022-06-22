const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://localhost/test")
  .then((_) => {
    console.log("Veri tabanına bağlandı.!");
  })
  .catch((err) => console.log(err));

const schema = new Schema({ name: String });
/*console.log(schema.path("name") instanceof mongoose.SchemaType);
  console.log(schema.path("name") instanceof mongoose.Schema.Types);
  console.log(schema.path("name").instance );*/
/* 
const numberSchema = new Schema({
  // burada integer only nin nasıl olacağını şema oalrak belirteceğiz.
  integerOnly: {
    type: Number,
    get: (v) => {
      // Math.round 2.5 ve üstü ise 3 yapar 2.49 ve altı ise 2 yapar.
      return Math.round(v); // burada değer döndürülür
    },
    set: (v) => {
      return Math.round(v);
    }, // burada değer ayarlanır
    alias: "ii", // bu da integerOnly i çağırmanın kısa yolu.
  },
});

// şimdi şemamızı yaptıysak o zaman model oluşturalım..
const Numara = mongoose.model("Numara", numberSchema);
const doc = new Numara(); // burada da Modelden obje oluşturuyoruz
doc.integerOnly = 2.5;
console.log(doc.integerOnly);
//doc.save();


 */

// -----------------------------------
/* 
//Metinlerde Schema
const textSchema = new Schema({
  text: {
    type: Schema.Types.String, // istersen String diye de belirtebiliriz.
    required: true,
    trim: true, // sağındaki solundaki boşluklar silinsin
    lowercase: true,
    minlength: 2,
    maxlength: 50,
    enum: ["yakup", "kaya", "deneme"], // bunun anlamı gireceğimiz metin sadece bu dizideki
    //.. metin alanlarını içerebilir eğer gireceğimiz etin dizideki elemanlardan biri değilse veri tabanına kaydedilmez

    // aşağıda da kendi validationızımı yapıyoruz
    validate: {
      validator: function (v) {
        // buradaki v gireceğimiz metin değerdir
        //eğer gireceğimiz metin 2 harften büyük ise hata çıkmaz çıkarsada message bölümü çalışır

        return v.length > 2;
      },
      message: "burada takıldı",
    },
  },
});

const Text = new mongoose.model("Text", textSchema);
const tx = Text({ text: "      yakup    " });
//tx.save();
 */

// ---------------------------------------
/* 
const oyuncakSchema = new Schema({
  adi: String,
}); // bunun anlamı yazdığımız obje dökümanları { adi:"String"} şeklinde olmalı. Tabii bunlar Object Document olmalı

console.log("Oyuncak Sema:");
console.log(oyuncakSchema);

const oyuncakKutusuSchema = new Schema({
  // oyuncaklar diye bir alan var ve tipi dizi dizi
  // eğer değer tanımlanmazsa default değeri undefined olsun
  // eğer undefined diye belrtmezsek boş dizi olur.
  oyuncaklar: {
    type: [oyuncakSchema],
    default: undefined,
  },
  oyuncakRenkleri: [String],
});

// hangi şemayı model olarak alacağız??
const OyuncakKutusu = mongoose.model("OyuncakKutusu", oyuncakKutusuSchema);

const oyuncakKutum = new OyuncakKutusu();
oyuncakKutum.oyuncaklar = [{ adi: "Oldu mu" }, { adi: "Bence oldu şimdi" }];
oyuncakKutum.oyuncakRenkleri = ["Kırmızı", "Yeşil", "Bordo"];
console.log(oyuncakKutum);
console.log("Oyuncularrrr");
console.log(oyuncakKutum.oyuncaklar);
//oyuncakKutum.save();
 */

// -----------------------------------

const root = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__"; //480.jpg

const picSchema = new Schema({
  name: String,
  picture: {
    type: String,
    get: (v) => v,
    set: (v) => `${root}${v}`,
  },
});

const Picture = mongoose.model("picture", picSchema);

const pic = new Picture({ name: "Güneş batımı ve Ağaç", picture: "480.jpg" });

console.log(pic.picture);
console.log(pic.toObject({ getters: true })); // bu satır tüm objemizi döndürür.
pic.save();
