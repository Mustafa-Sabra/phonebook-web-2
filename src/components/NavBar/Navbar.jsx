import React from 'react';

import "./Navbar.css"
const Navbar = (props) => {
    return ( 
        <section className="navbar">
            <div className="menu"><i className="fas fa-braille"></i></div>
            <div className="brand-name"><h2>GDSC</h2></div>
            <button onClick={()=>props.logOut()}>Log Out</button>
        </section>
     );
}
 
export default Navbar;