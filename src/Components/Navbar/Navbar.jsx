import React, { useContext, useState,useRef } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import nav_dropdown from '../Assets/dropdown_icon.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
const Navbar = ()=>{

    const [menu,setMenu] = useState("shop"); //red underline to the one we are in
    const {getTotalCartItems} = useContext(ShopContext);

    //media query for navbar
    const menuRef = useRef();
    const dropdown_toggle = (e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }


    return(
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p>ZAKZING</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                {/* use menu when ternary operator is true */}
                <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none'}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none'}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                {/* if local storage has one auth token available then logout button will appear */}
                {localStorage.getItem('auth-token')
                ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                :<Link to='/login'><button>Login</button></Link>}
                 <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                 <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar