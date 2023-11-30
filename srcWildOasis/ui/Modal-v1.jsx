import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

// A React Portal is a feature that essentially allows us to render an
// element outside of the parent component DOM structure, while still
// keeping the element in the original position of the component tree.
// We can render a component anywhere we want inside the DOM three,
// but still leave it in the same place in the React component tree,
// so we can still pass all the props that we want
// Generally used for elements that we want to stay on top of other elements.
// (modal windows, tooltips, menus... allows to avoid conflict with
// the css property overflow set to hidden, on the parent of the modal,
// making sure that the modal will never be cut off..
// All about reusability!!! 🎈📹🍺🌝)

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

// give a blur effect to the background
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

function Modal({ children, onClose }) {
  return createPortal(
    // first - jsx to render
    <Overlay>
      <StyledModal>
        <Button onClick={onClose}>
          <HiXMark />
        </Button>

        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    // the second argument is a DOM node - where we want to render
    // document.querySelector(),
    document.body,
  );
}

export default Modal;
