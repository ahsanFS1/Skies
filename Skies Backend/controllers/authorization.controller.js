import User from '../models/user.model.js';



export const handleSignup = async (req, res) => {
  const { userName,email, password } = req.body;
  console.log("Email: ", email, "\nPassword: ", password);
  try {
    const user = new User({ userName,email, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful",userName: user.userName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const handleSubscription = async(req,res)=>{

const {selectedPlan,email} = req.body;
console.log(selectedPlan,email)
try{

const user = await User.findOneAndUpdate({email},{subscriptionPlan:selectedPlan},{new:true})
if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

console.log("Subscribed", user)
res.status(201).json({ message: "Plan Subscribed successfully" });
  

}catch(err)
{
  res.status(500).json({error:err.message});
}
}

export const checkSubscription = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    const user = await User.findOne({ email });
    if (!user || !user.subscriptionPlan) {
      return res.json({ subscribed: false });
    }
    return res.json({ subscribed: true, selectedPlan: user.subscriptionPlan});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};