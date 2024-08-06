const { generateToken } = require("../middleware/tokenMiddleware");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const getUserData = async (req, res) => {
  try {
    const getData = await User.find();
    res.status(200).json({ message: "Get Data Success", data: getData });
  } catch (error) {
    res.status(400).json({ message: error.message, data: [] });
  }
};

const addUser = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    phoneno,
    city,
    country,
    state,
    isAdmin,
    dateOfBirth,
    setgender,
  } = req.body;
  const file = req.file;
  let filePath = `http://localhost:7000/uploads/${file?.originalname}`;

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).json({
        message: "User already exists Please login.",
        isSuccess: false,
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hash,
      phoneno,
      city,
      country,
      state,
      isAdmin,
      dateOfBirth,
      setgender,
      file: filePath,
    });

    res.status(200).json({
      message: "User registered successfully",
      data: newUser,
      isSuccess: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to register user",
      error: error.message,
      isSuccess: false,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found", data: [] });
    }
    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
      isSuccess: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete user",
      error: error.message,
      data: [],
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found", data: [] });
    }


    // res.send(user)
    console.log(user)
    bcrypt.compare(req.body.password, user.password).then(async function(result) {
       if (!result) {
      return res.status(400).json({ message: "Password is incorrect", data: [],isSuccess:false });
       }

       if (!req.body.newPassword) {
      return res.status(400).json({ message: "New password is incorrect", data: [],isSuccess:false });
       }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({
        message: "Password reset successfully",
        data: user,
        isSuccess: true,
      });
  });
    
   
    
    // if(req.body.newPassword == req.body.password){
    //     return res.status(400).json({ message: "Password is already exist", data: [],isSuccess:false });
    //   }

    // if (result) {
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    //   user.password = hashedPassword;
    //   await user.save();
    //   res.status(200).json({
    //     message: "Password reset successfully",
    //     data: user,
    //     isSuccess: true,
    //   });
    // }
  } catch (error) {
    res.status(400).json({
      message: "Failed to reset password",
      error: error.message,
      data: [],
      isSuccess: false,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const file = req.file;

    let filePath = file
      ? `http://localhost:7000/uploads/${file?.originalname}`
      : req.body.file;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body, file: filePath },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", data: [] });
    }
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
      isSuccess: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update user",
      error: error.message,
      data: [],
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid user", isSuccess: false });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const { accessToken, refreshToken } = generateToken(user);
      // Return tokens
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }); // Set refreshToken as HttpOnly cookie
      res.status(200).json({
        message: "login success",
        accessToken,
        refreshToken,
        isSuccess: true,
      });
    } else {
      res
        .status(401)
        .json({ message: "Email or  password incorrect", isSuccess: false });
    }
  } catch (error) {
    res.status(400).json({
      message: "Failed to login",
      error: error.message,
      isSuccess: false,
    });
  }
};
const findLoginuser = async (req, res) => {
  try {
    const getUser = await User.findOne({ _id: req.user.id });

    res
      .status(200)
      .json({ message: "userFind success", data: getUser, isSuccess: true });
  } catch (error) {
    res.status(400).json({
      message: "Failed to find user",
      error: error.message,
      isSuccess: false,
    });
  }
};

module.exports = {
  getUserData,
  addUser,
  deleteUser,
  updateUser,
  loginUser,
  resetPassword,
  findLoginuser,
};
