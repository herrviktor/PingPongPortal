import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { IUser } from "../interfaces/interfaces";
import CInput from "../components/Input";
import CButton from "../components/Button";

const Auth: React.FC = () => {
    
    const { login, register } = useAuth();

    const [loginData, setLoginData] = useState<{email: string; password: string}>({
        email: "",
        password: "",
    });

    const [registerData, setRegisterData] = useState<IUser>({
        username: "",
        email: "",
        password: "",
    });

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await login(loginData.email, loginData.password);
            console.log("Inloggad", response);
        } catch (error) {
            console.error("Login misslyckades", error);
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await register(registerData);
            console.log("Registrerad", response);
        } catch (error) {
            console.error("Registrering misslyckades", error);
        }
    };

    
    return (
        <>
            <div>
                <h2>Logga In</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div>
                        <label>E-post:</label>
                        <CInput
                            type="email"
                            id="login-email"
                            name="email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                        />
                    </div>
                    <div>
                        <label>Lösenord:</label>
                        <CInput
                            type="password"
                            id="login-password"
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                        />
                    </div>
                    <CButton type="submit">Logga In</CButton>
                </form>
            </div>
            <div>
                <p>
                    Eller
                </p>
            </div>
            <div>
                <h2>Registrera</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <div>
                        <label>Användarnamn:</label>
                        <CInput
                            type="text"
                            id="register-username"
                            name="username"
                            value={registerData.username}
                            onChange={handleRegisterChange}
                        />
                    </div>
                    <div>
                        <label>E-post:</label>
                        <CInput
                            type="email"
                            id="register-email"
                            name="email"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                        />
                    </div>
                    <div>
                        <label>Lösenord:</label>
                        <CInput
                            type="password"
                            id="register-password"
                            name="password"
                            value={registerData.password}
                            onChange={handleRegisterChange}
                        />
                    </div>
                    <CButton type="submit">Registrera</CButton>
                </form>
            </div>
        </>
    )
}

export default Auth;