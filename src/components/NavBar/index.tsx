import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../services/auth';
import { useEffect, useState } from 'react';
import DecodedToken from '../../interfaces/DecodedToken';
import jwtDecode from 'jwt-decode';
import { FaUser } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';

interface CardNav {
    isLogin?: boolean;
}

function NavBar({ isLogin }: CardNav) {
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (token && username) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token);
                setUserId(decodedToken.userId);
                setUsername(JSON.parse(username));
            } catch (error) {
                console.error('Erro ao decodificar o token JWT:', error);
            }
        }
    }, []);

    const handleLogout = () => {
        auth.logout();
        navigate(0)
    };

    return (
        <Navbar collapseOnSelect expand={!isLogin ? "lg" : undefined} className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand className="link-no-style"><img src="https://api2023awsbucket.s3.amazonaws.com/BiCICRETA.png" style={{ width: '110px' }} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {
                    !isLogin ? (
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to={"/inicio"} className="link-no-style">Inicio</Nav.Link>
                                {/* {isAuthenticated && <Nav.Link as={Link} to={"/"} className="link-no-style">Locações</Nav.Link>} */}
                            </Nav>
                            <Nav>
                                {isAuthenticated ? (
                                    <>
                                        <NavDropdown title={
                                            <span className='d-flex-row align-items-center'>
                                                <FaUser className='me-1' />
                                                <span>{username ? username : ""}</span>
                                            </span>
                                        } id="collapsible-nav-dropdown">
                                            <NavDropdown.Item as={Link} to={`/perfil/${userId}`} className="link-no-style ">Meu Perfil<FaUser className='mx-2' /></NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={handleLogout}>Sair<HiOutlineLogout className='mx-2' /></NavDropdown.Item>

                                        </NavDropdown>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link as={Link} to={"/"} className="link-no-style">Logar</Nav.Link>
                                    </>
                                )}

                            </Nav>
                        </Navbar.Collapse>
                    ) :
                        ""
                }

            </Container>
        </Navbar>
    );
}

export default NavBar;
