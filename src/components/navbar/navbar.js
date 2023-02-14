import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navbar.css";
import AddIcon from "../../assests/add.svg";

import logo from "../../assests/logo.png";
import { withAppContext } from "../../Context";
import { useEffect, useState } from "react";
import Contact from "../../pages/categories/contact";

function NavbarMain({ Categories, GetCategories }) {
  const [openModal, setopenModal] = useState(false);
  useEffect(() => {
    GetCategories();
  }, {});

  return (
    <Navbar className="mainNavBar" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ alignItems: "center" }}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Blog</Nav.Link>
            <NavDropdown
              title="Elements"
              id="basic-nav-dropdown"
              className="navbarCollapse"
            >
              {Categories?.map((a) => {
                return (
                  <div key={a?.id}>
                    <NavDropdown.Item href={`/category/${a?.id}`}>
                      {a?.Name}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </div>
                );
              })}
            </NavDropdown>
            <Nav.Link
              onClick={() => {
                setopenModal(true);
              }}
            >
              Contact
              {/* <Contact /> */}
            </Nav.Link>
            <Nav.Link href="/add-items">
              {/* ADD */}
              <img
                style={{
                  width: "40px",
                  alignItems: "center",
                  alignContent: "center",
                }}
                src={AddIcon}
                alt="Add"
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default withAppContext(NavbarMain);
