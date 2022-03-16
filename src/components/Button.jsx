import styled from 'styled-components';
import * as S from './_styled';

const Button = styled.a`
    width: 250px;
    border-radius: 10px;
    height: 50px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 8px;
    opacity: 0.8;
    transition: 0.1s ease-out;
    user-select: none ;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }

    ${(props) => {
        switch(props.variant) {
            case 'green': return `background-color: ${S.theme.green} `;
            break;
            case 'red': return `background-color: ${S.theme.red}`;
            break;
            case 'teal': return `background-color: ${S.theme.teal}`;
            break;
            case 'default' : return ``
        }
    }}


`
export default Button;
