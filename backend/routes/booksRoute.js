import express from 'express'
import { Book } from '../models/bookModel.js'

const router = express.Router()

// route to create new book
router.post('', async (req, res) => {
    try {
      if (
        !req.body.title ||
        !req.body.author ||
        !req.body.publishYear
      ) {
        return res.status(400).send({
            message: 'Please provide all required fields: title, author, publishYear'
        });
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear
      };

      const book = await Book.create(newBook);//creates a new instance of the mongoose book Schema utilizing data from the request body

      return res.status(201).send(book)

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})


//route to get all books
router.get('', async (req, res) => {
    try {
      const books = await Book.find({});//finds each book object in the Book Schema
      return res.status(201).json({
        count: books.length,
        data: books//returns each book in a data object
      })
    } catch (error) {
        console.log(error.message)
    }
})


//route to get a single book with id
router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;//id variable created with the id parameter passed in the url path
        const book = await Book.findById(id);//returns the particulat book that matches the id

        return res.status(201).json(book)
    } catch (error) {
        console.log(error.message)
    }
})


//route to update boooks with put request method
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body); //findByIdandupdate is a mongoose function for finding and updating a data stored on mongoose database
        if (!result) {
            return res.status(404).json({message: 'Book not found'})
        }
        return res.status(200).send(`Book ${id} updated successfully!`)



    } catch (error) {
        console.log(error.message)
        return res.status(500).send({message: error.message})
    }
})


//route to delete books 
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);//mongoose function for deleting from datatbase

        if (!result) {
            return res.status(404).json({message: 'Book not found'});
        }
        return res.status(200).json({message: 'Book deleted successfully'})

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({message: error.message})
    }
})

export default router