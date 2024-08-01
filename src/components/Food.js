
import { useLocalStorage } from '@uidotdev/usehooks';
import React from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


function Food({id,name,user_ratings:{count_positive},description,thumbnail_url, isBookmarked}) {
  const [favourites, saveFavourites] = useLocalStorage("favourites", []);
  
  const removeFromFavorites = e => {
    saveFavourites([...favourites.filter(f => f.id !=id)])
    alert('Movie was removew from favourite list.')
  }


  return (
    <Card >
      <Card.Img style={{ width: '259px', height: '250px' }} variant="top" src={thumbnail_url}/>
      <Card.Body>
        <Card.Title style={{height:'50px'}}>{name}</Card.Title>
        <div>
        <Card.Text>
          Ratings: {count_positive} ★★★★★
        </Card.Text>
        <Link to={`/viewfood/${id}`} className="btn btn-outline-primary me-2">Details</Link>
        {isBookmarked && <Button onClick={removeFromFavorites} variant='outline-danger'><i class="fa-solid fa-x"></i></Button>}
        </div>
      </Card.Body>
    </Card>
  )
}



export default Food
