import React, { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import { Storecontext } from '../../Context/Storecontext';
import axios from 'axios';
const Placeorder = () => {

  const {gettotalcartamount, token, food_list, cartitems,url} = useContext(Storecontext)

const [data, setdata]= useState({
  firstName:"",
  lastName:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:""
})

const onChangeHandler = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setdata(data=>({...data,[name]:value}))
}

const placeorder = async (event) => {
  // const navigate = useNavigate();
  event.preventDefault();
  let orderitems = []
  food_list.map((item)=>{
    if(cartitems[item._id]>0){
      let iteminfo = item;
      iteminfo["quantity"] = cartitems[item._id]
      orderitems.push(iteminfo)
    }
  })
  let orderdata ={
    address:data,
    items:orderitems,
    amount:gettotalcartamount()+2,
  }
  let response = await axios.post(url+"/api/order/place", orderdata, {headers:{token}})
  console.log(response);
  if(!response.data.success){
    // const{session_url} = response.data
    // window.location.replace(session_url)
    alert("Order sucessfully")
    // navigate('/myorders')
  }
  else{
    alert("Error")
  }
  // console.log(orderitems);
}

  // const navigate = useNavigate()

  // useEffect(()=>{
  //   if(!token){
  //     navigate('/cart')
  //   }
  //   else if(gettotalcartamount()===0){
  //     navigate('/cart')
  //   }
  // },[token])

  return (
    <form onSubmit={placeorder} className='place-order' >
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${gettotalcartamount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${gettotalcartamount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${gettotalcartamount() === 0 ? 0 : gettotalcartamount() + 2}</b>
            </div>
          </div>
          <button type='submit' >CONFIRM ORDER</button>
        </div>
      </div>

    </form>
  )
}

export default Placeorder