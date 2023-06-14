import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore as db } from "../firebase";
import { BsCartPlusFill } from 'react-icons/bs';
import { CartContext } from '../context/Cartcontext';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'db', 'oggetti', 'vendibili');
      const database = await getDocs(productsCollection);
      setProducts(database.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
           <div className="row justify-content-center">
        {products.map(product => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100 mx-auto">
              <img src={product.url} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p className="card-text"><b>Description:</b> {product.description}</p>
                <p>{product.prezzo} €</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => addToCart(product)}>
                  <BsCartPlusFill /> Aggiungi al carrello
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/cart">Vai al carrello</Link>
    </div>
  );
}

export default Products;



