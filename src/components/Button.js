import React from 'react'
import styled from 'styled-components'
import {colors} from "../utils/const";

const StyledButton = styled.button`
  background-color: ${colors.orange};
  color: ${colors.white};
  display: flex;
  flex: 1;
  padding: 10px;
  border: 0 solid transparent;
  height: 50px;
  width: 295px;
  margin-top: 10px;
  align-items: center;
  outline: none;
  font-weight: 300;
  text-align: center;
`

const Input = props => {
    return (
        <StyledButton
            {...props}
        >
            {props.children}
        </StyledButton>
    )
}

export default Input
