import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "./Navbar.css";
import logo from "../../images/2.png";
import { CartContext } from "../../CartContext";
import { useProducts } from "../../Context/ProductContext";

const Navbar = ({ theme, setTheme, setIsCartOpen }) => {
  const { cart } = useContext(CartContext);
  const { categories, subcategories, toSlug } = useProducts();
  const [isOpen, setIsOpen] = useState(true);
  const [openCategory, setOpenCategory] = useState(null);

  const toggle = () => setIsOpen(!isOpen);
  const ToggleTheme = () =>
    setTheme(theme === "darkTheme" ? "lightTheme" : "darkTheme");

  return (
    <div>
      <Row className="navbar" style={{ marginTop: "1%" }}>
        <Col lg={3} md={3} sm={2}>
          <Link to="/" onClick={() => setIsOpen(true)}>
            <img className="image" src={logo} alt="logo" />
          </Link>
        </Col>

        <Col className={isOpen ? "navMenu" : "navItems"} lg={1} md={12}>
          <Link
            to="/"
            className="link"
            style={{ color: theme === "darkTheme" ? "white" : "black" }}
          >
            Home
          </Link>
        </Col>

        <Col className={isOpen ? "navMenu" : "navItems"} lg={1} md={12}>
          <div
            className="shop-section"
            onMouseEnter={() => setOpenCategory("main")}
            onMouseLeave={() => setOpenCategory(null)}
          >
            <Link
              to="/collections"
              className="link"
              style={{ color: theme === "darkTheme" ? "white" : "black" }}
            >
              <div className="shop-container">
                Shop
                <span className="arrow-icon">
                  <i style={{color:"red"}} className="fa-solid fa-caret-down"></i>
                </span>
              </div>
              {openCategory === "main" && (
                <div className="dropdown-container">
                  {categories.map((category) => (
                    <div key={category.id} className="dropdown">
                      <Link
                        to={`/${toSlug(category)}`}
                        className="link text-white"
                        style={{
                          color: theme === "darkTheme" ? "white" : "black",
                        }}
                      >
                        {category}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </Link>
          </div>
        </Col>

        <Col className={isOpen ? "navMenu" : "navItems"} lg={1} md={12}>
          <Link
            to="/contactus"
            className="link"
            style={{ color: theme === "darkTheme" ? "white" : "black" }}
          >
            Contact
          </Link>
        </Col>

        <Col className={isOpen ? "navMenu" : "navItems"} lg={1} md={12}>
          <Link
            to="/track"
            className="link"
            style={{ color: theme === "darkTheme" ? "white" : "black" }}
          >
            Track
          </Link>
        </Col>

        <Col
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            gap: "20px"
          }}
          className={isOpen ? "navMenu" : "navItems"}
          lg={2}
        >
          <Link to="/notification" className="link">
            <i className="fa-solid fa-bell"></i>
          </Link>
          
          <div className="cart-icon-wrapper" onClick={() => setIsCartOpen(true)}>
            <i className="fa-solid fa-cart-shopping"></i>
            {cart?.length > 0 && (
              <span className="cart-counter">{cart.length}</span>
            )}
          </div>
          
          {/* <i
            onClick={ToggleTheme}
            className="fa-solid fa-moon"
            style={{ cursor: "pointer" }}
          ></i> */}
        </Col>

        <Col className="burger">
          <i onClick={toggle} className="fa-solid fa-bars"></i>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;