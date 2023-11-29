/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { faker } from "@faker-js/faker";
import Counter from "./Counter";
import withToggles from "./HOC";
import "./styles.css";

const products = Array.from({ length: 20 }, () => {
  return {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
  };
});

const companies = Array.from({ length: 15 }, () => {
  return {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase(),
  };
});

function ProductItem({ product }) {
  return (
    <li className="product">
      <p className="product-name">{product.productName}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-description">{product.description}</p>
    </li>
  );
}

function CompanyItem({ company, defaultVisibility }) {
  const [isVisible, setIsVisible] = useState(defaultVisibility);
  // console.log(defaultVisibility);
  return (
    <li
      className="company"
      // onMouseEnter={() => setIsVisible(true)}
      onClick={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      style={!isVisible ? { cursor: "pointer" } : {}}
    >
      <p className="company-name">{company.companyName}</p>
      {isVisible && (
        <p className="company-phrase">
          <strong>About:</strong> {company.phrase}
        </p>
      )}
    </li>
  );
}

function List({ title, items, render }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const displayItems = isCollapsed ? items.slice(0, 3) : items;

  function toggleOpen() {
    setIsOpen((isOpen) => !isOpen);
    setIsCollapsed(false);
  }

  return (
    <div className="list-container">
      <div className="heading">
        <h3>{title}</h3>
        <button onClick={toggleOpen}>
          {isOpen ? <span>&or;</span> : <span>&and;</span>}
        </button>
      </div>

      {/* This List now no longer knows what it is rendering - this is what we call
      "inversion of control" - an important principle in software development */}
      {isOpen && <ul className="list">{displayItems.map(render)}</ul>}

      {/* {isOpen && (
        <ul className="list">
          {displayItems.map((product) => (
            <ProductItem key={product.productName} product={product} />
          ))}
        </ul>
      )} */}

      <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
        {isCollapsed ? `Show all ${items.length}` : "Show less"}
      </button>
    </div>
  );
}

// Nowadays no one writes HOCs, but they are in libraries, somewhat similar to "render props"
// LATER: Let's say we got this component from a 3rd-party library, and can't change it.
// But we still want to add the 2 toggle functionalities to it - HOC!
function ProductList({ title, items }) {
  return (
    <ul className="list">
      {items.map((product) => (
        <ProductItem key={product.productName} product={product} />
      ))}
    </ul>
  );
}

const ProductListWithToggles = withToggles(ProductList);

export default function App() {
  return (
    <div className="container">
      <h1>React Advanced Patterns</h1>
      <div>
        <h2>Compound Component Pattern</h2>
        {/* The idea is that we can create a set of related components that 
        together achieved a common and useful task - modal windows, pagination,
        tables and so on.. We create a parent component and then children 
        that really make sense when used with the parent.. Here we have
        the so called prop explosion: */}
        {/* <Counter
          iconIncrease="+"
          iconDecrease="-"
          label="My not so flexible counter"
          hideLabel={false}
          hideIncrease={false}
          hideDecrease={false}
          positionCount="top"
        /> */}
        {/* The Counter component should probably keep the state,
        and we are not using props!! We should use contextApi to
        implement the compound component pattern! */}
        <Counter>
          {/* nothing stopping us to also use some html in here 👲  */}
          <Counter.Decrease icon="👎" />
          <Counter.Count />
          <Counter.Increase icon="👍" />
          <Counter.Label>My super flexible counter</Counter.Label>
        </Counter>
      </div>
      <br />
      <div>
        <h2>Render Props Demo</h2>
        {/* The children prop is really not an option, here we need to pass 
      not only the content but also instructions on how to use, 
      that's where the "render props pattern" comes into play - it's all about
      passing in a prop called render - a function, which the component uses to 
      know what it should render and how to do it. Essentially - whenever we can't
      directly pass jsx with children prop - we reach for the "render props pattern". 
      Yet, nowadays, if we want to share logic, the way to go is custom hooks. */}
        {/* Now we can easily reuse the List, the render prop always needs to be a function */}
        <div className="col-2">
          <List
            title="Products"
            items={products}
            render={(product) => {
              return (
                <ProductItem key={product.productName} product={product} />
              );
            }}
          />

          <List
            title="Companies"
            items={companies}
            render={(company) => {
              return (
                <CompanyItem
                  key={company.companyName}
                  company={company}
                  defaultVisibility={false}
                />
              );
            }}
          />
        </div>
      </div>
      <br />
      {/* The HOC: */}
      <div className="col-2">
        <ProductListWithToggles title={"Products with HOC"} items={products} />
      </div>
    </div>
  );
}
