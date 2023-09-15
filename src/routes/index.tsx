import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import auth from "../services/auth";
import Inicio from "../pages/Inicio";
import EditarUser from "../pages/Editar";
import PerfilUser from "../pages/Perfil";


function AppRouter() {
    const isAuthenticated = !!localStorage.getItem('user');

    return (
        <Router>
            <auth.AuthMiddleware>
                <Routes>
                    <Route path="/" element={isAuthenticated ? (<Navigate to="/inicio" />) : (<Home />)}/>
                    <Route path="/Inicio" element={<Inicio/>}/>
                    <Route path="/login" element={isAuthenticated ? (<Navigate to="/inicio" />) : (<LoginPage />)} />
                    <Route path="/perfil/:id" element={isAuthenticated ? (<PerfilUser />) : (<Navigate to="/login" />)} />
                    <Route path="/update/:id" element={isAuthenticated ? (<EditarUser />) : (<Navigate to="/login" />)} />
                </Routes>
            </auth.AuthMiddleware>
        </Router>
    )
}

export default AppRouter;