import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import '../styles/card.css';
import conf from '../config.json'
function InventoryCard(props) {
    console.log('renderting card', props.data.title)
    const [details, setDetails] = useState({isLoaded: false})
    const history = useHistory()
    useEffect(() => {
        console.log('fetching')

      fetch(conf.baseUrl+'inventory/volumes/'+props.data.google_id+'/')
      .then(res => res.json())
      .then(
        (result) => {
          if(result.volumeInfo)setDetails({
            isLoaded: true,
            data: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
        }
      )
    }, [])

    function removeInventory(id){

      fetch(conf.baseUrl+'inventory/book/'+id+'/?hard=true', 
      {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(
        (result) => {
          props.reload()
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
        }
      )
    }

    return (
        <div className='card'>
            <img src={details.isLoaded && details.data.volumeInfo.imageLinks? details.data.volumeInfo.imageLinks.smallThumbnail: ""} style={{width:'100%', maxHeight: '250px'}}/>
              <h4>{props.data.title}</h4>
                <p class="stock">{props.data.stock_count?<label>Stock: {props.data.stock_count}</label>: <label style={{color: 'red'}}>Out of Stock</label>}</p>
                <p></p>
                <p><button onClick={()=>removeInventory(props.data.id)}>Remove</button></p>
                <p><button onClick={()=>history.push('update/'+props.data.id)}>Update</button></p>
        </div>
    )
}

export default InventoryCard
