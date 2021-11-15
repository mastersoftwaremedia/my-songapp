import React, {useContext} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {AuthContext} from './contexts/AuthContext'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import SongDetails from './components/SongDetails'
import AddSong from './components/AddSong'
import EditSong from './components/EditSong'



const PrivateRoute=({component:Component, ...rest})=>{
	const {token}=useContext(AuthContext)
	return(
		<Route render={props=> token ? 
			<Component {...props} /> :
			<Redirect to='/login' />
		} {...rest}
		/>
	)
}

function App(){
	const {token}=useContext(AuthContext)
	
	return(
		<Router>
			<Header />			
			<div className='py-3'>
				<Switch>
					<Route path='/login'>
					{token? <Redirect to='/' /> : <Login />}
					</Route>
					<Route path='/register'>
					{token? 
						<Redirect to='/login' /> : <Register />
					}
					</Route>

					<PrivateRoute exact path='/songs/add'
					component={AddSong} />				
					<PrivateRoute exact path='/songs/:id/edit' 
					component={EditSong} />
					<Route path='/songs/:id' component={SongDetails} exact />				
					
					<Route path='/page/:pageNumber' component={Home} exact />
					<Route path='/' 
					component={props => <Home {...props} />} exact />
				</Switch>
			</div>
		</Router>
	)
}
export default App