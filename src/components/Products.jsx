import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore as db } from "../firebase";
import { BsCartPlusFill } from "react-icons/bs";
import { CartContext } from "../context/Cartcontext";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "oggetti");
      const database = await getDocs(productsCollection);
      setProducts(database.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  const truncateDescription = (desc, charLimit) => {
    return desc.length > charLimit
      ? `${desc.substring(0, charLimit)}...`
      : desc;
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100 mx-auto">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="card-text">
                  <b>Description:</b>{" "}
                  {truncateDescription(product.description, 120)}
                </p>
                <p>{product.price} €</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                >
                  <BsCartPlusFill /> Aggiungi al carrello
                </button>
                <Link to={`/account/details/${product.id}`}>
                  <button className="btn btn-success mt-1 w-100">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
