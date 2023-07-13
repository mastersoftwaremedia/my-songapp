export default function SongReducer(state, action){
	switch(action.type){
		case 'FETCH_SONGS':
			return{
				songs:action.payload.songs,
				pages:action.payload.pages,
				page:action.payload.page
			}
		default:
			return state
	}
}