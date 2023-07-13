import React, {useState} from 'react'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from './FormContainer'


const Register=()=>{
	const [username, setUsername]=useState('')
	const [email, setEmail]=useState('')
	const [password, setPassword]=useState('')
	const [confirmPassword, setConfirmPassword]=useState('')
	const [error, setError]=useState(null)
	const history=useHistory()

	
	const submitHandler=async e=>{
		e.preventDefault()
		if(password !== confirmPassword){
			setError('Passwords do not match')
			setPassword('')
			setConfirmPassword('')
			setTimeout(()=>{setError('')}, 5000)
			clearTimeout()
		}else{
			try{
				const credentials={
					username, email, password
				}			
				const res=await axios.post('/api/users/register', credentials, {
					headers:{
						'Content-Type':'application/json'
					}
				})
				console.log('success', res.data.success)
				setUsername('')
				setEmail('')
				setPassword('')
				setConfirmPassword('')
				history.push('/login')
			}catch(err){
				console.log(err.response)
				setError('Something went wrong. You are NOT registered')
				setTimeout(()=>{setError('')}, 5000)
				clearTimeout()
			}
		}
	}
	
	return (
		<FormContainer>
			<h1 className='mt-5 text-center'>Register</h1>
			{error && (
				<span style={{fontSize:'12px',marginBottom:'30px',color:'red'}}>{error}</span>
			)}
			<Form onSubmit={submitHandler} className='mt-5'>
			 
				<Form.Group controlId='username'>
					<Form.Label>Username</Form.Label>
					<Form.Control type='text' 
						placeholder='Enter Username'
						value={username} 
						onChange={e=>setUsername(e.target.value)}
						required>
					</Form.Control>
					<span style={{fontSize:'10px'}}>Username should be unique</span>
				</Form.Group>
				
				<Form.Group controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control type='email' placeholder='Enter Email'
					value={email} onChange={e=>setEmail(e.target.value)}
					required>
					</Form.Control>
				</Form.Group>		

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' placeholder='Enter Password'
					value={password} onChange={e=>setPassword(e.target.value)}
					required minLength='6'>
					</Form.Control>
					<span style={{fontSize:'10px'}}>Password must be more then 6 characters</span>
				</Form.Group>				
				
				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type='password' placeholder='Confirm Password'
					value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required minLength='6'>
					</Form.Control>
				</Form.Group>
				
				<div className="d-grid gap-2">
					<Button type='submit' variant='danger' className='mt-4'>
						Register
					</Button>
				</div>
			</Form>
			
			<Row className='py-3'>
				<Col>
					Already Joined?{' '}
					<Link to='/login' style={{textDecoration:'none'}}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}
export default Register