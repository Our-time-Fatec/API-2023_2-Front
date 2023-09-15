import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate, useParams } from 'react-router-dom';
import auth from '../../services/auth';
import { useEffect, useState } from 'react';
import DecodedToken from '../../interfaces/DecodedToken';
import jwtDecode from 'jwt-decode';
import { FaUser } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';

function NavBar() {
    const isAuthenticated = !!localStorage.getItem('user');
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('user');

        if (token) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token);
                setUserId(decodedToken.userId);
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
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand className="link-no-style">Bicikreta</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
                                    </span>
                                } id="collapsible-nav-dropdown">
                                    <NavDropdown.Item as={Link} to={`/perfil/${userId}`} className="link-no-style ">Meu Perfil<FaUser className='mx-2' /></NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Deslogar<HiOutlineLogout className='mx-2'/></NavDropdown.Item>
                                    
                                </NavDropdown>
                            </>
                        ) : (
                            <Nav.Link as={Link} to={"/login"} className="link-no-style">Login</Nav.Link>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
