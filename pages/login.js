import { Form, Alert, Button } from "react-bootstrap";
import { useState } from 'react';
import { authenticateUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await authenticateUser(username, password);
            await updateAtoms();
            router.push('/favourites');
        } catch (error) {
            setWarning(error.message);
        }
    }
    return (
        <>

            <h1 className="mt-4 mb-4 text-white lightfont" style={{ textAlign: 'center' }}>Log In</h1>

            <hr />
            <br />
            <div className="container-sm" style={{ width: 600 }}>
                <Form onSubmit={handleSubmit} className='text-white'>
                    <Form.Group className="mb-3">
                        <Form.Label>Username:</Form.Label><Form.Control type="text" value={username} id="userName" name="userName" onChange={e => setUsername(e.target.value)} required />
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <div className="input-group">
                            <Form.Control type={showPassword ? "text" : "password"} value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} required />
                            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)} style={{ backgroundColor: 'white', border: 'none' }}>
                                {showPassword ? <BsEyeSlash color="black" /> : <BsEye color="black" />} {/* Toggle eye icon based on showPassword state */}
                            </Button>
                        </div>
                    </Form.Group>

                    {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
                    <br />
                    <div className="text-center">
                        <Button variant="primary" type="submit">Login</Button>
                    </div>
                </Form>
            </div>
        </>
    );
}