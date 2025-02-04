import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function Login2() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [redirected, setRedirected] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') && !redirected) {
            setRedirected(true);
            navigate('/paginalista', { replace: true });
        }
    }, [navigate, redirected]);

    if (localStorage.getItem('token')) {
        return null;
    }

    const handleLogin = async () => {
        const response = await fetch('/interfaceswebtrab/restapi/autenticacao.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setError('');
            navigate('/paginalista', { replace: true });
        } else {
            setError('Credenciais inválidas');
        }
    };

    return (
        <>
            <div className="container mt-5 center">
                <h2 className="text-center">Login</h2>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control mb-3 w-100"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control mb-3 w-100"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>Login</button>
                        {error && <p className="text-danger mt-3">{error}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}


export default Login2;


