import './Nav.css';
import React from 'react';

const Nav = () => {

    return(
        <div className="nav">
            <button>Now</button>
            <input type="text" style={{width:"50px"}}/>
            <figure>O</figure>
            <div className="date">Date 12.12.12</div>
        </div>
    )
}

export default Nav;