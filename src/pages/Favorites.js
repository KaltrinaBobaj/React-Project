import { useLocalStorage } from '@uidotdev/usehooks';
import React from 'react'
import { Container } from 'react-bootstrap';
import Food from '../components/Food';

function Favorites() {
  
  const [favourites, saveFavourites] = useLocalStorage("favourites", []);

  return (
    <section className='py-5'>
      <Container className=''>
      <div className="row">
          {favourites &&
            favourites.map((food) => (
              <div className="col-3 mb-4" key={food.id}>
                <Food {...food} isBookmarked={true}/>
              </div>
            ))}
        </div>
      </Container>
      
    </section>
    
  )
}

export default Favorites
