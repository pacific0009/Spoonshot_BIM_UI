import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import conf from '../config.json'

function StockCard(props) {
    const [inventory, setinventory] = useState({isLoaded: false})
    const [isError, setIsError] = useState(false)
    const history = useHistory()
    useEffect(() => {
        console.log('fetching')

      fetch(conf.baseUrl+'inventory/book_google/'+props.googleId+'/')
      .then(res => res.json())
      .then(
        (result) => {
          if(result.id)setinventory({
            isLoaded: true,
            data: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
          setIsError(true)
        }
      )
    }, [])

    return (
        <>
            <p>{!isError && inventory.isLoaded && (inventory.data.stock_count == 0 ? <label style={{color: 'red'}}>Out of stock</label> : <div>Stock {inventory.data.stock_count} </div> )}</p>
            <p>{isError && <button onClick={()=>history.push('/add/'+props.googleId)}>Add In Inventory</button>}</p>
        </>
    )
}


function SerchResultDisplayCard(props) {
    // console.log(props.data)
    return (
        <div className='card' style={{height: '400px'}}>
            <img className='thumbnail' src={props.data.volumeInfo.imageLinks? props.data.volumeInfo.imageLinks.smallThumbnail: ""} style={{width: '100%', height: '250px'}}/>
            <h4>{props.data.volumeInfo.title}</h4>
            <StockCard googleId={props.data.id}/>
        </div>
    )
}


function SerchResultDisplay(props) {
    return (
        <div className='raster-flex'>
            {props.data.map((item)=><div> <SerchResultDisplayCard data={item}/></div> )}
        </div>
    )
}

export default SerchResultDisplay
