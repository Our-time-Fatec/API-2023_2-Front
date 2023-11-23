import { Button } from "react-bootstrap";
import DiaouHora from "../../Enums/DiaouHora";
import Bicicleta from "../../interfaces/Bicicleta";
import User from "../../interfaces/User";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

interface SoliCard {
    idSolicitacao: number;
    idLocatario: number;
    idBicicleta: number;
    isRespondido?: boolean;
    isAceito?: boolean;
    DiaouHora?: DiaouHora;
    bicicleta?: Bicicleta;
    locatario?: User;
    solicitacoesRecebidas?: boolean;
}

function SolicitacaoCard({ idSolicitacao, idLocatario, idBicicleta, isRespondido, isAceito, DiaouHora, locatario, bicicleta, solicitacoesRecebidas }: SoliCard) {
    const tokenJson = localStorage.getItem('token');
    const navigate = useNavigate();

    const acceptSolicitacao = async (idSolicitacao: number) => {
        if (tokenJson) {
            const tokenObject = JSON.parse(tokenJson);
            const headers = {
                Authorization: `${tokenObject}`,
            };

            await api.put(`/solicitacao/${idSolicitacao}/aceitar`, idSolicitacao, { headers })
                .then((response) => {
                    alert(response.data.message)
                    navigate(0)
                })
                .catch((error) => {
                    alert(error.response.data.error)
                })

        } else {
            alert("Você precisa fazer login para fazer uma solicitação.");
        }
    }

    const rejectSolicitacao = async (idSolicitacao: number) => {
        if (tokenJson) {
            const tokenObject = JSON.parse(tokenJson);
            const headers = {
                Authorization: `${tokenObject}`,
            };

            await api.put(`/solicitacao/${idSolicitacao}/rejeitar`, idSolicitacao, { headers })
                .then((response) => {
                    console.log(response)
                    alert(response.data.message)
                    navigate(0)
                })
                .catch((error) => {
                    console.log(error)
                    alert(error.response.data.error)
                })

        } else {
            alert("Você precisa fazer login para fazer uma solicitação.");
        }
    }

    return (
        <div className="card-bike">
            <div className="card-title roboto-negrito text-black">Solicitação: {idSolicitacao}</div>
            {!isRespondido ?
                <p className="text-green">Aguardando resposta </p>
                :
                <p className={isAceito ? 'text-green' : 'text-red'}>{isAceito ? "Solicitação Aceita" : "Solicitação Rejeitada"}</p>
            }
            {solicitacoesRecebidas ?
                <span className="text-black roboto-regular">Locatário: {locatario?.username}</span>
                :
                <span className="text-black roboto-regular">Dono: {bicicleta?.dono?.username}</span>
            }<br></br>
            <span className="text-black roboto-regular">Bicicleta: {bicicleta?.marca?.nome} - {bicicleta?.modalidade?.nome}</span><br></br>
            <span className="text-black roboto-regular">Tipo De Solicitacao: {DiaouHora}</span><br></br>
            {
                solicitacoesRecebidas ?
                    <div className="d-flex gap-2">
                        <Button variant="primary" className='mt-2' onClick={() => acceptSolicitacao(idSolicitacao)}>
                            Aceitar
                        </Button>
                        <Button variant="danger" className='mt-2' onClick={() => rejectSolicitacao(idSolicitacao)}>
                            Rejeitar
                        </Button>
                    </div>
                    :
                    ""
            }

        </div>
    );
}

export default SolicitacaoCard