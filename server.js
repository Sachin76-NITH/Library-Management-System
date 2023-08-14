const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const serveStatic = require('serve-static');
const app = express();
require('dotenv').config();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(serveStatic('public'));

// Configure body-parser to handle POST data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Controllers
const bookController = require('./controllers/bookController');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/books', bookController.bookList);
app.get('/books/create', bookController.bookCreateForm);
app.post('/books/create', bookController.bookCreate);

app.get('/books/:id/edit', bookController.bookEditForm);
app.post('/books/:id/edit', bookController.bookUpdate);

app.get('/books/:id/delete', bookController.bookDelete);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
