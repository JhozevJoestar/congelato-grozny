import {render, screen} from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../store"
import App from './../App';
import userEvent from "@testing-library/user-event";

describe("TEST APP", () => {
    test("render catalog", async () => {
        render(<Provider store={store}><MemoryRouter><App /></MemoryRouter></Provider>)
        const catalogLink = screen.queryByTestId("catalog")
        const basketLink = screen.getByTestId("basket")
        await userEvent.click(basketLink)
        expect(screen.getByTestId("basket_page")).toBeInTheDocument();
        await userEvent.click(catalogLink)
        expect(screen.getByTestId("catalog_page")).toBeInTheDocument();
    })
})