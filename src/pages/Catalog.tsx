import React, { FC, useState } from "react";
import style from "../styles/css/catalog.module.css";
import Sort_Icon from "../images/catalog/Sort_Icon.png";

const Catalog: FC = () => {
    const [sorting, setSorting] = useState('По названию')
    const changeSorting = (name: string): void => {
        setSorting(name)
    }
  return (
    <div className={style.main_container}>
      <div className={style.bread_crumbs}>
        Главная
        <hr />
        <p>Косметика и гигиена</p>
      </div>
      <div className={style.catalog_title}>
        Косметика
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
    </div>
  );
};

export default Catalog;
