import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore as db } from "../firebase";
import {BsCartPlusFill} from 'react-icons/bs';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'db', 'oggetti', 'vendibili');
      const database = await getDocs(productsCollection);
      setProducts(database.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);
  console.log(products)

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
            <button className="btn btn-primary">
              <BsCartPlusFill /> Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


  );
}

export default Products;


