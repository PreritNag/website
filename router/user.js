const User=require('../models/users');
const {Router}=require("express");
const router=Router();
router.get('/signin',(req,res)=>{
    return res.render('signin')
});
router.get('/signup',(req,res)=>{
    return res.render('signup')
});
router.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    try{
   const user=await User.matchPasswordandGenerateToken(email,password);
   console.log('User',user);
   return res.cookie('token',user).redirect('/')}
   catch(error){
    return res.render('signin',{error:"Incorrect Password or Email"})
   }
});
router.get('/logout',(req,res)=>{
    return res.clearCookie('token').redirect('/')});
    
// router.post('/signup',(req,res)=>{
//     const {name,email,password}=req.body;
//     User.create({name,email,password});
//     return res.redirect('/');})
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await User.create({ name, email, password });
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(400).json({ error: "Error creating user, please try again." });
    }
});

module.exports=router;