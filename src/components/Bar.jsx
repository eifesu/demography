import styled from 'styled-components'
import * as S from './_styled'

const Bar = styled.div`
    position: absolute;
    left: 0;
    z-index: 0;
    width: ${(props) => `${props.value}%`};
    height: 100%;
    background-color: ${S.theme.darkgray};
    border-radius: inherit;
    display: flex;
    align-items: center;
    justify-content: center;

`

export default Bar