import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import auth from "../services/auth";
import Inicio from "../pages/Inicio";
import EditarUser from "../pages/User/Editar";
import PerfilUser from "../pages/User/Perfil";
import RegisterPage from "../pages/User/Cadastro";


function AppRouter() {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <auth.AuthMiddleware>
                <Routes>
                    <Route path="/" element={isAuthenticated ? (<Navigate to="/inicio" />) : (<Home />)} />
                    <Route path="/Inicio" element={<Inicio />} />
                    <Route path="/login" element={isAuthenticated ? (<Navigate to="/inicio" />) : (<LoginPage />)} />
                    <Route path="/register" element={isAuthenticated ? (<Navigate to="/inicio" />) : (<RegisterPage />)} />
                    <Route path="/perfil/:id" element={isAuthenticated ? (<PerfilUser />) : (<Navigate to="/login" />)} />
                    <Route path="/update/:id" element={isAuthenticated ? (<EditarUser />) : (<Navigate to="/login" />)} />
                </Routes>
            </auth.AuthMiddleware>
        </Router>
    )
}

export default AppRouter;