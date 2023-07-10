import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';
import Explore from './pages/Explore';
import Content from './pages/Content';
import Layout from './layouts/Layout';
import RequireLogin from './components/RequireLogin';
import { ThemeProvider, createTheme } from '@mui/material';
import configTheme from './configs/config.theme';
import translation from "./components/translation";

function App() {
  const theme = createTheme(configTheme);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/user" element={
                <RequireLogin authStatus={false}>
                  <User />
                </RequireLogin>
              } />
              <Route path="/content" element={
                <RequireLogin authStatus={true}>
                  <Content />
                </RequireLogin>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;