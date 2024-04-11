import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import { NavDropdown } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate'; // Import removeToken function

export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const token = readToken();

    async function handleSearch(e) {
        e.preventDefault();
        router.push(`/artwork?title=true&q=${searchField}`);
        setSearchField('');
        setIsExpanded(false);

        setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    };

    function handleToggle() {
        setIsExpanded(!isExpanded);
    };

    function handleCollapse() {
        setIsExpanded(false);
    }

    function logout() {
        setIsExpanded(false); // Collapse the menu
        removeToken(); // Remove the token
        router.push('/login'); // Redirect to the login page
    }

    return (
        <>
            <Navbar expand="lg" className="fixed-top py-3 background" data-bs-theme="dark" expanded={isExpanded}>
                <Container fluid>
                    <Navbar.Brand href="/" className='shadow'>Art Explorer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" onClick={handleToggle} />
                    <Navbar.Collapse id="navbarScroll">

                        <Nav
                            className="me-auto my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/"} onClick={handleCollapse}>Home</Nav.Link>
                            </Link>
                            {token && (
                                <Link href="/search" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/search"} onClick={handleCollapse}>Advance Search</Nav.Link>
                                </Link>
                            )}
                        </Nav>

                        {token && (
                            <>
                                <Nav >
                                    <NavDropdown title={token.userName} id="basic-nav-dropdown" align={{ lg: 'end' }} >
                                        <Link href="/favourites" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === "/favourites"} onClick={handleCollapse}>Favourites</NavDropdown.Item>
                                        </Link>
                                        <Link href="/history" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === "/history"} onClick={handleCollapse}>Search History</NavDropdown.Item>
                                        </Link>
                                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Form className="d-flex" onSubmit={handleSearch}>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        value={searchField}
                                        onChange={(e) => setSearchField(e.target.value)}
                                    />
                                    <Button className="btn-primary" type="submit">Search</Button>
                                </Form>
                            </>
                        )}
                        {!token && (
                            <Nav>
                                <Link href="/register" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/register"} onClick={handleCollapse}>Register</Nav.Link>
                                </Link>
                                <Link href="/login" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/login"} onClick={handleCollapse}>Login</Nav.Link>
                                </Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
};
