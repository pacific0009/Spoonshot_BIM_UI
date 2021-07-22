import React, { useEffect, useState } from 'react'
import '../styles/common.css'
import conf from '../config.json'
function CreateInventory(props) {
    const [payload, setpayload] = useState({title: props.title, google_id:props.google_id, stock_count: 0})
    const [isAdded, setIsAdded] = useState(false)

    useEffect(() => {
        if(props.id && props.data){
            setpayload(props.data)
            console.log('payload', payload);
        }
        return () => {
            // cleanup
        }
    }, [])

    function add(item) {
        setIsAdded(false);
       fetch(conf.baseUrl+'inventory/book/', 
           {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(item),
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsAdded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
        })
    }

    function update(item) {
        setIsAdded(false);
       fetch(conf.baseUrl+'inventory/book/' + props.id +'/', 
           {
               method: 'PUT',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(item),
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsAdded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
        })
    }
    
    function setValue(key, value){
        let val = {...payload}
        val[key] = value
        setpayload(val)
    }

    return (
        <div className='container'>
            <div className='heading'>{props.id? <label>Update Inventory</label>:<label>Add Inventory</label>}</div>
            <div id="vspace"></div>

            <div>
              {isAdded && <div className='tost'> {props.id? <label>Updated</label>:<label>Item  added</label>} </div>}
            </div>
            
            <div className="row">  
              <div class="col-25">
                <label for="fname">Title</label>
              </div>
              <div class="col-75">
                <input type="text"  value={payload.title} onChange={(evt)=>{console.log(evt.target.value); setValue('title', evt.target.value)}}/>
              </div>
            </div>
            <div className="row"> 
            <div class="col-25">
                <label for="fname">Google Id</label>
            </div>
            <div class="col-75">
              <input type="text" value={payload.google_id} onChange={(evt)=>{setValue('google_id', evt.target.value)}}/>
            </div>
            </div>
            <div className="row"> 
            <div class="col-25">
                <label for="fname">Stock</label>
            </div>
            <div class="col-75">
              <input type="number" value={payload.stock_count} onChange={(evt)=>{setValue('stock_count', evt.target.value)}}/>
            </div>
            </div>
            <div className="row">
              
              <input type='submit' onClick={()=>{props.id?update(payload) : add(payload)}}/>
            </div>

        </div>

    )
}

export default CreateInventory
