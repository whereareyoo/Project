import Catalog from "../../features/catalog/catalog";
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./Header";
import { Container, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import { NavLink } from 'react-router-dom';



function App() 
{
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
  
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/catalog' component={Catalog} />
          <Route exact path='/catalog/:id' component={ProductDetails} />
          <Route exact path='/about' component={AboutPage} />
          <Route exact path='/contact' component={ContactPage} />
        </Container>
      </ThemeProvider>
  );
}


export default App;
