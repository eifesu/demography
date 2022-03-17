import * as S from './_styled'
import styled from 'styled-components'

const Main = styled.main`
    background-color: ${S.theme.background};
    width: 100%;
    min-height: 100vh;
    min-height: 100%;
    box-sizing: border-box;
    font-family: 'Nimbus Sans L';
    font-weight: bold ;
    font-size: 20px;
    box-sizing: border-box;
    overflow-y: hidden;
    overflow-x: hidden;

    
    em {
        font-family: 'Aileron';
        font-weight: 100;
        font-style: italic;
    }
`

export default Main