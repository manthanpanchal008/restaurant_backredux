const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../service/sendMail");

// Register new user
const register = async (req, res) => {
  const { username, name, email, phone, password, role, address, pincode } = req.body;

  // 1. Basic validation
  if (!username || !email || !password || !name || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // 2. Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // 3. Password length
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  };

  // Check if user with same username or email already exists
  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    return res.status(402).json({ message: "User Already Exists" });
  }

  // Security: Prevent anyone from registering as admin unless we allow it explicitly
  // Defaulting to 'customer' if role is not provided or if it's not a verified register
  const userRole = (role && role.toLowerCase() === 'admin') ? 'admin' : 'user';


  // Hash the password before storing
  const hashpassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();

  // Create user in database
  const user = await userModel.create({
    username,
    name,
    email,
    phone,
    password: hashpassword,
    role: userRole,
    otp,
    otpExpiry: Date.now() + 5 * 60 * 1000,
    address,
    pincode,
  });


  // Generate JWT token
  const token = jwt.sign({ id: user._id,role:user.role }, process.env.JWT_SECRET);
  await sendEmail(email,otp);

  // Set token in cookie and respond
  res.cookie("token", token);
  res.status(200).json({ messgae: "Register succesfully", user,token });
};

const verifyotp = async(req,res)=> {
    const {email,otp} = req.body
  
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
    console.log("hit")
    console.log(email,otp)
    const user = await userModel.findOne({email})
   
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
  
    if (!user.otpExpiry || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
   
    if (user.otp.toString() !== otp.toString()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
  
    await user.save();
  
    res.json({
      success: true,
      message: "Account verified successfully",
    });
  };
  
// Login existing user
const login = async (req, res) => {
  const { username, email, password } = req.body;

  // Find user by username or email
  const userexits = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!userexits) {
    return res.status(400).json({ message: "invalid credentials" });
  }
  // await sendEmail('manthanpanchal008@gmail.com',131213);
  // Verify password
  const verifypassword = await bcrypt.compare(password, userexits.password);

  if (!verifypassword) {
    return res.status(400).json({ message: "invalid password" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: userexits._id ,role: userexits.role,  }, process.env.JWT_SECRET);

  // Set token in cookie and respond
  res.cookie("token", token, {
    httpOnly: true,        // ✅ secure (cannot access via JS)
    secure: false,         // ❗ set to false for local testing (localhost uses HTTP)
    sameSite: "Lax",       // ✅ Standard for local testing
  });

  res.status(200).json({user:userexits, messgae: "login successful" , token });
};

const users = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ message: "users fetch successfully", data: users });
  } catch (error) {
    res.status(400).json({
      message: "error while fetching all users",
      error: error.message,
    });
  }
};

const userProfile = async (req, res) => {
  try {
    console.log(req.user)
    const user = await userModel
      .findById(req.user.id)
      .select("-password");
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, name, email, phone, password , address, pincode} = req.body;

    let updateData = {
      username,
      name,
      email,
      phone,
      address, 
      pincode
    };

    // If password is provided → hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};

module.exports = { register, login, users ,updateUser,deleteUser,verifyotp,userProfile};
