const asyncHandler=require('express-async-handler')
const router=require('express').Router()
const Song=require('../models/Song')
const cloudinary=require('cloudinary')
const ObjectId=require('mongoose').Types.ObjectId


router.post('/', asyncHandler(async(req,res)=>{
	console.log(req.body)
	const result=await cloudinary.v2.uploader.upload(req.body.albumArt, {
		folder:'songs',
		width:500,
		crop:'scale'
	})
	const {title, artist, rating, release, userId}=req.body
	if(!title || !artist || !rating || !release){
		res.status(400).json({message:'Please fill in fields'})
	}
	const song=await Song.create({
		title, artist, rating, release, userId,
		albumArt:{
			public_id:result.public_id,
			url:result.secure_url
		}
	})
	if(song){
		res.status(200).json({success:true})
	}else{
		res.status(500).json({message:'Song has not been created'})
	}
}))

router.put('/:id', asyncHandler(async(req,res)=>{
	if(ObjectId.isValid(req.params.id)){
		const song=await Song.findById(req.params.id)
		if(song){
			song.title=req.body.title || song.title
			song.artist=req.body.artist || song.artist
			
			if(req.body.albumArt !== ''){
				const image_id=song.albumArt.public_id
				await cloudinary.v2.uploader.destroy(image_id)
				const result=await cloudinary.v2.uploader.upload(req.body.albumArt, {
					folder:'songs',
					width:500,
					crop:'scale'
				})
				song.albumArt={
					public_id:result.public_id,
					url:result.secure_url
				}
			}
			
			const updatedSong=await Song.findByIdAndUpdate(req.params.id, song, {
				new:true,
				runValidators:true,
				useFindAndModify:false
			})
			res.status(200).json({success:true, message:'The song info has been updated'})
		}else{
			res.status(404).json({message:'Song not found'})
		}
	}else{
		res.status(500).json({message:'Song not found with this ID'})
	}
}))

router.delete('/:id', asyncHandler(async(req,res)=>{
	try{
		const song=await Song.findById(req.params.id)
		await song.deleteOne()
		res.status(200).json({message:'The song info has been deleted'})
	}catch(err){
		res.status(500).json({message:'You can delete only your song info'})
	}
}))

router.get('/:id', asyncHandler(async(req,res)=>{
	try{
		const song=await Song.findById(req.params.id)
		res.status(200).json(song)
	}catch(err){
		res.status(500).json({message:'Song not found '})
	}
}))

router.get("/", asyncHandler(async (req, res) => {
	const pageSize=8
	const page=Number(req.query.pageNumber) || 1
	const count=await Song.countDocuments()
	const songs=await Song.find()
	.limit(pageSize)
	.skip(pageSize * (page - 1))
	if(songs){
		res.status(200).json({
			songs, page,
			pages:Math.ceil(count/pageSize)
		})
	}else{
		res.status(500).json({message:'Songs not found'})
	}	
}))

module.exports=router