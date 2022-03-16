import styled from 'styled-components'
import * as S from './_styled'
import Field from './Field'

const Candidate = styled(Field)`
   
    position: relative;
    width: 250px;
    padding: 20px;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    color: white;

    h1 {
    font-family: 'Nimbus Sans L';
    font-weight: bold ;
    font-size: 20px;
    z-index: 1;
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

export default Candidate