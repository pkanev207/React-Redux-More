import styled from "styled-components";
// here are the design tokens:
import GlobalStyles from "./styles/GlobalStyles";

// this css is only scoped to this component - no problems!
const H2 = styled.h2`
  color: var(--color-brand-500);
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  box-shadow: var(--shadow-lg);
`;

const StyledApp = styled.main`
  border: 2px solid var(--color-yellow-100);
  border-radius: var(--border-radius-sm);
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H2>This is the App!!!!!</H2>
      </StyledApp>
    </>
  );
}

// Structure summary:
// Each one of the pages will NOT have side effects,
// they will delegate them to the components associated with the feature
// UI - all the components not belonging to a feature or
// that we might reuse
