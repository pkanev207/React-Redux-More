/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { faker } from "@faker-js/faker";
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
  console.log(defaultVisibility);

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
        <h2>{title}</h2>
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

export default function App() {
  return (
    <div>
      <h1>Render Props Demo</h1>
      {/* The children prop is really not an option, here we need to pass 
      not only the content but also instructions on how to use, 
      that's where the "render props pattern" comes into play - it's all about
      passing in a prop called render - a function, which the component uses to 
      know what it should render and how to do it. Essentially - whenever we can't
      directly pass jsx with children prop - we reach for the "render props pattern". 
      Yet, nowadays, if we want to share logic, the way to go is custom hooks. */}
      <div className="col-2">
        <List
          title="Products"
          items={products}
          render={(product) => {
            return <ProductItem key={product.productName} product={product} />;
          }}
        />

        {/* Now we can easily reuse the List, the render prop always needs to be a function */}
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
  );
}

// LATER: Let's say we got this component from a 3rd-party library,
// and can't change it. But we still want to add the 2 toggle functionalities to it
function ProductList({ title, items }) {
  return (
    <ul className="list">
      {items.map((product) => (
        <ProductItem key={product.productName} product={product} />
      ))}
    </ul>
  );
}
