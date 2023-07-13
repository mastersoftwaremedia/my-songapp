import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from './FormContainer'
import axios from 'axios'
import {AuthContext} from '../contexts/AuthContext'


const Login=()=>{
	const [email, setEmail]=useState('')
	const [password, setPassword]=useState('')
	const [error, setError]=useState(null)
	const {dispatch}=useContext(AuthContext)
	

	const submitHandler=async e=>{
		e.preventDefault()
		try{
			const credentials={email, password}
			const res=await axios.post('/api/users/login', credentials, {
				headers:{'Content-Type': 'application/json'}
			})
			dispatch({type:'LOGIN_SUCCESS', payload:res.data})
		}catch(err){
			console.log(err.response)
			setError('LOGIN FAILED')
			setPassword('')
			setTimeout(()=>{setError('')}, 5000)
			clearTimeout()
		}
	}
	
	return (
		<FormContainer>
			<h1 className='mt-5 text-center'>Login</h1>
			{error && (
				<span style={{fontSize:'12px',marginBottom:'30px',color:'red'}}>{error}</span>
			)}
			<Form onSubmit={submitHandler} className='mt-5'>
						
				<Form.Group controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control type='email' 
						placeholder='Enter Email'
						value={email} 
						onChange={e=>setEmail(e.target.value)} required>
					</Form.Control>
				</Form.Group>		

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' 
						placeholder='Enter Password'
						value={password} 
						onChange={e=>setPassword(e.target.value)}
						required minLength='6'>
					</Form.Control>
				</Form.Group>			
				
				<div className='d-grid gap-2'>
					<Button type='submit' variant='danger' className='mt-4'>
						Login
					</Button>
				</div>
			</Form>
			
			<Row className='py-3'>
				<Col>
					New Customer?{' '}
					<Link to='/register' style={{textDecoration:'none'}}>
						Register
					</Link>
				</Col>
			</Row>

		</FormContainer>
	)
}
export default Login