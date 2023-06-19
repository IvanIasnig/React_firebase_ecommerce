import React, { useContext } from "react";
import styled from "styled-components";
import {FaShoppingBasket} from "react-icons/fa";
import { CartContext } from "../context/Cartcontext";
import { BsCartCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

const Modal = () => {
  const { isModalOpen, closeModal } = useContext(CartContext);

  return (
    <Wrapper className={`${isModalOpen ? "show-modal-overlay" : ""}`}>
      <section className={`${isModalOpen ? "show-modal modal" : "modal"}`}>
        <div className="mt-2">
          <h5>
            <BsCartCheck className="mb-1 me-2" />
            Added to cart!
          </h5>
        </div>
        <button className="btn btn-success" onClick={closeModal}>
          <FaShoppingBasket className="mb-1 me-2" />
          Continue shopping
        </button>
        <Link  to={`/cart`}>
          <button className="btn btn-primary w-100" onClick={closeModal}>
            Go to cart
          </button>
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(54, 54, 54, 0.459);
  opacity: 0;
  visibility: hidden;
  transition: 0.5s ease-in-out;

  .modal {
    position: relative;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -130%);
    height: 150px;
    width: 250px;
    background-color: #ffffff;
    border-radius: 15px;
    display: grid;
    place-items: center;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s ease-in-out;
    .btn-modal {
      position: absolute;
      padding: 0.1rem;
      top: 1%;
      right: 1%;
    }
  }
`;

export default Modal;
