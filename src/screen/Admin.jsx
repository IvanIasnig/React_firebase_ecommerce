import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore as db } from "../firebase";
import Navbar from "../components/Navbar";
import Bg from "../components/Bg";
import { deleteDoc } from "firebase/firestore";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "",
    brand: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "",
    brand: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "oggetti");
      const database = await getDocs(productsCollection);
      setProducts(database.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchProducts();
  }, [reload]);

  const addProduct = async () => {
    const productsCollection = collection(db, "oggetti");
    await addDoc(productsCollection, newProduct);
    setNewProduct({
      name: "",
      description: "",
      image: "",
      price: "",
      category: "",
      brand: "",
    });
    setReload(!reload);
  };

  const updateProduct = async (id, updatedProduct) => {
    const productRef = doc(db, "oggetti", id);
    await updateDoc(productRef, updatedProduct);
    setReload(!reload);
  };

  const startEditingProduct = (product) => {
    setEditingProduct(product);
    setUpdatedProduct(product);
  };

  const submitProductEdits = async () => {
    await updateProduct(editingProduct.id, updatedProduct);
    setEditingProduct(null);
    setUpdatedProduct({
      name: "",
      description: "",
      image: "",
      price: "",
      category: "",
      brand: "",
    });
  };

  const deleteProduct = async (id) => {
    const productRef = doc(db, "oggetti", id);
    await deleteDoc(productRef);
    setReload(!reload);
  };

  return (
    <>
      <Bg></Bg>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">
                    <small className="text-muted">{product.price} €</small>
                  </p>
                  <p className="card-text">{product.category}</p>
                  <p className="card-text">{product.brand}</p>
                  {editingProduct && editingProduct.id === product.id ? (
                    <>
                      <button
                        className="btn btn-primary mb-2"
                        onClick={submitProductEdits}
                      >
                        Applica Modifiche
                      </button>
                      <div className="form-group">
                        <input
                          className="form-control"
                          value={updatedProduct.name}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              name: e.target.value,
                            })
                          }
                          placeholder="Titolo"
                        />
                        <input
                          className="form-control"
                          value={updatedProduct.description}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              description: e.target.value,
                            })
                          }
                          placeholder="Descrizione"
                        />
                        <input
                          className="form-control"
                          value={updatedProduct.image}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              image: e.target.value,
                            })
                          }
                          placeholder="URL Immagine"
                        />
                        <input
                          className="form-control"
                          value={updatedProduct.price}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              price: e.target.value,
                            })
                          }
                          placeholder="Prezzo"
                        />
                        <input
                          className="form-control"
                          value={updatedProduct.category}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              category: e.target.value,
                            })
                          }
                          placeholder="Category"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-success m-1"
                        onClick={() => startEditingProduct(product)}
                      >
                        Modify
                      </button>
                      <button
                        className="btn btn-danger m-1"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Add product</h5>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addProduct();
                  }}
                >
                  <div className="form-group">
                    <input
                      className="form-control my-1"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      placeholder="Title"
                    />
                    <input
                      className="form-control my-1"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description"
                    />
                    <input
                      className="form-control my-1"
                      value={newProduct.image}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, image: e.target.value })
                      }
                      placeholder="URL"
                    />
                    <input
                      className="form-control my-1"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      placeholder="Price"
                    />
                    <input
                      className="form-control my-1"
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        })
                      }
                      placeholder="Category"
                    />
                    <input
                      className="form-control my-1"
                      value={newProduct.brand}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          brand: e.target.value,
                        })
                      }
                      placeholder="Brand"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add product
                  </button>
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

//aggiungere categoria, aggiungere pagina di dettaglio (useParams)
