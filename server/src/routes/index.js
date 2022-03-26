const express = require('express')
const router = express.Router()
const { register, login, checkAuth } = require('../controllers/auth')
const { getUsers, deleteUser } = require('../controllers/user')
const { auth } = require('../middleware/auth')
const { getBooks, getBook, updateBook,  addBook, deleteBook } = require('../controllers/book')
const { addTransaction, getTransactions, getTransaction, editTransaction} = require('../controllers/transaction')
const { userProfile, editProfile } = require('../controllers/profile')
const { uploadEpub } = require('../middleware/uploadEpub')
const { uploadImage } = require('../middleware/uploadImage')
const { uploadPhoto } = require('../middleware/uploadPhoto')


// Register and Login
router.post('/register', register)
router.post('/login', login)
router.get("/checkauth", auth, checkAuth);

// Routing for user
router.get('/users', getUsers)
router.delete('/user/:id', auth, deleteUser)

// Routing for transaction
router.post('/transaction', auth, uploadImage('transferProof'), addTransaction)
router.get('/transactions', getTransactions)
router.get('/transaction',auth, getTransaction)
router.patch('/updatetransaction/:id', auth, editTransaction)


// Routing for book
router.get('/books', getBooks)
router.get('/book/:id', getBook)
router.patch('/book/:id',auth, updateBook)
router.delete('/book/:id', auth, deleteBook)
// router.post('/book', auth, addBook)
router.post('/book', auth, uploadEpub('bookFile'), addBook)


// Routing for profile
router.get('/profile', auth, userProfile)
router.patch('/editprofile', auth, uploadPhoto('userPhoto'), editProfile)

module.exports = router