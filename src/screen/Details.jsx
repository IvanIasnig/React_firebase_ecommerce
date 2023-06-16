import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore as db } from "../firebase";
import Bg from "../components/Bg";
import Navbar from "../components/Navbar";

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = doc(db, "oggetti", id);
        const productData = await getDoc(productDoc);
        if (productData.exists) {
          setProduct({ id: productData.id, ...productData.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <Bg />
      <Navbar></Navbar>
      {product ? (
        <div className="container product-details mt-5 text-white">
          <div className="row">
            <div className="col-lg-6">
              <div className="product-image">
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-6 product-info">
              <h2 className="product-name">{product.name}</h2>
              <hr />
              <p>
                <b>Brand:</b> {product.brand}
              </p>
              <p>
                <b>Category:</b> {product.category}
              </p>
              <p>
                <b>Description:</b> {product.description}
              </p>
              <p className="product-price">
                <b>Price:</b> {product.price} €
              </p>
              <Link to="/account" className="btn btn-primary back-button">
               Back to products
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-4">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default Details;
