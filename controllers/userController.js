const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = asyncHandler(async (req,res) => {
  const{name,email,password} = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser){
    res.status(400);
    throw new Error("User aldready exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,email,password: hashedPassword,
  });

  res.status(201).json({
    message: "User registerd successfully",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email
    },
  });
});

const loginUser = asyncHandler(async(req,res) => {
  const {email,password} = req.body;

  const user = await User.findOne({ email });
  if(!user){
    res.status(404);
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials")
  }

  const token = jwt.sign(
    {id: user._id, email: user.email},
    process.env.JWT_SECRET_KEY,
    { expiresIn: "10min"}
  );

  res.json({
    message: "Login successful",
    token:token,
    user: {
      id : user._id,
      name: user.name,
      email: user.email,
    },
  });
});

const getUserProfile = asyncHandler(async(req,res) => {
  const user = await User.findById(req.user.id).select("-password");
  if(!user){
    res.status(404);
    throw new Error("USer not found");
  }

  res.json(user);
});

module.exports = {registerUser, loginUser, getUserProfile};