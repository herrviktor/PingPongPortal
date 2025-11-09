import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { IFormErrors, IUser } from "../interfaces/interfaces";
import CInput from "../components/Input";
import CButton from "../components/Button";
import FormField from "../components/formField";
import { sanitize, handleBlur } from "../utils/validators";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {

    const { login, register } = useAuth();

    const [loginData, setLoginData] = useState<{ email: string; password: string }>({
        email: "",
        password: "",
    });

    const [registerData, setRegisterData] = useState<IUser>({
        username: "",
        email: "",
        password: "",
    });

    const [loginErrors, setLoginErrors] = useState<IFormErrors>({});
    const [registerErrors, setRegisterErrors] = useState<IFormErrors>({});
    const navigate = useNavigate();

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: sanitize(value) }));
    };

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({ ...prev, [name]: sanitize(value) }));
    };

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const response = await login(loginData.email, loginData.password);
            console.log("Inloggad", response);
            setLoginErrors({});
            navigate("/");
        } catch (error: unknown) {
            const errors: IFormErrors = {};

            if (error instanceof Error) {
                if (error.message.includes("3-20")) {
                    errors.username = error.message;
                } else {
                    errors.general = error.message;
                }
            } else {
                errors.general = "Ett okänt fel uppstod";
            }
            setLoginErrors(errors);
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const response = await register(registerData);
            console.log("Registrerad", response);
            setRegisterErrors({});
            navigate("/");
        } catch (error: unknown) {
            const errors: IFormErrors = {};

            if (error instanceof Error) {
                if (error.message.includes("3-20")) {
                    errors.username = error.message;
                } else if (error.message.includes("e-post")) {
                    errors.email = error.message;
                } else if (error.message.includes("Lösenordet")) {
                    errors.password = error.message;
                } else {
                    errors.general = error.message;
                }
            } else {
                errors.general = "Ett okänt fel uppstod";
            }
            setRegisterErrors(errors);
        }
    };



    return (
        <div className="gFlexA flex-col md:flex-row gap-5 py-5 min-h-118">
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
                            onBlur={handleBlur("email", setLoginErrors)}
                        />
                        {loginErrors.email && (
                            <p className="error-text">{loginErrors.email}</p>
                        )}
                    </FormField>
                    <FormField id="login-password" label="Lösenord:">
                        <CInput
                            type="password"
                            id="login-password"
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            onBlur={handleBlur("password", setLoginErrors)}
                        />
                        {loginErrors.password && (
                            <p className="error-text">{loginErrors.password}</p>
                        )}
                    </FormField>
                    <CButton type="submit">Logga In</CButton>
                </form>
                {loginErrors &&
                    <p className="error-text">{loginErrors.general}</p>
                }
            </div>
            <div>
                <p className="text-xl md:text-2xl xl:text-3xl">
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
                            placeholder="Ex Viktor"
                            value={registerData.username}
                            onChange={handleRegisterChange}
                            onBlur={handleBlur("username", setRegisterErrors)}
                        />
                        {registerErrors.username && (
                            <p className="error-text">{registerErrors.username}</p>
                        )}
                    </FormField>
                    <FormField id="register-email" label="E-post:">
                        <CInput
                            type="email"
                            id="register-email"
                            name="email"
                            placeholder="Ex mail@test.com"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                            onBlur={handleBlur("email", setRegisterErrors)}
                        />
                        {registerErrors.email && (
                            <p className="error-text">{registerErrors.email}</p>
                        )}
                    </FormField>
                    <FormField id="register-password" label="Lösenord:">
                        <CInput
                            type="password"
                            id="register-password"
                            name="password"
                            placeholder="Minst 8 tecken"
                            value={registerData.password}
                            onChange={handleRegisterChange}
                            onBlur={handleBlur("password", setRegisterErrors)}
                        />
                        {registerErrors.password && (
                            <p className="error-text">{registerErrors.password}</p>
                        )}
                    </FormField>
                    <CButton type="submit">Registrera</CButton>
                </form>
                {registerErrors &&
                    <p className="error-text">{registerErrors.general}</p>
                }
            </div>
        </div>
    )
}

export default Auth;
