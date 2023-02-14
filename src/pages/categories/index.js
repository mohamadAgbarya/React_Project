import React, { useEffect, useState } from "react";
import Wave from "../../assests/wave.png";
import inStock from "../../assests/instock.png";

import "./index.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { db } from "../../firebase.config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useHistory } from "react-router-dom";

import FadeLoader from "react-spinners/FadeLoader";

function Food() {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [CategoryName, setCategoryName] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [noDataFound, setnoDataFound] = useState(false);

  async function GetCategoryName() {
    const docRef = doc(db, "Categories", category);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCategoryName(docSnap.data()?.Name);
    }
  }

  useEffect(() => {
    GetCategoryName();
  }, [category]);

  async function GetData() {
    const docSnap = await getDocs(collection(db, category));
    const Product = [...data];
    console.log(Product.length, "00000000000000");
    if (Product.length === 0) {
      setnoDataFound(true);
    }
    docSnap.forEach((doc) => {
      if (Product.filter((a) => a?.id == doc?.id).length == 0) {
        Product.push({ id: doc?.id, ...doc.data() });
      }
    });
    setData(Product);
    setisLoading(false);
  }

  useEffect(() => {
    GetData();
    setisLoading(true);
  }, []);

  const history = useHistory();

  return (
    <div>
      <div className="foodDivBackground">
        <h1>{CategoryName} List</h1>
      </div>
      <div className="mainDivWave">
        <img src={Wave} alt="wave" />
      </div>
      <div className="cardMainClass">
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FadeLoader color="black" />
          </div>
        ) : (
          <Container>
            <Row>
              {data?.length > 0 ? (
                data.map((a) => {
                  return (
                    <Col sm={4} key={a?.id}>
                      {" "}
                      <div
                        className="cardClass"
                        onClick={() =>
                          history.push(`/update-items/${category}/${a?.id}`)
                        }
                      >
                        <Card style={{ width: "18rem", marginBottom:"15%" }}>
                          {a?.inStock ? (
                            <img
                              src={inStock}
                              alt="instock"
                              style={{
                                width: "30%",
                                position: "absolute",
                                zIndex: 1,
                                marginLeft: "-15%",
                              }}
                            />
                          ) : (
                            ""
                          )}
                          <Card.Img
                            variant="top"
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              height: "200px",
                              objectFit: "contain",
                            }}
                            onClick={() =>
                              history.push(`/update-items/${category}/${a?.id}`)
                            }
                            src={`https://firebasestorage.googleapis.com/v0/b/pet-store-e677c.appspot.com/o/images%2F${a?.image}?alt=media`}
                          />
                          <Card.Body>
                            <Card.Title>{a?.name}</Card.Title>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                              <b>Category:</b> {CategoryName}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <b>Price:</b> ${a?.price}
                            </ListGroup.Item>
                          </ListGroup>
                        </Card>
                      </div>
                    </Col>
                  );
                })
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {noDataFound ? <h1>No Data Found For This Category</h1> : ""}
                </div>
              )}
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}

export default Food;
