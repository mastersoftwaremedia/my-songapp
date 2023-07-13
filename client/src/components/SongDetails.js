import React, {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Col, Image, ListGroup} from 'react-bootstrap'
import {AuthContext} from '../contexts/AuthContext'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'



const SongDetails=({match, history})=>{
	const id=match.params.id
	const [song, setSong]=useState({})
	const [message, setMessage]=useState(null)
	const [success, setSuccess]=useState(false)
	//console.log(id)
	const {user, token}=useContext(AuthContext)
	console.log('songDetails: song userId:', song.release)
	

	useEffect(()=>{
			const getSong=async id=>{
				try{
					const res=await axios.get(`/api/songs/${id}`, {
						headers:{
							Authorization: `Bearer ${token}`
						}
					})
					setSong(res.data)
				}catch(err){
					console.log(err.response)
				}
			}
			getSong(id)
	},[history, token, user, id])


	
	const deleteHandler=async id=>{
		if(user && token){
			try{
				await axios.delete(`/api/songs/${id}`, {
					headers:{
						Authorization: `Bearer ${token}`
					}
				})
				setSuccess(true)
				setMessage('Success! Song has been deleted')
				history.push('/')
			}catch(err){
				console.log(err.response)
				setSuccess(false)
				setMessage('song info has not been deleted!')
			}
		}else{
			history.push('/login')
		}
	}

	return(
		<>
		<Container className='ms-auto'>
			<Link to='/' className='btn btn-light my-3'>Go Back</Link>
			{success ? (<h2 style={{color:'green'}}>{message}</h2>) : (
				<h2 style={{color:'red'}}>{message}</h2>
			)}
			{song && (
			<div >
				<Row className='bottomSpace'>
					<Col md={6}>
						<Image 
							src={song.albumArt? 
								song.albumArt.url : 
								'/images/img_notFound.png'
							} 
							alt={song._id} 
							fluid 
							width={400} height={350} 
						/> 
					</Col>
					<Col md={6}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{song.title}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								by: {song.artist}
							</ListGroup.Item>				
							<ListGroup.Item>
								rating: {song.rating}
							</ListGroup.Item>
							<ListGroup.Item>
								released: {song.release}
							</ListGroup.Item>							

			
							{user && song.userId === user._id? ( 
							<ListGroup.Item className="list-group-item d-flex justify-content-between align-items-center">
								<Link to={`/songs/${song._id}/edit`}>
									<EditIcon style={{width:'35px', height:'35px'}} />
								</Link>
								<div onClick={()=>deleteHandler(song._id)}>
									<DeleteForeverIcon 
									style={{width:'35px', height:'35px'}}
									/>
								</div>
							</ListGroup.Item>
							) : ('')}
							
							
						</ListGroup>
					</Col>

				</Row>
			</div>
			)}
		</Container>
		</>
	)
}
export default SongDetails