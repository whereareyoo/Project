import Catalog from "../../features/catalog/catalog";
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./Header";
import { Container, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import { NavLink } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";
import CheckoutPage from "../../features/checkouts/CheckoutPage";
import { useAppDispatch } from "../store/ConfigureStore";
import { setBasket } from "../../features/basket/BasketSlice";



function App() 
{
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => 
  {
    const buyerId = getCookie('buyerId');
    if (buyerId)
    {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }
    else
    {
      setLoading(false);
    }
  }, [dispatch])


  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === 'light'?'#eaeaea': '#121212'
      }
  }
})

function handleThemeChange()
{
  setDarkMode(!darkMode);
}

if (loading) return <LoadingComponents message='Initializing app...'/>
  
  return (
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/catalog' component={Catalog} />
          <Route exact path='/catalog/:id' component={ProductDetails} />
          <Route exact path='/about' component={AboutPage} />
          <Route exact path='/contact' component={ContactPage} />
          <Route path = '/basket' component={BasketPage} />
          <Route path = '/checkout' component={CheckoutPage} />
        </Container>
      </ThemeProvider>
  );
}


export default App;
