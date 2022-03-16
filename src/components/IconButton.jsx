import styled from 'styled-components'
import Button from './Button'
import * as S from './_styled'

const IconButton = styled(Button)`
    border-radius: 50%;
    width: ${(props) => props.width || 75}px;
    height: ${(props) => props.width || 75}px;
`

export default IconButton