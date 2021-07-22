import React, { useEffect, useState } from 'react'
import { useParams,useHistory } from 'react-router'
import conf from '../config.json'
import CreateInventory from './CreateInventory'
function UpdateInventory() {
    const {bookId} = useParams()
    const [inventory, setinventory] = useState({isLoaded: false})
    useEffect(() => {
        console.log('fetching')

      fetch(conf.baseUrl+'inventory/book/'+bookId+'/')
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
        }
      )
    }, [])


    return (
        <div>
            {inventory.isLoaded && <CreateInventory id={bookId} data={inventory.data} />}
        </div>
    )
}

export default UpdateInventory
