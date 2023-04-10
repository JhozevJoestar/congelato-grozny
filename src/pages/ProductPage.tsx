import React, { FC } from "react";
import style from "../styles/css/productpage.module.css";
import { useParams } from "react-router-dom";
import { IProduct, products } from "../components/Products";
import { useState } from "react";
import Volume_Icon from "../images/catalog/Volume_Icon.png";
import Weight_Icon from "../images/catalog/Weight_Icon.png";
import Cart_Icon from "../images/catalog/Cart_Icon.png";
import Share_Icon from "../images/productpage/Share_Icon.png";
import Download_Icon from "../images/productpage/Download_Icon.png";
import Arrow_Icon from "../images/catalog/Sort_Icon.png";
import MobileArrow_Icon from "../images/catalog/MobileArrow_Icon.png";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import {
  decrement,
  addToCartSlice,
  increment,
} from "../store/reducers/cartSlice";

const ProductPage: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [firstStyle, setFirstStyle] = useState(false);
  const [secondStyle, setSecondStyle] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);

  const handleDecrement = (el: IProduct): any => {
    dispatch(decrement(el));
  };

  const handleIncrement = (el: IProduct): any => {
    dispatch(increment(el));
  };

  const changeFirstStyle = () => {
    setFirstStyle((current) => !current);
  };

  const changeSecondStyle = () => {
    setSecondStyle((current) => !current);
  };

  const handleAddToCart = (el: IProduct) => {
    dispatch(addToCartSlice(el));
  };

  return (
    <div>
      {id !== undefined
        ? products
            .filter((el) => el.barcode === +id)
            .map((el) => {
              return (
                <div className={style.container} key={el.barcode}>
                  <div className={style.mobile_container}>
                    <button>
                      <img src={MobileArrow_Icon} alt="" />
                    </button>
                    Назад
                  </div>
                  <ul>
                    <li>Главная</li>
                    <hr />
                    <li>Каталог</li>
                    <hr />
                    <li>{el.name}</li>
                  </ul>
                  <div className={style.main_container}>
                    <div className={style.image_container}>
                      <img src={el.url} alt="" />
                    </div>
                    <div className={style.info_container}>
                      <div className={style.static_info}>В наличии</div>
                      <span>
                        <strong>{el.brand}</strong> {el.name}
                      </span>
                      <div className={style.product_volume_container}>
                        <img
                          src={
                            el.volume === "volume" ? Volume_Icon : Weight_Icon
                          }
                          alt=""
                        />
                        <span>{el.size}</span>
                      </div>
                      <div className={style.price_container}>
                        <div className={style.price_text}>{el.price} ₸</div>
                        <div className={style.price_counter}>
                            {el.counter !== undefined && el.counter > 0 ? 
                            <button onClick={() => handleDecrement(el)}>-</button>
                            :
                            <button>-</button>
                            }
                          <div>{el.counter}</div>
                          <button onClick={() => handleIncrement(el)}>+</button>
                        </div>
                        {cart.cart.find(
                          (item) => item.barcode === el.barcode
                        ) && cart.counter > 0 ? (
                          <button>
                            В корзине
                            <img src={Cart_Icon} alt="" />
                          </button>
                        ) : (
                          <button onClick={() => handleAddToCart(el)}>
                            В корзину
                            <img src={Cart_Icon} alt="" />
                          </button>
                        )}
                      </div>
                      <div className={style.share_container}>
                        <div className={style.share}>
                          <img src={Share_Icon} alt="" />
                        </div>
                        <div className={style.share_info}>
                          <span>
                            При покупке от <strong>10 000 ₸</strong> бесплатная
                            доставка по Кокчетаву и области
                          </span>
                        </div>
                        <button>
                          Прайс-лист
                          <img src={Download_Icon} alt="" />
                        </button>
                      </div>
                      <div className={style.first_characteristic}>
                        <div className={style.characteristic_container}>
                          Производитель: <span>{el.manufacturer}</span>
                        </div>
                        <div className={style.characteristic_container}>
                          Бренд: <span>{el.brand}</span>
                        </div>
                        <div className={style.characteristic_container}>
                          Артикул: <span>460404</span>
                        </div>
                        <div className={style.characteristic_container}>
                          Кол-во в коробке: <span>2</span>
                        </div>
                        <div className={style.characteristic_container}>
                          Штрихкод: <span>{el.barcode}</span>
                        </div>
                        <div className={style.characteristic_container}>
                          Размеры коробки(Д*Ш*В): <span>10х10х10</span>
                        </div>
                        <div className={style.characteristic_container}>
                          Вес коробки:: <span>1020 г</span>
                        </div>
                      </div>
                      <div
                        className={
                          firstStyle
                            ? style.description_container
                            : style.description_container_disabled
                        }
                      >
                        <div
                          className={style.description}
                          onClick={changeFirstStyle}
                        >
                          Описание <img src={Arrow_Icon} alt="" />
                        </div>
                        <div className={style.description_text}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nullam interdum ut justo, vestibulum sagittis
                          iaculis iaculis. Quis mattis vulputate feugiat massa
                          vestibulum duis. Faucibus consectetur aliquet sed
                          pellentesque consequat consectetur congue mauris
                          venenatis. Nunc elit, dignissim sed nulla ullamcorper
                          enim, malesuada.
                        </div>
                      </div>
                      <hr />
                      <div
                        className={
                          secondStyle
                            ? style.second_characteristic
                            : style.second_characteristic_diasbled
                        }
                      >
                        <div
                          className={style.characteristic_title}
                          onClick={changeSecondStyle}
                        >
                          Характеристики <img src={Arrow_Icon} alt="" />
                        </div>
                        <div className={style.first_characteristic}>
                          <div className={style.characteristic_container}>
                            Назначение: <span>{el.manufacturer}</span>
                          </div>
                          <div className={style.characteristic_container}>
                            Тип: <span>BioMio</span>
                          </div>
                          <div className={style.characteristic_container}>
                            Производитель: <span>{el.manufacturer}</span>
                          </div>
                          <div className={style.characteristic_container}>
                            Бренд: <span>{el.brand}</span>
                          </div>
                          <div className={style.characteristic_container}>
                            Артикул: <span>{el.barcode}</span>
                          </div>
                          <div className={style.characteristic_container}>
                            Штрихкод: <span>{el.barcode}</span>
                          </div>
                          <div className={style.characteristic_container}>
                            Вес: <span>{el.size}</span>
                          </div>
                          <div className={style.characteristic_container}>
                            Объем: <span>{el.size}</span>
                          </div>
                          <div className={style.characteristic_container}>
                            Кол-во в коробке: <span>2</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
        : null}
    </div>
  );
};

export default ProductPage;
