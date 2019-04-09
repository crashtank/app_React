import React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import * as request from 'superagent'

const formulario = {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '640px',
    height: '120px',
    marginLeft: '-320px',
    marginTop: '-120px'
  };

  const imagen = {
    backgroundImage: "url('../src/imagenesBase/login-fondo.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
    position: 'absolute',
    filter: 'brightness(0.4)'
  }

  const Section = (props) => {
    return <section><FormText color="danger"><h5>Error al iniciar sesión</h5></FormText></section>
  }

  
class Login extends React.Component{
  constructor(props){
      super(props)
      this.state = {
          email: '',
          password: '',
          data: [],
          valido: false
      };

    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.validar = this.validar.bind(this);
      
  }

componentWillMount(){
    request
    .get('https://pruebatienda-b0518.firebaseio.com/.json')
    .accept('json')
    .end((err, res)=>{
        if(err || !res.ok){
            console.log("Se encontro un error")
        }else{
            
            this.setState({data: Object.values(res.body)} )
            
        }
    })   
}
  
changeEmail(event){
    this.setState({email: event.target.value})
}

changePassword(event){
    this.setState({password: event.target.value})
}

validar(){

    this.setState({valido: true});

    for(var x=0; x < this.state.data.length; x++){
        if(this.state.email == this.state.data[x].email && this.state.password == this.state.data[x].password){
            this.setState({valido: false});
            this.props.history.push("/main");
        }
    }

    
}
        
    render(){
        return(
    <div>
        <div style={imagen}></div>
        <Form style={formulario} onSubmit={this.validar.bind(this)} target="votar">
            <div className="text-center">
                <Label><h3>Inicia Sesión</h3></Label>
            </div>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" value={this.state.email} onChange={this.changeEmail} required />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" value={this.state.password} onChange={this.changePassword} required/>
            </FormGroup>
            { this.state.valido ? <Section/> : null }
            <div className="text-center">
                <Button color="success">Iniciar Sesion</Button>
            </div>
            <div className="text-center">
                <br/>
            </div>
            <div className="text-right">
                <h6>Usuario: jonathansanchez@nextu.com</h6>
                <h6>Pass: 123456</h6>
            </div>
        </Form>
        <iframe name="votar" ></iframe>
    </div>
      
     
    )}

    
}



export default Login;