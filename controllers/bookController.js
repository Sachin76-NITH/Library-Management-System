const Book = require('../models/book');

// Display the form to create a new book
exports.bookCreateForm = (req, res) => {
  res.render('bookForm');
};

// Handle creating a new book
exports.bookCreate = async (req, res) => {
  const newBook = req.body;
  try {
    await Book.create(newBook);
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    // Handle the error
  }
};

// Display a list of all books
exports.bookList = async (req, res) => {
  try {
    const books = await Book.find({});
    res.render('bookList', { books });
  } catch (err) {
    console.error(err);
    // Handle the error
  }
};

// Display the form to edit a book
exports.bookEditForm = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);
    res.render('bookEditForm', { book });
  } catch (err) {
    console.error(err);
    // Handle the error
  }
};

// Handle updating a book
exports.bookUpdate = async (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;
  try {
    await Book.findByIdAndUpdate(bookId, updatedBook);
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    // Handle the error
  }
};

// Handle deleting a book
exports.bookDelete = async (req, res) => {
  const bookId = req.params.id;
  try {
    await Book.findByIdAndDelete(bookId);
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    // Handle the error
  }
};
