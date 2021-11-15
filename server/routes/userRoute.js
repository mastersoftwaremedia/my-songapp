const asyncHandler=require('express-async-handler')
const router=require('express').Router()
const User=require('../models/User')
const ObjectId=require('mongoose').Types.ObjectId


//Register
router.post('/register', asyncHandler(async(req,res)=>{
	const {username, email, password}=req.body
	if(!username || !email || !password){
		res.status(400).json({message:'Please fill in fields'})
	}
	const userExists=await User.findOne({email})
	if(userExists){
		res.status(400).json({message:'Invalid credential info'})
	}
	
	const user=await User.create({
		username, email, password
	})
	if(user){
		res.status(200).json({
			...user._doc, token:user.generateToken(user._id)
		})
	}else{
		res.status(500).json({message:'Invalid email or password register'})
	}
}))


//Login
router.post('/login', asyncHandler(async(req,res)=>{
	const {email, password}=req.body

	//check if email and password is entered by user
	if(!email || !password){
		res.status(400).json({message:'Please enter email or password'})
	}
	try{
		const user=await User.findOne({email}).select('+password')
		if(user && (await user.comparePassword(password))){	
			res.status(200).json({
				...user._doc, token:user.generateToken(user._id)
			})
		}else{
			res.status(401).json({message:'Invalid email or password login'})
		}
	}catch(err){
		res.status(500).json(err)
	}
}))

//userProfile
router.get('/', asyncHandler(async(req,res)=>{
	const user=await User.findById(req.user._id).select('+password')
	if(user){
		res.status(200).json({...user._doc})
	}else{
		res.status(404).json({message:'Current user not found'})
	}
}))

module.exports=router