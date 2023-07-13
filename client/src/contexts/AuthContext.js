import React, {createContext, useReducer, useEffect} from 'react'
import AuthReducer from './AuthReducer'

const initialState={
	user:JSON.parse(localStorage.getItem('userStored')) || null,
	token:JSON.parse(localStorage.getItem('tokenStored')) || null
}

export const AuthContext=createContext(initialState)

export const AuthContextProvider=({children})=>{
	const [state, dispatch]=useReducer(AuthReducer, initialState)
	
	useEffect(()=>{
		localStorage.setItem('userStored', JSON.stringify(state.user))
		localStorage.setItem('tokenStored', JSON.stringify(state.token))
	}, [state.user, state.token])
	
	const logout=()=>{
		dispatch({type:'LOGOUT'})
		document.location.href='/login'
	}
	
	return(
		<AuthContext.Provider value={{
			user:state.user,
			token:state.token,
			dispatch,
			logout
		}}>
			{children}
		</AuthContext.Provider>
	)
}