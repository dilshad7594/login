
const express = require('express');
const mongoose =require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

const app =express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const dbURI = "mongodb://127.0.0.1:27017/authentication";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
});
const regSchema = new mongoose.Schema({
  name: String,
  address: String,
  department:String,
  email: String,
  age:String,
  qualification:String,
  bloodgroup:String,
  phone: Number,
});
const Data = mongoose.model("Data", regSchema);

// JWT secret (should be kept secret and not hard-coded)
const secretKey = 'mysecretkey';

// Middleware to protect routes

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
}

// Register a new user
app.post('/signin', async (req, res) => {
  try {
    const { username, password,email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username,email, password: hashedPassword });
    await user.save();
    res.status(201).send('User signin successfully');
  } catch (error) {
    res.status(500).send('Error signin user');
  }
});

// Login and generate a JWT token
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send('Invalid Email or password');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Invalid Email or password');

  const token = jwt.sign({ email: user.email }, secretKey);
  res.header('Authorization', token).send('Login successful');
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});


//register data

app.post("/api/registers", async (req, res) => {
  try {
    const { name, address, email, phone,department,age,qualification,bloodgroup } = req.body;
    const data = new Data({ name, address, email, phone,department,age,qualification,bloodgroup});
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/api/registers", async (req, res) => {
  try {
    const datas = await Data.find();
    res.json(datas);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
app.put("/api/registers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {name, address, email, phone,department,age,qualification,bloodgroup } = req.body;
    const datas = await Data.findByIdAndUpdate(
      id,
      { name, address, email, phone,department,age,qualification,bloodgroup},
      { new: true }
    );

res.json(datas);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/registers/:id", async (req,res)=>{
  try{
    const {id} = req.params;
    await Data.findByIdAndRemove(id);
    res.json({message:"Data deleted.."})
  }catch (error) {
    res.status(500).json({error:"internal server error"});
  }
});

const port = 6003;
 app.listen(port, () => console.log(`connected on ${port}`));
