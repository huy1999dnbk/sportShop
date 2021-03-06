const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const generateToken = require('../utils/generateToken')
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phoneNumber:user.phoneNumber,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber:user.phoneNumber,
      isAdmin: user.isAdmin,
    })

  } else {
    res.status(404)
    throw new Error('User not found')
  }

})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name, email, password,phoneNumber
  })

  if (user) {
    res.status(201)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phoneNumber:user.phoneNumber,
      token: generateToken(user._id),
    })
  }else {
    res.status(404)
    throw new Error('User not found')
  }
})


const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber
    if(req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save() 
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }

})

const getUser = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const count = await User.countDocuments({})
  const users = await User.find({}).limit(pageSize).skip(pageSize * (page - 1))
  res.json({users,page,pages:Math.ceil(count/pageSize)})

})


const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if(user) {
    await user.remove()
    res.json({message:'User removed'})
  } else {
    res.status(404)
    throw new Error('User not found')
  }

})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if(user) {
    res.json(user)
  }else {
    res.status(404)
    throw new Error('User not found')
  }
  
})

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber
    user.isAdmin = req.body.isAdmin
    const updatedUser = await user.save() 
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber:updatedUser.phoneNumber,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }

})

module.exports = {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUser,
  deleteUser,
  getUserById,
  updateUser
}

