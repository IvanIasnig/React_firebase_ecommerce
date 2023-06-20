import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore as db } from "../firebase";
import { BsCartPlusFill } from "react-icons/bs";
import { CartContext } from "../context/Cartcontext";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "oggetti");
      const database = await getDocs(productsCollection);
      setProducts(database.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterCategory(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (filterCategory === "All" || product.category === filterCategory) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });



  return (
    <div className="container">
      <Modal></Modal>
      <div className="row justify-content-center">
        <div className="col-12 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select className="form-select mt-2" value={filterCategory} onChange={handleFilter}>
            <option value="All">All products</option>
            <option value="Mouse">Mouse</option>
            <option value="Keyboard">Keyboards</option>
            <option value="Headphones">Headphones</option>
          </select>
        </div>
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100 mx-auto">
              <img
                src={product.image}
                className="card-img-top "
                alt={product.name}
              />
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>

                <p>{product.price} €</p>
              </div>
              <div className="card-footer">
                <button
                  className="my-btn w-100"
                  onClick={() => addToCart(product)}
                >
                  <BsCartPlusFill /> Aggiungi al carrello
                </button>
                <Link to={`/account/details/${product.id}`}>
                  <button className="my-btn det-btn mt-1 w-100">
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
