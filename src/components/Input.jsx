import styled from 'styled-components'
import * as S from './_styled'

const Input = styled.input`
    width: 100%;
    border: none;
    outline: none;
    background-color: none;
    background: none;
    font-weight: bold;
    font-family: 'Nimbus Sans L';
    font-size: 18px;
    color: ${S.theme.darkgray};

    ::placeholder {
        font-weight: bold;
        font-family: 'Nimbus Sans L';
        font-size: 18px;
    } 
`
export default Input