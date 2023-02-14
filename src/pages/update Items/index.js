import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from "uuid";

import { db, storage } from "../../firebase.config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./updateItems.css";

import {
  Timestamp,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import bin from "../../assests/bin.png";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const initialState = {
  name: "",
  price: "",
  category: "",
  inStock: false,
  image: "",
};
function UpdateItems() {
  const [data, setData] = useState(initialState);
  const [inStock, setinStock] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const { category, id } = useParams();

  const [image, setImage] = useState();
  const history = useHistory();

  async function GetData() {
    const docRef = doc(db, category, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  console.log(image, data.image, "imageimage");

  useEffect(
    () => {
      GetData();
    },
    { id }
  );

  const handleChange = (event) => {
    if (event)
      if (typeof event === "string" || !event) {
        setData({ ...data, [event.target.name]: event.target.value });
      } else {
        const { name, type, value } = event.target;
        console.log({ type });
        if (type == "file") {
          // console.log(event.target.files[0])
          setData({
            ...data,
            image: event.target.files[0],
          });
        } else if (type === "checkbox") {
          setinStock(!inStock);
          setData({
            ...data,
            [event.target.name]: !inStock,
          });
        } else {
          setData({
            ...data,
            [event.target.name]: event.target.value,
          });
        }
      }
  };

  const onSubmit = async (e) => {
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const storageRef = ref(
        storage,
        `images/${Math.random() * 100} ${data?.image?.name}`
      );
      if (image) {
        uploadBytes(storageRef, image).then(async (snapshot) => {
          await updateDoc(doc(db, category, id), {
            name: data?.name,
            price: data?.price,
            inStock: data?.inStock,
            image: snapshot.metadata ? snapshot.metadata.name : data?.image,
            created: Timestamp.now(),
          })
            .then(() => {
              toast("Your Item Was Updated", { autoClose: 1000 });
            })
            .catch((err) => toast(err));
        });
      } else {
        await updateDoc(doc(db, category, id), {
          name: data?.name,
          price: data?.price,
          inStock: data?.inStock,
          image: data?.image,
          created: Timestamp.now(),
        })
          .then(() => {
            history.push(`/category/${category}`);
            toast("Your Item is Updated", 1);
          })
          .catch((err) => toast(err));
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
    setisLoading(false);
  };

  return (
    <div>
      <ToastContainer />
      <div className="updateItemsForm">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="$XX"
              name="price"
              value={data.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Select
              aria-label="Default select example"
              name="category"
              onChange={handleChange}
              value={data.category}
              disabled
              style={{ cursor: "not-allowed" }}
              required
            >
              <option>{data.category}</option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              checked={data.inStock}
              type="checkbox"
              label="Instock"
              name="inStock"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            {data.image ? (
              <Form.Label>
                Image Upload : - {image?.name ? image?.name : data?.image}
                <img
                  src={bin}
                  alt="bin"
                  width="8%"
                  onClick={() => {
                    setData({ ...data, image: "" });
                  }}
                />
              </Form.Label>
            ) : (
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                accept=".jpg,.png,.jpeg"
                required={image?.name}
                // value={image}
              />
            )}
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              // variant="primary"
              style={{ backgroundColor: "green", borderColor: "green" }}
              type="submit"
              disabled={isLoading}
            >
              Update
            </Button>
            <Button
              style={{ backgroundColor: "red", borderColor: "red" }}
              type="submit"
              onClick={async () => {
                setisLoading(true);
                await deleteDoc(doc(db, category, id))
                  .then(() => {
                    toast("Item Was Deleted");
                    history.push(`/category/${category}`);
                  })
                  .catch((err) => toast(err));
                setisLoading(false);
              }}
              disabled={isLoading}
            >
              Delete Item
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UpdateItems;
