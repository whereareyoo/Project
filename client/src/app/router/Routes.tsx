import { createBrowserRouter } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import BasketPage from "../../features/basket/BasketPage";
import Catalog from "../../features/catalog/catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/checkouts/CheckoutPage";
import CheckoutWrapper from "../../features/checkouts/CheckoutWrapper";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Orders from "../../features/orders/Orders";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: 'checkout', element: <CheckoutWrapper />},
                {path: 'orders', element: <Orders />},
            ]},
            {path: '/', element: <HomePage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'basket', element: <BasketPage />},
            
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />}
        ]   
    }
])