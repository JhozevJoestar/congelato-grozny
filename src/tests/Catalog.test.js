import {render, screen, fireEvent} from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../store"
import Admin from './../pages/Admin';

describe("TEST APP", () => {
    test("render catalog", () => {
        render(<Provider store={store}><MemoryRouter><Admin /></MemoryRouter></Provider>)
        const text = screen.getByText(/на главную/i)
        const inputSearch = screen.getByPlaceholderText("Имя")
        expect(text).toBeInTheDocument();
        expect(inputSearch).toBeInTheDocument();
    })

    test("input work", () => {
        render(<Provider store={store}><MemoryRouter><Admin /></MemoryRouter></Provider>)
        const input = screen.getByPlaceholderText("Имя")
        expect(screen.getByPlaceholderText("Имя")).toContainHTML("")
        fireEvent.input(input, {
            target: {value: "test"}
        })
        expect(screen.getByPlaceholderText("Имя")).toContainHTML("test")
    })
})