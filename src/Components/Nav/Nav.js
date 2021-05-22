import './Nav.css';
import React from 'react';
import {AiOutlineSearch} from 'react-icons/ai';
import {BiCurrentLocation} from 'react-icons/bi';

const Nav = () => {

    return(
        <div className="nav">
            <button className="nav__button-now">Now</button>
            <input className="nav__input-search" type="text" style={{width:"50px", display: "none"}}/>
            <AiOutlineSearch className="nav__magnifier"/>
            <BiCurrentLocation className="nav__localization"/>
            <div className="nav__date">Date 12.12.12</div>
        </div>
    )
}

export default Nav;