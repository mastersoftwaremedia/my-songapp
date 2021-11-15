export default function AuthReducer(state, action){
	switch(action.type){
		case 'LOGIN_SUCCESS':
			return {
				user:action.payload,
				token:action.payload.token
			}
		case 'LOGOUT':
			localStorage.clear()
			return{
				user:null,
				token:null
			}
		default:
			return state
	}
}