import React, {useState, useContext} from 'react'
import {Container, Row, Form, Figure, Button} from 'react-bootstrap'
import {AuthContext} from '../contexts/AuthContext'
import FormContainer from './FormContainer'
import axios from 'axios'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'



const AddSong=()=>{
	const [title, setTitle]=useState('')
	const [artist, setArtist]=useState('')
	const [rating, setRating]=useState(1)
	const [release, setRelease]=useState(1900)
	const [albumArt, setAlbumArt]=useState('')
	const [albumArtPreview, setAlbumArtPreview]=useState('/images/img_notFound.png')
	const [error, setError]=useState(null)
	const {user, token}=useContext(AuthContext)
	
	
	const submitHandler=async(e)=>{
		e.preventDefault()
		try{
			const userId=user._id
			const formData=new FormData()
			formData.set('userId', userId)
			formData.set('title', title)
			formData.set('artist', artist)
			formData.set('rating', rating)
			formData.set('release', release)
			formData.set('albumArt', albumArt)
			console.log('HOme userId: ', userId)		
			const res=await axios.post('/api/songs', formData, {
				headers:{
					Accept:'application/json',
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`
				}
			})
			console.log(res.data.success)
			setTitle('')
			setArtist('')
			setRating('')
			setRelease('')
			setAlbumArt('')
			setAlbumArtPreview('/images/img_notFound.png')
		}catch(err){
			console.log(err.response.data)	
			setError('Something went wrong. A Song has not been created')
			setTimeout(()=>{setError('')}, 5000)
			clearTimeout()			
		}
	}
	
	const onFileSelected=e=>{
		if(e.target.name==='albumArt'){
			console.log('onfilesele: ', e.target.files[0])
			const reader=new FileReader()
			reader.onload=()=>{
				if(reader.readyState===2){
					setAlbumArtPreview(reader.result)
					setAlbumArt(reader.result)
				}
			}
			reader.readAsDataURL(e.target.files[0])
		}
	}		

	return(
		<>
		<Container className='ms-auto'>

			{error && (<h4 style={{fontSize:'12px',marginBottom:'30px',color:'red'}}>{error}</h4>)}
			
			<FormContainer>
				<h1 className='mb-3 mt-3'>Create Song</h1>

				<Form onSubmit={submitHandler}
					encType='multipart/form-data' 
					className='mb-3 mt-3'
				>
					<Form.Group controlId='title' className='mb-3 mt-3'>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Title'
							value={title}
							onChange={e=>setTitle(e.target.value)}
						></Form.Control>
					</Form.Group>
					
					<Form.Group controlId='artist' className='mb-3 mt-3'>
						<Form.Label>Artist</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Artist'
							value={artist}
							onChange={e=>setArtist(e.target.value)}
						></Form.Control>
					</Form.Group>					
					
					<Form.Group controlId='rating' className='mb-3 mt-3'>
						<Form.Label>Rating</Form.Label>
						<Form.Control
							type='number'
							placeholder='Enter Rating'
							value={rating}
							onChange={e=>setRating(e.target.value)}
							min='1' max='5'
						></Form.Control>
					</Form.Group>									
							
					<Form.Group controlId='release' className='mb-3 mt-3'>
						<Form.Label>Release</Form.Label>
						<Form.Control
							type='number'
							placeholder='Enter Release Date'
							value={release}
							onChange={e=>setRelease(e.target.value)}
							min='1900' max='2099'
						></Form.Control>
					</Form.Group>								
					<span style={{fontSize:'12px' ,marginTop:'60px'}}>Image must be selected to create a song</span>			
					
					<Form.Group controlId='albumArt' className='mt-2 mb-4'>

						<Form.Label className='imgLabel'>
							<AddPhotoAlternateIcon style={{marginTop:'10px', width:'60px', height:'60px'}} />
							Chooase Image
						</Form.Label>
						{albumArtPreview && (
						<Form.Control 
							type='file'
							name='albumArt'
							accept='.png, .jpeg, .jpg'
							onChange={onFileSelected}
							style={{marginTop:'-30px'}}
						/>)}
					</Form.Group>
						
					{setAlbumArtPreview? (
						<Figure className='mt-2 mb-4'>
							<Figure.Image 
								alt='New Song Preview'
								src={albumArtPreview}
								width={200} height={150}
								fluid
							/>
						</Figure>
					) : (
						<div className='formSpace'>No Preview</div>
					)}				
				
					<Row>
					<Button type='submit' variant='danger'>
						New Song
					</Button>
					</Row>
				</Form>

			</FormContainer>
		</Container>
		</>
	)
}
export default AddSong