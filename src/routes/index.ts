import  React  from 'react';
import Catalog from './../pages/Catalog';
import Basket from './../pages/Basket';

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
} 

export enum RoutesName {
    CATALOG = "/",
    BASKET = "/basket"
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
]