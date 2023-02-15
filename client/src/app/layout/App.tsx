import CssBaseline from '@mui/material/CssBaseline';
import Header from "./Header";
import { Container, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";
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
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}


export default App;
