import React from 'react';
import Navegador from './navbar.jsx';
import * as request from 'superagent';
import {array,producto, uni, carro, total, visible} from'./servicio.js'
import {Card, CardImg, CardBody, CardTitle, CardText, Button, Input, Col, Form,Label,Navbar, NavbarBrand, Nav,} from 'reactstrap'
import { Link} from 'react-router-dom'

const barra = {
    backgroundColor: "rgba(215, 40, 40, 0.9)",
}


const horizontal ={
    backgroundColor: "white",
    display: "flex",
    flexWrap:"wrap"
}

const botones= {
    display: "flex",
    flexWrap:"wrap"
}

 function Tarjeta(props){
     
  let array = [];
  let url = "../src/imagenesBase/";
  let imagen;


  function unid(event){
    uni.pop()
    uni.push(parseInt(event.target.value))

    }

    function cambiar(event){
        event.target.value = 1
    }

  for(let i = 0; i < props.items.length; i++) {

    if (props.items[i].imagen != null){
        imagen = url + props.items[i].imagen;
       
        array.push(
            <Col sm="3">
            <Card>
                <CardImg src={(imagen)}></CardImg>
                <CardBody >
                    <CardTitle>{props.items[i].nombre}</CardTitle>
                    <CardText><b>Precio: </b>{props.items[i].precio}</CardText>
                    <CardText><b>Unidades: </b>{props.items[i].unidades}</CardText>
                    <div style={botones}>
                    <Link to="/articulo">
                    <Button color="primary" size="sm" onClick={vermas.bind(this,imagen,props.items[i].nombre,props.items[i].precio,props.items[i].unidades)}>Ver Mas</Button> 
                    </Link>
                    <div>
                    <Button color="warning" size="sm" onClick={props.agregar.bind(this,imagen,props.items[i].nombre,props.items[i].precio, uni)} >Agregar</Button>
                    </div>
                    <Input className="col-sm-4" type="number"  placeholder="1" min="1" max={props.items[i].unidades} onChange={unid} onBlur={cambiar}/>
                    </div>
                </CardBody>
            </Card>
            </Col>
          );
    }
    
  }


  
  return (
    <div className="justify-content-start">
    <div style={horizontal}>
        
        {array}
       
    </div>
    </div>
  );
 
}



function vermas(imagen,nombre,precio,unidades){
    array.pop();
    array.push({imagen,nombre,precio,unidades});
}




class Main extends React.Component{

    constructor(){
        super()
        this.state = {
            data: [],
            valido: false,
            verse: true
        };

        this.buscador = this.buscador.bind(this)
        this.agregar = this.agregar.bind(this)
        this.focus = this.focus.bind(this)
    }
    
    componentWillMount(){

        if (producto.length == 0){
        request
        .get('https://nextu-c848f.firebaseio.com/.json')
        .accept('json')
        .end((err, res)=>{
            if(err || !res.ok){
                console.log("Se encontro un error")
            }else{
                
                
                Object.values(res.body).map((valor)=>{
                    if(valor!=null){
                    producto.push(valor)
                    }
                })
                this.setState({data: producto} )
            }
        })
        }else{
            this.setState({data: producto} )
        }


        if( carro.length != 0){
            visible.pop();
            visible.push(true);
        }else{
            visible.pop();
            visible.push(false);
        }

    }

    agregar(imagen, nombre, precio, unidad){
        
        precio = precio.substring(2);
        let subtotal = precio * unidad;
        let unitario = unidad[0];
        let val = true; 
        let  pre, sub, num, tot;
        let adicionar = []
    
        for(var i=0; i<producto.length; i++){
    
          if(producto[i].nombre == nombre){
            producto[i].unidades = producto[i].unidades - unidad ;
          }
        }

        this.setState({data: producto})
        
        if (carro.length == 0){
            adicionar = {imagen, nombre, subtotal, unitario}
            total.push(subtotal) 
            carro.push(adicionar)
        }else{
            for(var x=0; x < carro.length; x++){
                if(carro[x].nombre == nombre){
                  pre = parseInt( carro[x].unitario) + parseInt(unitario) 
                  carro[x].unitario = pre;
                  num =  carro[x].subtotal;
                  sub =   num  + subtotal;
                  carro[x].subtotal = sub ;
                    tot = parseInt(total[0]);
                    total.pop()
                    total.push(tot + subtotal);
                  val = false;
                }
              }
         
             if(val==true){
                adicionar = {imagen, nombre, subtotal, unitario}
                tot = parseInt(total[0]);
                total.pop()
                total.push(tot + subtotal);
                carro.push(adicionar)
             } 
        }


        uni.pop();
        uni.push(1);
        visible.pop();
        visible.push(true)
    }

    buscador(event){
        let subproducto = []

        for(var i=0; i<producto.length; i++){
            var cadena;
            cadena = producto[i].nombre;
      
            if(cadena.indexOf(event.target.value)!=-1){
              producto[i].vista = true
              subproducto.push(producto[i])
            }else{
              producto[i].vista = false
            }
          }

        this.setState({data: subproducto})
    }

    focus(event){
        event.target.value =""
    }

    render(){ 
      
        return(
            <div>
            <Navegador/>
            <div className="container" >
                <Navbar style={barra}>
                    <NavbarBrand>
                        <h1>Catálogo de productos</h1>
                    </NavbarBrand>
                    <Nav className="ml-auto">
                        <Form>
                            <label style={barra}>¿Que estas buscando?</label>
                            <Input type="search" placeholder="Buscar.."  onChange={this.buscador} onBlur={this.focus} />
                        </Form>
                    </Nav>
                </Navbar>
               <Tarjeta items={this.state.data} funcion={this.vermas} agregar={this.agregar}/>
            </div>
            </div>
        )}
}

export default Main;