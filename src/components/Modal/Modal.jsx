import React, { useEffect } from "react";
import "./Modal.css";

const Modal = ({ isVisible, pers, hide }) => {
  console.log(pers);

  useEffect(() => {
    // при рождении убрать скролл
    document.body.style.overflow = "hidden";
    // при нажатии на ESC закрыть модальное окно
    document.addEventListener("keydown", (e) => {
      e.code === "Escape" && hide();
    });
    // при рождении навесить другое событие на кнопку назад у браузера
    if (isVisible) {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => hide();
    }
    return () => {
      // при закрытии вернуть скролл
      document.body.style.overflow = "auto";
      // при закрытии убрать действие с кнопки ESC
      document.removeEventListener("keydown", () => {});
      // при закрытии вернуть действие по умолчанию на кнопку назад в браузере
      if (!isVisible) window.history.back();
      window.onpopstate = () => {};
    };
  }, []);

  return (
    <div onClick={hide} className="modal">
      <div onClick={(e) => e.stopPropagation()} className="modal_container">
        <span onClick={hide} className="close">
          &#10006;
        </span>
        <h2>Name: {pers.name}</h2>
        <img src={pers.image} alt={pers.name} />
        <h4>Status: {pers.status}</h4>
        <h4>Gender: {pers.gender}</h4>
        <h4>Species: {pers.species}</h4>
        <h4>location {pers.location.name}</h4>
      </div>
    </div>
  );
};

export default Modal;
