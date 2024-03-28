import {CssBaseline} from "@mui/material";
import AppToolbar from "./components/AppToolbar/AppToolbar/AppToolbar.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import {Route, Routes } from "react-router-dom";
import Cocktails from "./features/cocktails/Cocktails.tsx";

const App = () => (
    <>
        <CssBaseline/>
        <header>
            <AppToolbar/>
        </header>
        <Routes>
            <Route path="/"  element={<Cocktails/>}/>
            <Route path="/register"  element={<Register/>}/>
            <Route path="/login"  element={<Login/>}/>
            <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
    </>
);

export default App
