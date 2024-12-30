const Blog = require("../models/Blog");

// Yeni blog oluşturma
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Blog oluştur
    const blog = new Blog({
      title,
      content,
      author: req.user.id, // JWT'den gelen kullanıcı bilgisi
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tüm blogları listeleme
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tek bir blog alma
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Blog güncelleme
exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    // Sadece yazar güncelleyebilir
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Blog silme
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    // Sadece yazar silebilir
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Blog'u sil
    await Blog.deleteOne({ _id: blog._id });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
