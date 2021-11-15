import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'



const SongCard=({song})=>{

	return(
	<Card className='my-3 p-3 rounded'>
		<Link to={`/songs/${song._id}`}>
			<Card.Img 
			src={song.albumArt? 
				song.albumArt.url : '/images/img_notFound.png'
			} variant='top' width={175} height={200} />
		</Link>
		<Card.Body>
		
			<Link to={`/songs/${song._id}`}>
				<Card.Title as='div'>
					<strong>{song.title}</strong>
				</Card.Title>
			</Link>
			<Card.Text as='div' style={{fontSize:'15px'}}>
				<p>By: {song.artist}</p>
			</Card.Text>
			<Card.Text as='div' style={{fontSize:'15px'}}>
				<p>released: {song.release}</p>
			</Card.Text>
		
		</Card.Body>
	</Card>
	)
}
export default SongCard