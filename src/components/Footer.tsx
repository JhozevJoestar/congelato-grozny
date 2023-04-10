import React, { FC } from "react";
import style from "../styles/css/footer.module.css";
import Logo_Sultan from "../images/footer/Logo_Sultan.png";
import Input_Button from "../images/footer/Input_Button.png";
import Download_Icon from "../images/header/Download_Icon.png";
import WhatsApp_Icon from "../images/footer/WhatsApp_Icon.png";
import Telegram_Icon from "../images/footer/Telegram_Icon.png";
import Visa from "../images/footer/Visa.png";
import MasterCard from "../images/footer/MasterCard.png";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <div className={style.footer_container}>
      <div className={style.footer_container_menu}>
        <div className={style.container_one_menu}>
          <img src={Logo_Sultan} alt="" className={style.footer_sultan_logo} />
          <div className={style.first_menu_text}>
            Компания «Султан» — снабжаем розничные магазины товарами "под ключ"
            в Кокчетаве и Акмолинской области
          </div>
          <Link to="/admin">Админка</Link>

          <div className={style.first_input_title}>
            Подпишись на скидки и акции
          </div>
          <div className={style.first_input_container}>
            <input type="text" placeholder="Введите ваш E-mail" />
            <img src={Input_Button} alt="" />
          </div>
        </div>
        <div className={style.container_one_menu}>
          <ul>
            <li>Меню сайта:</li>
            <li>О компании</li>
            <li>Доставка и оплата</li>
            <li>Возврат</li>
            <li>Контакты</li>
          </ul>
        </div>
        <div className={style.container_one_menu}>
          <ul>
            <li>Категории:</li>
            <li>Бытовая химия</li>
            <li>Косметика и гигиена</li>
            <li>Товары для дома</li>
            <li>Товары для детей и мам</li>
            <li>Посуда</li>
          </ul>
        </div>
        <div className={style.container_one_menu}>
          <div className={style.container_one_menu}>
            <div className={style.fourth_menu_title}>Скачать прайс-лист:</div>
            <div className={style.fourth_pricelist}>
              <button>
                Прайс-лист <img src={Download_Icon} alt="" />
              </button>
            </div>
            <div className={style.fourth_contact_list}>
              Связь в мессенджерах:
              <img src={WhatsApp_Icon} alt="" />
              <img src={Telegram_Icon} alt="" />
            </div>
          </div>
        </div>
        <div className={style.container_one_menu}>
          <div className={style.fifth_menu_title}>Контакты:</div>
          <div className={style.fifth_menu_contact}>
            +7 (777) 490-00-91
            <span>время работы: 9:00-20:00</span>
            <p>Заказать звонок</p>
          </div>
          <div className={style.fifth_menu_mail}>
            opt.sultan@mail.ru
            <span>На связи в любое время</span>
          </div>
          <div className={style.fifth_menu_banks}>
            <img src={Visa} alt="" />
            <img src={MasterCard} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
