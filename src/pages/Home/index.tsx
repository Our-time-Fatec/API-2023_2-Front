import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function Home() {
    return (
        <div className="Home">

                <NavBar />
            <main className="main-container">
                <div className="mt-5 d-flex-column text-center">
                    <h1>Bem vindo ao site Bicicreta</h1>
                    <p>Aqui você pode alugar suas bicicletas ou se você não tem uma bicicleta e precisa de uma locação rapida, prática e segura, aqui é o site certo!</p>
                </div>
            </main>
        </div>
    )
}