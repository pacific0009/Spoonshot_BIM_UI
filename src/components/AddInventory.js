import React, { useEffect, useState } from 'react'
import { useParams,useHistory } from 'react-router'
import conf from '../config.json'
import CreateInventory from './CreateInventory'
function AddInventory() {
    const {googleId} = useParams()
    const [inventory, setinventory] = useState({isLoaded: false})
    useEffect(() => {
        console.log('fetching')

      fetch(conf.baseUrl+'inventory/volumes/'+googleId+'/')
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
            {inventory.isLoaded && <CreateInventory title={inventory.data.volumeInfo.title} google_id={inventory.data.id} />}
        </div>
    )
}

export default AddInventory

