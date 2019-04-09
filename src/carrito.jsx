import React from 'react';
import Navegador from './navbar.jsx';
import {carro, total, visible} from './servicio.js'
import {Row, Col, Card, CardBody, CardText, CardImg, Button} from 'reactstrap';
import {Link}from 'react-router-dom'

const contenedor = {
    backgroundColor: "white",
    display: "flex",
    flexWrap:"wrap"
}


function TarjetaCarro() {
    let artir = []

        for(let i=0; i < carro.length; i++){
            artir.push(   
                    <Row>
                        <Col sm="8">
                        <Card>
                            <CardImg src={carro[i].imagen}/>
                            <CardBody>
                                <CardText><b>Subtotal: </b>$. {carro[i].subtotal} .00 </CardText>
                            </CardBody>
                        </Card>
                        </Col>
                        <Col sm="4">
                            <p>{carro[0].nombre}</p>
                            <p><b>Unidades: </b> {carro[i].unitario} </p>
                        </Col>
            </Row>)  
        }

    return(
        <Row className="container">
            <div style={contenedor}>
            <Col sm="6">
                {artir}
            </Col>
            <Col sm="6">
                <h1><b>Total: </b> $. {total} .00 </h1>
                <Col sm="3">
                    <Link to="/main">
                         <Button color="danger">Cancelar</Button>
                    </Link>
                </Col>
                <Col sm="3">
                    <Link to="/main">
                        <Button color="success" onClick={pagar.bind(this)}> Pagar </Button>
                    </Link>
                </Col>
            </Col>
            </div>
        </Row>
    )
}

function pagar(){
    while(carro.length != 0){
        carro.pop();
    }
    total.pop();
}

class Carrito extends React.Component{

    componentWillMount(){
        visible.pop();
        visible.push(false)
    }
   
    render(){
                
        return(
            <div>
            <Navegador/>
            <div className="container">
                <TarjetaCarro/>
            </div>
            </div>
        )}
}

export default Carrito;