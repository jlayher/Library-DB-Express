var express = require('express');
var router = express.Router();

//import the Book model from the ../models folder
const { Book } = require('../models');


// Handler Function for Async Functions
function asyncHandler(callback){
  return async(req, res, next) => {
    try {
      await callback(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      next(error);
    }
  }
}

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const books = await Book.findAll();
  console.log(books);
  res.json(books);
  //res.render('index', { title: 'Express' });
}));



module.exports = router;
