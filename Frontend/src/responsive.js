import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    /* @media only screen and (max-width: 400px) {
      ${props}
    } */
    @media (max-width: 400px){
      font-size: 45%;
      
    }
  `;
};