import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/AppToolbar/AppToolbar/AppToolbar.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import {Route, Routes } from "react-router-dom";
import Cocktails from "./features/cocktails/Cocktails.tsx";
import NewCocktail from "./features/cocktails/NewCocktail.tsx";
import {useAppSelector} from "./app/hooks.ts";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import {selectUser} from "./features/users/usersSlice.ts";
import WarningMessage from "./features/WarningMessage/WarningMessages.tsx";

const App = () => {
    const user = useAppSelector(selectUser);
return(
    <>
        <CssBaseline/>
        <header>
            <AppToolbar/>
        </header>
        <Container>
            <WarningMessage/>
            <Routes>
                <Route path="/" element={<Cocktails/>}/>
                <Route path="/new-cocktail"  element={(
                    <ProtectedRoute isAllowed={!!user}>
                        <NewCocktail/>
                    </ProtectedRoute>)}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<h1>Not found</h1>}/>
            </Routes>
        </Container>

    </>
    )

};

export default App
