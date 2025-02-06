import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { Storecontext } from '../../Context/Storecontext'

const Navbar = ({setshowlogin}) => {
  
  const[menu, setmenu] = useState("home")
  const {gettotalcartamount,token,settoken} = useContext(Storecontext)

  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem("token")
    settoken("")
    navigate("/")
  }

  return (
    <div className='navbar'>
      <Link to='/' ><img className='logo' src={assets.logo} alt="loading" /></Link>   
      <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setmenu("home")} className={menu==='home'?'active':""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setmenu("menu")} className={menu==='menu'?'active':""}>Menu</a>
        <a href='#app-download' onClick={()=>setmenu("mobile-app")} className={menu==='mobile-app'?'active':""}>Mobile-app</a>
        <a href='#footer' onClick={()=>setmenu("contact-us")} className={menu==='contact-us'?'active':""}>Contact us</a>
       
      </ul>   
      <div className="navbar-right">
        {/* <img  src={assets.search_icon} alt="loading" />    */}
        <div className="navbar-search-icon">
          <Link to='/cart'><img  src={assets.basket_icon} alt="loading" /></Link>   
          <div className={gettotalcartamount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setshowlogin(true)} >Sign in</button>
        : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt='' /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt='' /><p>Logout</p></li>
            </ul>
          </div>}
        
      </div>
    </div>
  )
}

export default Navbar
