import React, { FC } from "react";
import style from "../styles/css/header.module.css";
import Location_Icon from "../images/header/Location_Icon.png";
import Mail_Icon from "../images/header/Mail_Icon.png";
import Logo_Sultan from "../images/header/Logo_Sultan.png";
import Button_Frame from "../images/header/Button_Frame.png";
import Input_Search from "../images/header/Input_Search.png";
import Call_Icon from "../images/header/Call_Icon.png";
import Download_Icon from "../images/header/Download_Icon.png";
import Cart_Icon from "../images/header/Cart_Icon.png";
import Menu_Icon from "../images/header/Menu_Icon.png";
import Mobile_Catalog from "../images/header/Mobile_Catalog.png";
import Mobile_Search from "../images/header/Mobile_Search.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Header: FC = () => {
  const counter = useSelector((state: RootState) => state.cart.counter);
  return (
    <div className={style.header_container}>
      <div className={style.firstline_container}>
        <div className={style.firstline_container_menu}>
          <button>
            <img src={Menu_Icon} alt="" />
          </button>
          <div className={style.firstline_address_container}>
            <img src={Location_Icon} alt="" />
            <div className={style.firstline_address_text}>
              <strong>г. Кокчетав, ул. Ж. Ташенова 129Б</strong>
              <p>(Рынок Восточный)</p>
            </div>
          </div>
          <div className={style.firstline_mail_container}>
            <img src={Mail_Icon} alt="" />
            <div className={style.firstline_address_text}>
              <strong>opt.sultan@mail.ru </strong>
              <p>На связи в любое время</p>
            </div>
          </div>
          <ul>
            <li>О компании</li>
            <hr />
            <li>Доставка и оплата</li>
            <hr />
            <li>Возврат</li>
            <hr />
            <li>Контакты</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className={style.secondline_container}>
        <div className={style.secondline_container_menu}>
          <div className={style.mobile_menu}>
            <img src={Mobile_Catalog} alt="" />
            Каталог
          </div>
          <div className={style.mobile_menu} id={style.mobile_second}>
            <img src={Mobile_Search} alt="" />
            Поиск
          </div>
          <Link to="/">
            <img src={Logo_Sultan} alt="" className={style.sultan_image} data-testid="catalog" id="toggle"/>
          </Link>
          <Link to="/">
            <button style={{ cursor: "pointer" }} >
              Каталог <img src={Button_Frame} alt=""/>
            </button>
          </Link>
          <input type="text" placeholder="Поиск..." />
          <img src={Input_Search} alt="" className={style.input_image} />
          <div className={style.connect_info_container}>
            +7 (777) 490-00-91
            <span>время работы: 9:00-20:00</span>
            <p>Заказать звонок</p>
          </div>
          <img src={Call_Icon} alt="" className={style.call_image} />
          <hr />
          <button>
            Прайс-лист <img src={Download_Icon} alt="" />
          </button>
          <hr />
          <div className={style.cart_container}>
            <Link to="/basket">
              <img src={Cart_Icon} alt="" data-testid="basket"/>
            </Link>
            <button data-testid="counter">{counter}</button>
          </div>
          <div className={style.totalprice_container}>
            <p>Корзина</p>
            <span>12 478 ₸</span>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
