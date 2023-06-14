import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { firestore as db } from "../firebase";
import Navbar from "./Navbar";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    url: "",
    prezzo: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "db", "oggetti", "vendibili");
      const database = await getDocs(productsCollection);
      setProducts(database.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  const addProduct = async () => {
    const productsCollection = collection(db, "db", "oggetti", "vendibili");
    await addDoc(productsCollection, newProduct);
    setNewProduct({
      title: "",
      description: "",
      url: "",
      prezzo: "",
    });
  };

  const updateProduct = async (id, updatedProduct) => {
    if (typeof id !== "string") {
      console.error("id is not a string:", id);
      return;
    }

    if (typeof updatedProduct !== "object" || updatedProduct === null) {
      console.error("updatedProduct is not an object:", updatedProduct);
      return;
    }

    const productRef = doc(db, "db", "oggetti", "vendibili", id);
    await setDoc(productRef, updatedProduct, { merge: true });
  };

  const startEditingProduct = (product) => {
    setEditingProduct(product);
  };

  const submitProductEdits = async () => {
    await updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card h-100 mx-auto">
                <img
                  src={product.url}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h2 className="card-title">{product.title}</h2>
                  <p className="card-text">
                    <b>Description:</b> {product.description}
                  </p>
                  <p>{product.prezzo} €</p>
                  {editingProduct && editingProduct.id === product.id ? (
                    <>
                      <button onClick={submitProductEdits}>
                        Applica Modifiche
                      </button>
                      <input
                        value={editingProduct.title}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            title: e.target.value,
                          })
                        }
                      />
                      {/* Devo ancora aggiungere gli input per gli altri campi */}
                    </>
                  ) : (
                    <button onClick={() => startEditingProduct(product)}>
                      Modifica
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="col-md-3 mb-4">
            <div className="card h-100 mx-auto">
              <div className="card-body">
                <h2 className="card-title">Aggiungi Prodotto</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addProduct();
                  }}
                >
                  <input
                    value={newProduct.title}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, title: e.target.value })
                    }
                    placeholder="Titolo"
                  />
                  <input
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    placeholder="Descrizione"
                  />
                  <input
                    value={newProduct.url}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, url: e.target.value })
                    }
                    placeholder="URL Immagine"
                  />
                  <input
                    value={newProduct.prezzo}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, prezzo: e.target.value })
                    }
                    placeholder="Prezzo"
                  />
                  <button type="submit">Aggiungi</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
