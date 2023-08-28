import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    *, :after, :before, ::before, ::after {
    box-sizing: border-box;
    }
`;

export default GlobalStyles;
