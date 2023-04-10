import React, { FC, useState } from "react";
import style from "../styles/css/basket.module.css";
import Volume_Icon from "../images/catalog/Volume_Icon.png";
import Weight_Icon from "../images/catalog/Weight_Icon.png";
import Trash_Icon from "../images/catalog/Trash_Icon.png";
import MobileArrow_Icon from "../images/catalog/MobileArrow_Icon.png";
import { IProduct, products } from "../components/Products";
import { useDispatch } from "react-redux";
import { clearCart, decrement, increment } from "../store/reducers/cartSlice";
import { counterMinus, deleteFromCart } from "../store/reducers/stirk";


const Basket: FC = () => {
  const [arr, setArr] = useState(
    products.filter((el) => (el.counter ? el.counter > 0 : null))
  );

  const dispatch = useDispatch();

  const handleDeleteFromCart = (el: IProduct) => {
    const prod = products.find((element) => el.barcode === element.barcode)
    if(prod !== undefined) {
        dispatch(deleteFromCart(el));
        dispatch(counterMinus(el));
    }
    const newState = products.map((obj) => {
        if (obj.barcode === el.barcode && el.counter) {
          return { ...obj, counter: el.counter };
        }
        return obj;
      });
      setArr(newState);
  };

  const handleClearCart = (el: number) => {
    alert("Благодорим за заказ");
    dispatch(clearCart(el));
    products.map(function (x) {
      x.counter = 0;
      return x;
    });
    setArr([]);
  };

  const handleDecrement = (el: IProduct) => {
    if (el.counter !== undefined && el.counter > 1) {
      dispatch(decrement(el));
      const newState = products.map((obj) => {
        if (obj.barcode === el.barcode && el.counter) {
          return { ...obj, counter: el.counter };
        }
        return obj;
      });
      setArr(newState);
    }
  };

  const handleIncrement = (el: IProduct): any => {
    dispatch(increment(el));
    const newState = products.map((obj) => {
      if (obj.barcode === el.barcode && el.counter) {
        return { ...obj, counter: el.counter };
      }

      return obj;
    });
    setArr(newState);
  };

  let fullPrice = 0;

  return (
    <div className={style.container} data-testid="basket_page">
      <div className={style.mobile_back_button}>
        <button>
          <img src={MobileArrow_Icon} alt="" />
        </button>
        НАЗАД
      </div>
      <div className={style.bread_crumbs}>
        Главная
        <hr />
        <span>Корзина</span>
      </div>
      <div className={style.basket_title}>Корзина</div>
      <div className={style.main_container}>
        <hr />
        {arr
          .filter((el) => (el.counter ? el.counter > 0 : null))
          .map((el) => {
            if (el.counter) fullPrice += el.price * el.counter;
            return (
              <div>
                <div className={style.product_container}>
                  <img src={el.url} alt="" />
                  <div className={style.product_text_container}>
                    <div className={style.product_volume_container}>
                      <img
                        src={el.volume === "volume" ? Volume_Icon : Weight_Icon}
                        alt=""
                      />
                      <span>{el.size}</span>
                    </div>
                    <div className={style.product_text_title}>
                      {el.manufacturer} {el.name}
                    </div>
                    <div className={style.product_text_description}>
                      {el.desription}
                    </div>
                  </div>
                  <div className={style.product_price_container}>
                    <div className={style.product_counter_container}>
                      <button onClick={() => handleDecrement(el)}>-</button>
                      {el.counter}
                      <button onClick={() => handleIncrement(el)}>+</button>
                    </div>
                    <div className={style.product_number_container}>
                      {el.counter !== undefined ? el.price * el.counter : null}{" "}
                      ₸
                    </div>
                    <button onClick={() => handleDeleteFromCart(el)}>
                      <img src={Trash_Icon} alt="" />
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        <div className={style.product_end_container}>
          <button onClick={() => handleClearCart(1)}>Оформить заказ</button>
          <span>{fullPrice} ₸</span>
        </div>
      </div>
    </div>
  );
};

export default Basket;
