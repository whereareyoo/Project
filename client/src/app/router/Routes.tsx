import { createBrowserRouter } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import BasketPage from "../../features/basket/BasketPage";
import Catalog from "../../features/catalog/catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/checkouts/CheckoutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '/', element: <HomePage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'basket', element: <BasketPage />},
            {path: 'checkout', element: <CheckoutPage />}
        ]   
    }
])