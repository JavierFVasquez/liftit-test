import React, {Component} from 'react'
import styled from 'styled-components'
import {colors} from "../utils/const";
import Input from '../components/Input'
import Button from "../components/Button";
import LogoImage from '../assets/images/jfvr_logo.png'
import { GoogleMap, Marker } from "react-google-maps"

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

class Login extends Component{

    render(){
        return(
            <LoginWrapper>
                <LoginContainer>
                    <Logo
                    src={LogoImage}
                    />
                    <LoginInputContainer>
                    <Input
                        placeholder={'Usuario'}
                        onChange={(event) => {

                        }}/>
                    <Input
                        placeholder={'Contraseña'}
                        onChange={(event) => {

                        }}/>
                    <Button
                        onClick={() => {

                        }}>
                        {'Entrar'}
                    </Button>
                    </LoginInputContainer>
                </LoginContainer>
            </LoginWrapper>
        )
    }
}

export default Login
