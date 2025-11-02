import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { IUser } from "../interfaces/interfaces";
import CInput from "../components/Input";
import CButton from "../components/Button";
import FormField from "../components/formField";

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
        <div className="gFlexA min-h-118">
            <div className="auth-card">
                <h2 className="main-h3">Logga In</h2>
                <form onSubmit={handleLoginSubmit}>
                    <FormField id="login-email" label="E-Post:">
                        <CInput
                            type="email"
                            id="login-email"
                            name="email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                        />
                    </FormField>
                    <FormField id="login-password" label="Lösenord:">
                        <CInput
                            type="password"
                            id="login-password"
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                        />
                    </FormField>
                    <CButton type="submit">Logga In</CButton>
                </form>
            </div>
            <div>
                <p className="text-2xl">
                    Eller
                </p>
            </div>
            <div className="auth-card">
                <h2 className="main-h3">Registrera</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <FormField id="register-username" label="Användarnamn:">
                        <CInput
                            type="text"
                            id="register-username"
                            name="username"
                            value={registerData.username}
                            onChange={handleRegisterChange}
                        />
                    </FormField>
                    <FormField id="register-email" label="E-post:">
                        <CInput
                            type="email"
                            id="register-email"
                            name="email"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                        />
                    </FormField>
                    <FormField id="register-password" label="Lösenord:">
                        <CInput
                            type="password"
                            id="register-password"
                            name="password"
                            value={registerData.password}
                            onChange={handleRegisterChange}
                        />
                    </FormField>
                    <CButton type="submit">Registrera</CButton>
                </form>
            </div>
        </div>
    )
}

export default Auth;