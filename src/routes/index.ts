import  React  from 'react';
import Catalog from './../pages/Catalog';
import Basket from './../pages/Basket';
import ProductPage from './../pages/ProductPage';
import Admin from '../pages/Admin';

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
} 

export enum RoutesName {
    CATALOG = "/",
    BASKET = "/basket",
    PRODUCTPAGE = "/product/:id",
    ADMIN = "/admin"
}

export const routes: IRoute[] = [
    {
        path: RoutesName.CATALOG,
        exact: true,
        component: Catalog
    },
    {
        path: RoutesName.BASKET,
        exact: true,
        component: Basket
    },
    {
        path: RoutesName.PRODUCTPAGE,
        exact: true,
        component: ProductPage
    },
    {
        path: RoutesName.ADMIN,
        exact: true,
        component: Admin
    },
]