const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!users.includes(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }

  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
  return res.status(300).json({ message: "Yet to be implemented" });
});

// task10 - axios async-await
public_users.get("/axios-async/books", async function (req, res) {
  try {
    const response = await axios.get("http://localhost:5000/");
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error });
  }
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  res.send(JSON.stringify(books[isbn], null, 4));
  return res.status(300).json({ message: "Yet to be implemented" });
});

// task11 - axios async-await
public_users.get("/axios-async/isbn/:isbn", async (req, res) => {
  const isbn = req.params.isbn;

  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching book by ISBN",
      error: error.message,
    });
  }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const author = req.params.author;
  const bookKeys = Object.keys(books);

  const filteredBooks = bookKeys
    .map((key) => books[key])
    .filter((book) => book.author.toLowerCase() === author.toLowerCase());

  if (filteredBooks.length > 0) {
    return res.send(JSON.stringify(filteredBooks, null, 4));
  }

  return res.status(300).json({ message: "Yet to be implemented" });
});

// task12 - axios async-await
public_users.get("/axios-async/author/:author", async (req, res) => {
  const author = req.params.author;

  try {
    const response = await axios.get(
      `http://localhost:5000/author/${encodeURIComponent(author)}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching books by author",
      error: error.message,
    });
  }
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title;
  const bookKeys = Object.keys(books);

  const filteredBooks = bookKeys
    .map((key) => books[key])
    .filter((book) => book.title.toLowerCase() === title.toLowerCase());

  if (filteredBooks.length > 0) {
    return res.send(JSON.stringify(filteredBooks, null, 4));
  }

  return res.status(300).json({ message: "Yet to be implemented" });
});

// task13 - axios async-await
public_users.get("/axios-async/title/:title", async (req, res) => {
  const title = req.params.title;

  try {
    const response = await axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching books by title",
      error: error.message,
    });
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).json(book.reviews);
  }
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
