import {render, screen} from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../store"
import App from "../App";
import userEvent from '@testing-library/user-event';

describe("TEST APP", () => {
    test("add to cart", async () => {
        render(<Provider store={store}><MemoryRouter><App /></MemoryRouter></Provider>)
        const counterButton = screen.queryByTestId("Крем для рук Калина с Алоэ")
        expect(screen.getByTestId("counter")).toContainHTML("0");
        await userEvent.click(counterButton)
        expect(screen.getByTestId("counter")).toContainHTML("1");
    })
})