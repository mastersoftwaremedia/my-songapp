import React, {useContext} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {AuthContext} from '../contexts/AuthContext'


const Header=({history})=>{
	const {logout, user, token}=useContext(AuthContext)
	const logoutHandler=()=>{
		logout()
	}
	
	return(
	<header>
		<Navbar collapseOnSelect expand="lg" className="bg-danger" variant="dark">
			<Container>
	
				<LinkContainer to='/'>		
					<Navbar.Brand>My Lovely Songs</Navbar.Brand>	
				</LinkContainer>
				
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
				
					<Nav className="ms-auto">
				
						{token? (
						<>
						<Nav.Link title={user.username} id='username' className='ml-1' style={{marginLeft:'3px', color:'white'}}>
							Hello, {user.username}!
						</Nav.Link>
						<LinkContainer to='/songs/add'>		
							<Nav.Link className='ml-4'>
								Create Song
							</Nav.Link>
						</LinkContainer>
						<Nav.Link className='ml-4'
							onClick={logoutHandler}
						>
							Logout
						</Nav.Link>
						</>
						) : (
						<>
							<LinkContainer to='/register'>
								<Nav.Link className='ml-4'>Register</Nav.Link>
							</LinkContainer>
				
							<LinkContainer to='/login'>
								<Nav.Link className='ml-4 mr-4'>Login</Nav.Link>
							</LinkContainer>
						</>
						)}
					</Nav>
				</Navbar.Collapse>

			</Container>

		</Navbar>
	</header>
	)
}
export default Header