import * as S from './_styled'
import styled from 'styled-components'

const Main = styled.div`
    background-color: ${S.theme.background};
    height: 100vh;
    width: 100vw;
    max-width: 600px;
    font-family: 'Nimbus Sans L';
    font-weight: bold ;
    font-size: 20px;
    
    em {
        font-family: 'Aileron';
        font-weight: 100;
        font-style: italic;
    }
`

export default Main