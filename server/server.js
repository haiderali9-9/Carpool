const express = require("express");
const cors = require("cors");
const twilio = require("twilio");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:1234",
  })
);

let e; 
let p;
let ph;


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);



async function createOTP(phoneNumber, code, expiresAt) {
  try {
    const otp = await prisma.OTP.create({
      data: {
        phoneNumber,
        code,
        expiresAt,
      },
    });

    console.log("OTP created:", otp);
    return otp;
  } catch (error) {
    console.error("Error creating OTP:", error);
    throw error; 
  }
}


app.post("/signup", async (req, res) => {
    try {
    const { email, password, phone } = req.body;
   
      e = email;
      p = password;
      ph = phone;
    

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        phone,
      },
    });

    console.log("New user created:", newUser);

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const code = "1234";

    createOTP(phone, code, expiresAt)
      .then((otp) => {
        console.log("OTP created successfully:", otp);
      })
      .catch((error) => {
        console.error("Failed to create OTP:", error);
      });

client.messages
      .create({
        body: "This is a test message from Twilio!",
        from: "+1 251 577 7084", 
        to: ph
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.error(err));

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

async function findUserByEmailAndPassword(email, password) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}

app.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    const user = await findUserByEmailAndPassword(username, password);

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/otpverify", async (req, res) => {

  const {  otpCode } = req.body;
  
  try {
   
    const otpRecord = await prisma.OTP.findFirst({
      where: {
        phoneNumber:ph,
        code: otpCode,
      },
    });

    if (otpRecord) {
      
      console.log("OTP code matched");
      res.status(200).send("OTP verified successfully");
    } else {
    
      console.log("OTP code did not match");
      res.status(400).send("Invalid OTP code");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).send("Error verifying OTP");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
