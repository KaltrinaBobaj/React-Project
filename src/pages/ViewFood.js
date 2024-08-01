import { useLocalStorage } from '@uidotdev/usehooks';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { exists } from '../helpers/cart';

function ViewFood() {
  const[food, setFood] = useState()
  const[qty, setQty] = useState(1)
  const[cart, saveCart] =  useLocalStorage("cart", [])
  const{id} =useParams();
  const [favourites, saveFavourites] = useLocalStorage("favourites", []);
  
  

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://tasty.p.rapidapi.com/recipes/get-more-info",
      params: { id },
      headers: {
        'x-rapidapi-key': 'cf29ad39eemsheae017a4a277dd7p1ab680jsnafd8018542a9',
    'x-rapidapi-host': 'tasty.p.rapidapi.com'
      },
    })
      .then((resp) => {
        if (resp.status === 200) setFood(resp.data);
        console.log(food)
      })
      .catch((error) => console.log(error));
    }, [id])

    const handleAddToFavourites = e =>{
      saveFavourites([...favourites.filter(f=> f.id !== food.id ), food])
      alert('Food was added to favourites')
    }
    const handleAddToCart = e =>{
      e.preventDefault();
      if(exists(food, cart)){
        saveCart(...cart.map(item => {
          return(item.id == food.id) ? {...item, qty: item.qty + parseInt(qty)} : food
        }))
      }else {
        saveCart([...cart, {...food, qty: parseInt(qty)}])
      }

      alert('The meal was added to cart.')
      e.target.reset()
      setQty(1)
    }

  return (
    <Container>
    {
      food &&  <div className='row mt-5 text-center'>
        <div className='col-6 '>
          <img src={food.thumbnail_url} className='h-75 w-75 rounded'></img>
          
        </div>
        <div className='col-6 text-start'>
          <h2>{food.name}</h2>
        <p className='my-4'>{food.description}</p>
            <table className='table table-bordered mb-4'>
              <thead>
                 <tr>
                  <td colSpan="2" className='bg-light'>Nutrition</td>
                  
                 </tr>
              </thead>
              <tbody>
              <tr>
                <td>Calories</td>
                <td>{food.nutrition.calories}</td>
              </tr>
              <tr>
                <td>Carbohydrates</td>
                <td>{food.nutrition.carbohydrates}</td>
              </tr>
              <tr>
                <td>Fat</td>
                <td>{food.nutrition.fat}</td>
              </tr>
              <tr>
                <td>Fiber</td>
                <td>{food.nutrition.fiber}</td>
              </tr>
              <tr>
                <td>Protein</td>
                <td>{food.nutrition.protein}</td>
              </tr>
              <tr>
                <td>Sugar</td>
                <td>{food.nutrition.sugar}</td>
              </tr>
              </tbody>
            </table>
            <form className='d-inline ' onSubmit={handleAddToCart}>
              <input type='number' name='qty' onChange={(e) => setQty(e.target.value)} min={1} max={100} value={qty} className='  form-control d-inline me-2 ' style={{width:'100px'}}/>
              <Button variant='outline-primary me-2' type='submit'><i className="fa-solid fa-cart-shopping"></i></Button>
              {
                (favourites.filter (f => f.id == food.id).length == 0) &&<Button variant='outline-danger ' onClick={handleAddToFavourites} type='submit'><i className="fa-regular fa-heart"></i></Button>
              }
            </form>
        </div>
      </div>
    }
    </Container>
  )
}

export default ViewFood
