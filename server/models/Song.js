const mongoose=require('mongoose')
const validator=require('validator')

const songSchema=new mongoose.Schema({
	userId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	title:{type:String, max:500},
	albumArt:{
		public_id:{type:String, required:true},
		url:{type:String, required:true}
	},
	artist:{type:String},
	rating:{type:Number},
	release:{type:Number},
	createdAt:{type:Date, default:Date.now}
}, {timestamps:true})
module.exports=mongoose.model('Song', songSchema)