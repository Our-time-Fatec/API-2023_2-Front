import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login";
import auth from "../services/auth";
import Inicio from "../pages/Inicio";
import EditarUser from "../pages/User/Editar";
import PerfilUser from "../pages/User/Perfil";
import RegisterPage from "../pages/User/Cadastro";
import CadastrarBikePage from "../pages/Bicicleta/Cadastrar";
import EditarBikePage from "../pages/Bicicleta/Editar";
import VisualizarBike from "../pages/Bicicleta/Visualizar";
import SolicitacoesEnviadas from "../pages/Solicitacoes/Enviadas";
import SolicitacoesRecebidas from "../pages/Solicitacoes/Recebidas"
import LocacoesAlugadas from "../pages/Locacoes/Alugadas";
import LocacoesLocadas from "../pages/Locacoes/Locadas";


function AppRouter() {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <auth.AuthMiddleware>
                <Routes>
                    <Route path="/" element={isAuthenticated ? (<Navigate to="/inicio" />) : (<LoginPage />)} />
                    <Route path="/Inicio" element={<Inicio />} />
                    <Route path="/register" element={isAuthenticated ? (<Navigate to="/inicio" />) : (<RegisterPage />)} />
                    <Route path="/perfil/:id" element={isAuthenticated ? (<PerfilUser />) : (<Navigate to="/" />)} />
                    <Route path="/update/:id" element={isAuthenticated ? (<EditarUser />) : (<Navigate to="/" />)} />
                    <Route path="/bike/cadastrar" element={isAuthenticated ? (<CadastrarBikePage />) : (<Navigate to="/" />)} />
                    <Route path="/bike/:id" element={<VisualizarBike />} />
                    <Route path="/SolicitacoesEnviadas" element={isAuthenticated ? (<SolicitacoesEnviadas />) : (<Navigate to="/" />)} />
                    <Route path="/SolicitacoesRecebidas" element={isAuthenticated ? (<SolicitacoesRecebidas />) : (<Navigate to="/" />)} />
                    <Route path="/LocacoesAlugadas" element={isAuthenticated ? (<LocacoesAlugadas />) : (<Navigate to="/" />)} />
                    <Route path="/LocacoesLocadas" element={isAuthenticated ? (<LocacoesLocadas />) : (<Navigate to="/" />)} />
                    <Route path="/perfil/:donoId/bike/editar/:id" element={isAuthenticated ? (<EditarBikePage />) : (<Navigate to="/" />)} />
                </Routes>
            </auth.AuthMiddleware>
        </Router>
    )
}

export default AppRouter;