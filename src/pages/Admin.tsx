import React, { FC, useEffect, useState } from "react";
import { IProduct, Type, products } from "../components/Products";
import { Link } from "react-router-dom";
import style from "../styles/css/admin.module.css";

const Admin: FC = () => {
  const [arr, setArr] = useState(products);
  const [searchInputName, setSearchChangeName] = useState("");
  const [checkbox, setCheckbox] = useState<string[]>([]);
  const [searchInputSize, setSearchInputSize] = useState("");
  const [searchInputBarcode, setSearchInputBarcode] = useState(0);
  const [searchInputManufacturer, setSearchInputManufacturer] = useState("");
  const [searchInputBrand, setSearchInputBrand] = useState("");
  const [searchInputDescription, setSearchInputDescription] = useState("");
  const [searchInputPrice, setSearchInputPrice] = useState(0);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("products") || "[]").length === 0) {
      localStorage.setItem("products", JSON.stringify(products));
    } else {
      let productsLocal = JSON.parse(localStorage.getItem("products") || "[]");
      setArr(productsLocal);
    }
  }, []);

  const handleDelete = (item: number) => {
    let updatedArr = arr.filter((el) => el.barcode !== item);
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(updatedArr));
    setArr(updatedArr);
  };

  const handleInput = () => {
    let newProduct = {
      url: "https://ir.ozone.ru/s3/multimedia-y/wc250/6359590462.jpg",
      name: searchInputName,
      volume: "volume",
      size: searchInputSize,
      barcode: searchInputBarcode,
      manufacturer: searchInputManufacturer,
      brand: searchInputBrand,
      desription: searchInputDescription,
      price: searchInputPrice,
      type: checkbox,
      counter: 0,
      writable: true,
    };
    arr.push(newProduct);
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(arr));
  };

  const searchNameChange = (e: { target: { value: string } }): void => {
    setSearchChangeName(e.target.value);
  };

  const searchSizeChange = (e: { target: { value: string } }): void => {
    setSearchInputSize(e.target.value);
  };

  const searchBarcodeChange = (e: { target: { value: string } }): void => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSearchInputBarcode(+e.target.value);
    }
  };

  const searchManufacturerChange = (e: { target: { value: string } }): void => {
    setSearchInputManufacturer(e.target.value);
  };

  const searchBrandChange = (e: { target: { value: string } }): void => {
    setSearchInputBrand(e.target.value);
  };

  const searchDescriptionChange = (e: { target: { value: string } }): void => {
    setSearchInputDescription(e.target.value);
  };

  const searchPriceChange = (e: { target: { value: string } }): void => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSearchInputPrice(+e.target.value);
    }
  };

  const checkboxType = (item: string) => {
    if (!checkbox.includes(item)) {
      checkbox.push(item);
    } else {
      setCheckbox(checkbox.filter((el) => el !== item));
    }
  };

  return (
    <div className={style.container_main}>
      <Link to="/">НА ГЛАВНУЮ</Link>
      <form action="">
        Имя
        <input
          type="text"
          value={searchInputName}
          onChange={searchNameChange}
          placeholder="Имя"
        />
        Объем
        <input type="text" onChange={searchSizeChange} />
        Штрихкод
        <input type="text" onChange={searchBarcodeChange} />
        Производитель
        <input type="text" onChange={searchManufacturerChange} />
        Бренд
        <input type="text" onChange={searchBrandChange} />
        Описание
        <input type="text" onChange={searchDescriptionChange} />
        Цена
        <input type="text" onChange={searchPriceChange} />
        Тип Ухода
        <div className={style.container_checkbox}>
          {" "}
          <input type="checkbox" onChange={() => checkboxType(Type.BODY)} />
          {Type.BODY}
        </div>
        <div className={style.container_checkbox}>
          {" "}
          <input type="checkbox" onChange={() => checkboxType(Type.FACE)} />
          {Type.FACE}
        </div>
        <div className={style.container_checkbox}>
          {" "}
          <input type="checkbox" onChange={() => checkboxType(Type.HAIR)} />
          {Type.HAIR}
        </div>
        <div className={style.container_checkbox}>
          {" "}
          <input type="checkbox" onChange={() => checkboxType(Type.HAND)} />
          {Type.HAND}
        </div>
        <button onClick={handleInput} className={style.input_button}>
          Внести
        </button>
      </form>
      {arr.map((el: IProduct) => {
        return (
          <div key={el.barcode}>
            {el.name}
            <button onClick={() => handleDelete(el.barcode)}>x</button>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
