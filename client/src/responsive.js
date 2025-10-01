import { css } from "styled-components"

export const mobile = (props) => css`
  @media screen and (max-width: 480px) {
    ${props}
  }
`

export const tablet = (props) => css`
  @media screen and (max-width: 768px) {
    ${props}
  }
`
