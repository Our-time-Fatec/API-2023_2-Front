import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div className="Home">
            <h1>Já tem uma conta? <Link to={"/login"}>Logar</Link></h1>
            <h1>Registre-se Aqui: <Link to={"/login"}>Registrar-se</Link></h1>
        </div>
    )
}