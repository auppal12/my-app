import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '@/lib/authenticate';
import { Form, Button, Alert } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const [showPassword2, setShowPassword2] = useState(false); // State for toggling password2 visibility
    const [warning, setWarning] = useState('');
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await registerUser(username, password, password2);
            router.push('/login');
        } catch (error) {
            setWarning(error.message);
        }
    }

    return (
        <div>
            <h1 className="mt-4 mb-4 text-white" style={{ textAlign: 'center' }}>Sign Up</h1>

            <hr />
            <br />
            <div className="container-sm">
                <form onSubmit={handleSubmit} className='text-white'>
                    <Form.Group className="mb-3">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <div className="input-group">
                            <Form.Control type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)} style={{ backgroundColor: 'white', border: "none" }}>
                                {showPassword ? <BsEyeSlash color="black" /> : <BsEye color="black" />}
                            </Button>
                        </div>
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password:</Form.Label>
                        <div className="input-group">
                            <Form.Control type={showPassword2 ? "text" : "password"} value={password2} onChange={(e) => setPassword2(e.target.value)} />
                            <Button variant="outline-secondary" onClick={() => setShowPassword2(!showPassword2)} style={{ backgroundColor: 'white', border: "none" }}>
                                {showPassword2 ? <BsEyeSlash color="black" /> : <BsEye color="black" />}
                            </Button>
                        </div>
                    </Form.Group>

                    {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
                    <br />
                    <div className='text-center'>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}