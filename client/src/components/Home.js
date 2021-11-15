import React, {createContext, useContext, useState, useEffect, useReducer} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Container, Button, Modal} from 'react-bootstrap'
import {AuthContext} from '../contexts/AuthContext'
import axios from 'axios'
import SongCard from './SongCard'
import AddSong from './AddSong'
import Paginate from './Paginate'
import SongReducer from '../contexts/SongReducer'
import AddIcon from '@mui/icons-material/Add'


export const SongContext=createContext()

const initialState={
	songs:[],
	pages:1,
	page:1
}
 
const Home=({match})=>{
	const {user, token}=useContext(AuthContext)
	const [state, dispatch]=useReducer(SongReducer, initialState)
	const [isShow, setIsShow]=useState(false)
	const pageNumber=match.params.pageNumber || 1


	const toggleAddSong=()=>{
		setIsShow(!isShow)
	}

	useEffect(()=>{
		const getSongs=async(pageNumber='')=>{
			try{
				const res=await axios.get(`/api/songs?pageNumber=${pageNumber}`)
				dispatch({type:'FETCH_SONGS', payload:res.data})
			}catch(err){
				console.log(err.response)	
			}
		}	
		getSongs(pageNumber)
	}, [pageNumber])
		


	return(
	<>
		<Container className='ms-auto'>
			<SongContext.Provider value={{state, dispatch}}>			
			{user && token && (
			<>
				<div className="d-flex justify-content-between align-items-center">

					<Button variant="danger" 
						onClick={toggleAddSong}
						className='mt-4 mb-4'
					>
						<AddIcon style={{width:'35px', height:'35px'}} />
							Create a Song
					</Button>
				
					<Link to='/' className='btn btn-light'>Go Back</Link>
				</div>
				
				<Modal show={isShow} onHide={toggleAddSong}>
					<Modal.Header >
						<Modal.Title>Add Song</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<AddSong onClose={toggleAddSong}
						show={isShow} />
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={toggleAddSong}>
							Close Modal
						</Button>
					</Modal.Footer>
				</Modal>		
			</>
			)}
			</SongContext.Provider>
			

			<h1>My Hooked Songs</h1>
			{state.songs.length > 0? (
			<>
				<Row>
					{state.songs.map(song=>(
						<Col sm={12} md={6} lg={4} xl={3} key={song._id} className='align-items-stretch d-flex'>
							<SongCard song={song} />
						</Col>
					))}
				</Row>
				<div className="d-flex justify-content-center align-items-center mt-5 mb-2">
					<Paginate pages={state.pages} page={state.page} />
				</div>
			</>
			) : (
				<div>No songs! Please add songs!</div>
			)}
		</Container>
	</>
	)
}
export default Home