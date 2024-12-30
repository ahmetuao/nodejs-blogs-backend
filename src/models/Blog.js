const mongoose = require('mongoose');

// Blog şeması
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // User modeline referans
      required: true,
    },
    image: {
        type: String, // Resim yolu
      },
  },
  { timestamps: true } // createdAt ve updatedAt alanlarını otomatik oluşturur
);

module.exports = mongoose.model('Blog', blogSchema);
