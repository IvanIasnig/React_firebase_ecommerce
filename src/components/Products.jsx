import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore as db } from "../firebase";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'db', 'oggetti', 'vendibili');
      const productSnapshot = await getDocs(productsCollection);
      setProducts(productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <img src={product.url} alt={product.title} />
          <p>{product.prezzo} €</p>
        </div>
      ))}
    </div>
  );
}

export default Products;


