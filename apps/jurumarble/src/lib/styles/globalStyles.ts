import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
    -webkit-tap-highlight-color: transparent;
}

    *, :after, :before, ::before, ::after {
    box-sizing: border-box;
    }
    ul, ol, li {
    list-style: none;
    }
    button,
    [role='button'] {
    border: 0;
    border-radius: 0;
    background: none;
    cursor: pointer;
    }
    input {
        outline: none;
    }
    a {
    text-decoration: none;
    cursor: pointer;
}

    :root{
        .Toastify__toast-container{
            display: flex;
            justify-content:center;
            top:8px;

        }
        .Toastify__toast {
            background-color:black;
            color:white;
            border-radius:12px;
            text-align:center;
            font-size: 16px;
            font-weight: 700;
            width:auto;
            padding: 12px 16px;
        }
        .Toastify__close-button{
            display:none;
        }
    }
`;

export default GlobalStyles;
