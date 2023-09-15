import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import ProtectedPage from "../pages/ProtectedPage";
import UpdatePage from "../pages/Update";
import auth from "../services/auth";


function AppRouter() {
    const isAuthenticated = !!localStorage.getItem('user');

    return (
        <Router>
            <auth.AuthMiddleware>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={isAuthenticated ? (<Navigate to="/protected" />) : (<LoginPage />)} />
                    <Route path="/protected" element={isAuthenticated ? (<ProtectedPage />) : (<Navigate to="/login" />)} />
                    <Route path="/update/:id" element={isAuthenticated ? (<UpdatePage />) : (<Navigate to="/login" />)} />
                </Routes>
            </auth.AuthMiddleware>
        </Router>
    )
}

export default AppRouter;