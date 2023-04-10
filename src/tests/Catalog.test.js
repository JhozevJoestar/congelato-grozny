import {render, screen} from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../store"
import Admin from './../pages/Admin';

test("render catalog", () => {
    render(<Provider store={store}><MemoryRouter><Admin /></MemoryRouter></Provider>)
    const inputSearch = screen.getByPlaceholderText("Имя")
    expect(inputSearch).toBeInTheDocument();
})