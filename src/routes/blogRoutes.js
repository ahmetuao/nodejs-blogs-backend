const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

// Blog CRUD işlemleri
router.post("/", authenticate, createBlog); // Blog oluşturma
router.get("/", getBlogs); // Tüm blogları listeleme
router.get("/:id", getBlogById); // Tek bir blog alma
router.put("/:id", authenticate, updateBlog); // Blog güncelleme
router.delete("/:id", authenticate, deleteBlog); // Blog silme
const Blog = require("../models/Blog"); // Blog modelini ekleyin

module.exports = router;

const upload = require("../middleware/uploadMiddleware");

// Blog resmini yüklemek için bir rota
router.post(
  "/:id/upload",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("Uploaded File:", req.file); // Yüklenen dosyayı kontrol et

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const blog = await Blog.findById(req.params.id);

      if (!blog) return res.status(404).json({ error: "Blog not found" });

      // Sadece yazar dosya yükleyebilir
      if (blog.author.toString() !== req.user.id) {
        return res.status(403).json({ error: "Access denied" });
      }

      // Blog'a resim ekle
      blog.image = `/uploads/${req.file.filename}`;
      await blog.save();

      res.status(200).json({ message: "Image uploaded successfully", blog });
    } catch (err) {
      console.error("Error:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
);
