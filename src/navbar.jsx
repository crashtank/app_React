import React from 'react';
import {Navbar, NavbarBrand, Nav, NavItem,NavLink} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faCartArrowDown, faSignOutAlt, faCircle } from '@fortawesome/free-solid-svg-icons'
import { Link} from 'react-router-dom'
import { carro, visible} from './servicio.js'

const cir = {
    color: "orangered",
    position: "absolute",
    top: "60%",
    left: "92%",
    zIndex: "100",
    background: "transparent"
}

const letra = {
    color: "white",
  position: "absolute",
  top: "60%",
  left: "92.4%",
  zIndex: "100",
  background: "transparent"
}

function Circulo() {
   
   let arreglo=[]
  
    if(carro!=null){
        arreglo.push(
        <p style={letra}>{carro.length}</p>)
    } 

    return(
        <div>
        <FontAwesomeIcon icon={faCircle} color="danger" size="lg" style={cir} />
        {arreglo}
        </div>
    )
    
}

class Navegador extends React.Component{
    render(){
        console.log(visible)
        return(
            <div className="container">
                <Navbar color="light" light expand="lg">
                    <NavbarBrand>La bodega</NavbarBrand>
                    <Nav className="ml-auto">
                        <NavItem>
                            <NavLink>
                            <Link to="/principal">
                            <FontAwesomeIcon icon={faAlignJustify} size="lg" />
                            </Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                            <Link to="/carrito">
                            <FontAwesomeIcon icon={faCartArrowDown} size="lg" />
                            { visible[0] ? <Circulo/>: null}
                            </Link>                           
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                            <Link to="/">
                            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                            </Link>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )}
}

export default Navegador;