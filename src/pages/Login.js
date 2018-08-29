import React, {Component} from 'react'
import styled from 'styled-components'
import {colors} from "../utils/const";
import Input from '../components/Input'
import Button from "../components/Button";
import LogoImage from '../assets/images/jfvr_logo.png'
import { GoogleMap, Marker } from "react-google-maps"
import LoginActions from "../reducers/login.reducer";
import {connect} from "react-redux";
import {Redirect, Switch} from "react-router-dom";

const LoginWrapper = styled.div`
width: 100%;
height: 100%;
background-color: ${colors.darkpurple};
display: flex;
justify-content: center;
align-items: center;
`

const LoginContainer = styled.div`
display: flex;
max-width: 350px;
max-height: 650px;
width: 90%;
height: 80%;
justify-content: center;
align-items: center;
flex-direction: column;
`

const LoginInputContainer = styled.div`
display: flex;
width: 100%;
background-color: ${colors.white};
justify-content: center;
align-items: center;
padding: 30px;
flex-direction: column;
`

const Logo = styled.img`
  width: 280px;
  height: 250px;
  object-fit: contain;
  margin-bottom: 20px;
 
`

const Error = styled.h4`
  text-align: center;
  color: red;
 
`

class Login extends Component{

    state={
        user:'',
        pass:''
    }


    render(){
        const isAuthenticated = ((localStorage.getItem('id_token') ? true : false)
            || this.props.loginData.data && this.props.loginData.data.token) ;
        if (isAuthenticated) {
            return (
                <Switch>
                    <Redirect to={{
                        pathname: '/start'
                    }}/>
                </Switch>
            );
        }else {
            return (
                <LoginWrapper>
                    <LoginContainer>
                        <Logo
                            src={LogoImage}
                        />
                        <LoginInputContainer>
                            <Input
                                placeholder={'Usuario'}
                                onChange={(event) => {
                                    this.setState({
                                        user: event.target.value
                                    })
                                }}/>
                            <Input
                                type={'password'}
                                placeholder={'Contraseña'}
                                onChange={(event) => {
                                    this.setState({
                                        pass: event.target.value
                                    })
                                }}/>
                            <Button
                                onClick={() => {
                                    this.props.login(this.state.user, this.state.pass)
                                }}>
                                {'Entrar'}
                            </Button>
                            <Error>{this.props.loginData.data && this.props.loginData.data.message}</Error>
                        </LoginInputContainer>
                    </LoginContainer>
                </LoginWrapper>
            )
        }
    }
}

/* Container */
const mapStateToProps = state => ({
    loginData: state.login.get('loginData'),
})

const mapDispatchToProps = dispatch => ({
    login: (user,pass) => dispatch(LoginActions.login(user,pass)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
