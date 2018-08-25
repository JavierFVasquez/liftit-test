import React from 'react'
import styled from 'styled-components'
import {colors} from "../utils/const";

const StyledInput = styled.input`
  background-color: ${colors.white};
  color: ${colors.fontblack};
  display: flex;
  flex: 1;
  padding: 10px;
  border: 1px solid ${colors.lightgray};
  height: 40px;
  max-height: 30px;
  outline: none;
  margin-bottom: 10px;
  font-size: 13px;
  width: 270px;
  max-width: 90%;
  ::placeholder {
    color: lightgray;
  }
`

const Input = props => {
    return (
        <StyledInput
            {...props}
        />
    )
}

export default Input
