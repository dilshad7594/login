import React, { useState } from 'react';
import axios from 'axios'; 

const SignUpForm = () => {
  const [signinData, setSigninData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addSigninData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:6003/signin", { 
        name,
        email,
        password,
      });

      const data = response.data;
      setSigninData([...signinData, data]);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error adding signin", error);
    }
  };
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

  return (
    <div>
      <h1>Signin Page</h1>

      <form onSubmit={addSigninData}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">SignIn</button>
      </form>
    </div>
  );
};

export default SignUpForm;
