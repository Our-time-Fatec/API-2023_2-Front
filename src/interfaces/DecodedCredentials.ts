interface DecodedCredentials {
    sub: string; // sub representa o Google ID
    picture: string; // picture representa a imagem do Google
    name: string; // name representa o nome do usuário
    email: string; // email representa o email do usuário
}

export default DecodedCredentials;