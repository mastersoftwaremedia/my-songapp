const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const validator=require('validator')

const userSchema=new mongoose.Schema({
	username:{
		type:String,
		required:[true, 'Useranme is required'],
		minLength:[3, 'Username must not be less than 3 characters'],
		maxLength:[20, 'Username cannot exceed 20 characters'],
		trim:true,
		//unique:true
	},
	email:{
		type:String,
		required:[true, 'Email is required'],
		maxLength:[30, 'Email cannot exceed 30 characters'],
		validate:[validator.isEmail, 'Please enter valid email address'],
		unique:true
	},
	password:{
		type:String,
		required:[true, 'Password is required'],
		minLength:[6, 'Your password must be longer than 6 characters'],
		select:false
	},
	createdAt:{type:Date, default:Date.now}
}, {timestamps:true})


userSchema.pre('save', async function(next){
	if(!this.isModified('password')){
		return next()
	}
	const salt=await bcrypt.genSalt(10)
	this.password=await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword=async function(enteredPassword){
	return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.generateToken=function(){
	return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
		expiresIn:process.env.JWT_EXPIRES_TIME
	})
}

module.exports=mongoose.model('User', userSchema)