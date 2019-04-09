import React from 'react';
import Navegador from './navbar.jsx'
import {Col, Row, Button} from 'reactstrap'
import {array} from './servicio.js'
import { Link} from 'react-router-dom'

const margen = {
    backgroundColor: "white"
}

function Arti(){
    let articulo  = [];
    for(let i=0; i< array.length; i++){
        
        articulo.push(
        <div>
        <Row>
            <Col sm="3">
                <h1>{array[i].nombre}</h1> 
            </Col>
        </Row>
        <Row>
            <Col sm="6">
                <img src={array[i].imagen} width="80%" height="100%" />
            </Col>
            <Col sm="6">
                <h2><b>Precio: </b>{array[i].precio}</h2>
                <h2><b>Unidades Disponibles: </b>{array[i].unidades}</h2>
            </Col>
        </Row>
        <Row>
            <Col sm="3">
                <Link to="/main">
                <Button color="primary"> Atras </Button>
                </Link>
            </Col>
        </Row>
        </div>
        )
    }

    return(
        <div className="container" style={margen}>
        {articulo}
        </div>
    )
}

class Articulo extends React.Component{
  
    render(){
                
        return(
            <div>
            <Navegador/>
            <div className="container">
                <Arti />
            </div>
            </div>
        )}
}

export default Articulo;