import React, { Component } from 'react';
import {Button} from "antd";
import 'antd/dist/antd.css';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameUser:""
        }
        }
    
    render(){
        return(
            <div>
               <h1>hello</h1>
            <Button a href ="/movieRecords">login</Button>
            </div>
        )
    }
}
export default Login;

