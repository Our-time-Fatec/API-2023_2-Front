import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function Home() {
    return (
        <div className="Home">
            <header>
                <NavBar />
            </header>
            <main>
                <h1>Já tem uma conta? <Link to={"/login"}>Logar</Link></h1>
                <h1>Registre-se Aqui: <Link to={"/login"}>Registrar-se</Link></h1>
            </main>
        </div>
    )
}