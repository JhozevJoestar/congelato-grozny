import React, { FC, useEffect, useState } from "react";
import style from "../styles/css/catalog.module.css";
import Sort_Icon from "../images/catalog/Sort_Icon.png";
import Volume_Icon from "../images/catalog/Volume_Icon.png";
import Weight_Icon from "../images/catalog/Weight_Icon.png";
import Cart_Icon from "../images/catalog/Cart_Icon.png";
import InputSearch_Icon from "../images/catalog/InputSearch_Icon.png";
import Arrow_Icon from "../images/catalog/Arrow_Icon.png";
import Trash_Icon from "../images/catalog/Trash_Icon.png";
import MobileArrow_Icon from "../images/catalog/MobileArrow_Icon.png";
import { IProduct, products } from "../components/Products";
import { addToCartSlice } from "../store/reducers/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";



const Catalog: FC = () => {
  let pages = Math.ceil(products.length / 15);
  interface ICatagories {
    name: string;
    id?: any;
  }
  const [sorting, setSorting] = useState("По названию");
  const [arr, setArr] = useState(products);
  const [firstPriceValue, setFirstPriceValue] = useState(0);
  const [secondPriceValue, setSecondPriceValue] = useState(10000);
  const [firstPageNum, setFirstPageNum] = useState(0);
  const [secondPageNum, setSecondPageNum] = useState(15);
  const [searchInput, setSearchInput] = useState("");
  const [mobileStyle, setMobileStyle] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useState<undefined | false>(
    undefined
  );
  const [checkbox, setCheckbox] = useState<string[]>([]);
  const categories: ICatagories[] = [
    { name: "Уход за телом", id: "null" },
    { name: "Уход за руками", id: "null" },
    { name: "Уход за ногами", id: "null" },
    { name: "Уход за лицом", id: "null" },
    { name: "Уход за волосами", id: "onehundreedtwenty" },
    { name: "Средства для загара", id: "onehundreedtwenty" },
    { name: "Средства для бритья", id: "onehundreedtwenty" },
    { name: "Подарочные наборы", id: "onehundreedtwenty" },
    { name: "Гигиеническая продукция", id: "onehundreedfourty" },
    { name: "Гигиена полости рта", id: "onehundreedtwenty" },
    { name: "Бумажная продукция", id: "onehundreedtwenty" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let manufacturers: any = [];

  products.forEach((element) => {
    manufacturers[element.manufacturer] =
      (manufacturers[element.manufacturer] || 0) + 1;
  });

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("products") || "[]").length !== 0) {
      let productsLocal = JSON.parse(localStorage.getItem("products") || "[]");
      setArr(productsLocal);
    }
  }, []);

  const changeSorting = (name: string): void => {
    setSorting(name);
    if (name === "По возрастанию цены") {
      setArr(arr.sort((a, b) => a.price - b.price));
    } else if (name === "По убыванию цены") {
      setArr(arr.sort((a, b) => b.price - a.price));
    } else {
      setArr(products);
    }
  };

  const searchChange = (e: { target: { value: string } }): void => {
    setSearchInput(e.target.value);
  };

  const firstPriceChange = (e: { target: { value: string } }): void => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFirstPriceValue(+e.target.value);
    }
  };

  const secondPriceChange = (e: { target: { value: string } }): void => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSecondPriceValue(+e.target.value);
    }
  };

  const addToCart = (el: IProduct) => {
    const prod = products.find((element) => el.barcode === element.barcode)
    if( prod !== undefined) {
      dispatch(addToCartSlice(prod));
    }
  };

  const manufacturerFilter = (value: string) => {
    if (!checkbox.includes(value)) {
      checkbox.push(value);
    } else {
      setCheckbox(checkbox.filter((el) => el !== value));
    }
  };

  const categoriesFilter = (value: string) => {
    let updatedArr = products.filter((el) => el.type.includes(value));
    if (updatedArr.length < 15) {
      changePage(0);
    }
    setArr(updatedArr);
  };

  const changePage = (value: number) => {
    setFirstPageNum(0 + 15 * value);
    setSecondPageNum(15 * (value + 1));
  };

  const cart: IProduct[] = useSelector((state: RootState) => state.cart.cart);

  const handleSearch = () => {
    let updatedArr = products.filter((item) => item.price > firstPriceValue);
    updatedArr = updatedArr.filter((item) => item.price < secondPriceValue);
    console.log(updatedArr);
    if (checkbox.length !== 0) {
      updatedArr = updatedArr.filter((item) =>
        checkbox.includes(item.manufacturer)
      );
    }
    if (updatedArr.length < 15) {
      changePage(0);
    }
    setArr(updatedArr);
  };

  const clearSearch = () => {
    setFirstPriceValue(0);
    setSecondPriceValue(10000);
    setCheckbox([]);
    setSearchInput("");
    setCheckboxStatus(false);
    setCheckboxStatus(undefined);
    handleSearch();
  };

  const changeStyle = () => {
    setMobileStyle((current) => !current);
  };

  return (
    <div className={style.container}>
      <div className={style.mobile_back_button}>
        <button>
          <img src={MobileArrow_Icon} alt="" />
        </button>
        НАЗАД
      </div>
      <div className={style.bread_crumbs} data-testid="catalog_page">
        Главная
        <hr />
        <p>Косметика и гигиена</p>
      </div>
      <div className={style.catalog_title}>
        Косметика и гигиена
        <div className={style.catalog_title_sorting}>
          Сортировка:
          <div className={style.catalog_title_dropdown}>
            <ul>
              <li>
                {sorting}
                <img src={Sort_Icon} alt="" />
                <ul>
                  <li onClick={() => changeSorting("По названию")}>
                    <p>По названию</p>
                  </li>
                  <li onClick={() => changeSorting("По возрастанию цены")}>
                    <p>По возрастанию цены</p>
                  </li>
                  <li onClick={() => changeSorting("По убыванию цены")}>
                    <p>По убыванию цены</p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={style.mobile_search_filter}>
        <div
          className={
            mobileStyle === true
              ? style.options_search_container
              : style.options_search_container_disable
          }
        >
          <div className={style.options_search_title}>
            ПОДБОР ПО ПАРАМЕТРАМ{" "}
            <button onClick={changeStyle}>
              <img src={MobileArrow_Icon} alt="" />
            </button>
          </div>
          <div className={style.options_price_container}>
            <div className={style.options_price_title}>
              Цена
              <p>₸</p>
            </div>
            <div className={style.options_price_inputs}>
              <input
                type="text"
                value={firstPriceValue}
                onChange={(e) => firstPriceChange(e)}
              />
              -
              <input
                type="text"
                value={secondPriceValue}
                onChange={(e) => secondPriceChange(e)}
              />
            </div>
          </div>
          <div className={style.options_manufacturer_container}>
            <div className={style.options_manufacturer_title}>
              Производитель
            </div>
            <div className={style.options_manufacturer_input}>
              <input
                type="search"
                placeholder="Поиск..."
                onChange={searchChange}
              />
              <button>
                <img src={InputSearch_Icon} alt="" />
              </button>
            </div>
            <div className={style.options_manufacturers_container}>
              {Object.keys(manufacturers).map((el: string) => {
                return el.includes(searchInput) ? (
                  <div className={style.options_manufacturer}>
                    <input
                      type="checkbox"
                      checked={checkboxStatus}
                      value={el}
                      onChange={() => manufacturerFilter(el)}
                    />
                    <span>{el}</span>
                    <p>({manufacturers[el]})</p>
                  </div>
                ) : null;
              })}
            </div>
            <hr />
            <form action="submit" className={style.options_all_search}>
              <input
                type="button"
                value="Показать"
                onClick={handleSearch}
                className={style.options_manufacturer}
              />
              <button onClick={clearSearch}>
                <img src={Trash_Icon} alt="" />
              </button>
            </form>
            <div className={style.options_categories_container}>
              <div className={style.options_categories_title}>
                Уход за телом
              </div>
              <div className={style.options_categories}>
                {categories.map((el) => {
                  return (
                    <div
                      className={style.options_category}
                      onClick={() => categoriesFilter(el.name)}
                    >
                      {el.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className={style.categories_container}>
        {categories.map((el) => {
          return (
            <li onClick={() => categoriesFilter(el.name)} id={style[el.id]}>
              <span>{el.name}</span>
            </li>
          );
        })}
      </ul>
      <div className={style.catalog_title_sorting_mobile}>
        Сортировка:
        <div className={style.catalog_title_dropdown}>
          <ul>
            <li>
              {sorting}
              <img src={Sort_Icon} alt="" />
              <ul>
                <li onClick={() => changeSorting("По названию")}>
                  <p>По названию</p>
                </li>
                <li onClick={() => changeSorting("По возрастанию цены")}>
                  <p>По возрастанию цены</p>
                </li>
                <li onClick={() => changeSorting("По убыванию цены")}>
                  <p>По убыванию цены</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.main_container}>
        <form className={style.options_search_container}>
          <div className={style.options_search_title}>ПОДБОР ПО ПАРАМЕТРАМ</div>
          <div className={style.options_price_container}>
            <div className={style.options_price_title}>
              Цена
              <p>₸</p>
            </div>
            <div className={style.options_price_inputs}>
              <input
                type="text"
                value={firstPriceValue}
                onChange={(e) => firstPriceChange(e)}
              />
              -
              <input
                type="text"
                value={secondPriceValue}
                onChange={(e) => secondPriceChange(e)}
              />
            </div>
          </div>
          <div className={style.options_manufacturer_container}>
            <div className={style.options_manufacturer_title}>
              Производитель
            </div>
            <div className={style.options_manufacturer_input}>
              <input
                type="search"
                placeholder="Поиск..."
                onChange={searchChange}
              />
              <button>
                <img src={InputSearch_Icon} alt="" />
              </button>
            </div>
            <div className={style.options_manufacturers_container}>
              {Object.keys(manufacturers).map((el: string) => {
                return el.includes(searchInput) ? (
                  <div className={style.options_manufacturer}>
                    <input
                      type="checkbox"
                      checked={checkboxStatus}
                      value={el}
                      onChange={() => manufacturerFilter(el)}
                    />
                    <span>{el}</span>
                    <p>({manufacturers[el]})</p>
                  </div>
                ) : null;
              })}
            </div>
            <hr />
            <form action="submit" className={style.options_all_search}>
              <input
                type="button"
                value="Показать"
                onClick={handleSearch}
                className={style.options_manufacturer}
              />
              <button onClick={clearSearch}>
                <img src={Trash_Icon} alt="" />
              </button>
            </form>
            <div className={style.options_categories_container}>
              <div className={style.options_categories_title}>
                Уход за телом
              </div>
              <div className={style.options_categories}>
                {categories.map((el) => {
                  return (
                    <div
                      className={style.options_category}
                      onClick={() => categoriesFilter(el.name)}
                      key={el.id}
                    >
                      {el.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </form>
        <div className={style.products_container}>
          {arr.slice(firstPageNum, secondPageNum).map((el) => {
            return (
              <div className={style.product_container} key={el.barcode}>
                <div className={style.product_img_container}>
                  <img src={el.url} alt="" />
                </div>
                <div className={style.product_volume_container}>
                  <img
                    src={el.volume === "volume" ? Volume_Icon : Weight_Icon}
                    alt=""
                  />
                  <span>{el.size}</span>
                </div>
                <div
                  className={style.product_name_container}
                  onClick={() => navigate(`/product/${el.barcode}`)}
                >
                  <span>
                    <strong>{el.brand}</strong> {el.name}
                  </span>
                </div>
                <div className={style.product_info_container}>
                  <div className={style.product_info}>
                    Штрихкод: <span>{el.barcode}</span>
                  </div>
                  <div className={style.product_info}>
                    Производитель: <span>{el.manufacturer}</span>
                  </div>
                  <div className={style.product_info}>
                    Бренд: <span>{el.brand}</span>
                  </div>
                </div>
                <div className={style.product_price_container}>
                  <div className={style.product_price}>{el.price} ₸</div>
                  {cart?.find((item) => item.barcode === el.barcode) ? (
                    <button>
                      В КОРЗИНЕ
                      <img src={Cart_Icon} alt="" />
                    </button>
                  ) : (
                    <button
                      onClickCapture={() => addToCart(el)}
                      style={{ cursor: "pointer" }}
                    >
                      В КОРЗИНУ
                      <img src={Cart_Icon} alt="" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.products_pages}>
        <img src={Arrow_Icon} alt="" />
        {Array.from({ length: pages }, (_, i) => (
          <button key={i} onClick={() => changePage(i)}>
            {i + 1}
          </button>
        ))}
        <img src={Arrow_Icon} alt="" />
      </div>
    </div>
  );
};

export default Catalog;
