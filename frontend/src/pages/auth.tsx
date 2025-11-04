import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { IFormErrors, IUser } from "../interfaces/interfaces";
import CInput from "../components/Input";
import CButton from "../components/Button";
import FormField from "../components/formField";
import { sanitize, validateEmail, validatePassword, validateUsername } from "../utils/validators";
import { useNavigate } from "react-router-dom";

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
    const newErrors: IFormErrors = {};
    if (!validateEmail(loginData.email)) newErrors.email = "Ogiltig e-postadress";
    if (!loginData.password || loginData.password.length < 1) newErrors.password = "Ange lösenord";
    if (Object.keys(newErrors).length > 0) {
      setLoginErrors(newErrors);
      return;
    }
    try {
      const response = await login(loginData.email, loginData.password);
      console.log("Inloggad", response);
      setLoginErrors({});
      navigate("/");
    } catch (error) {
      console.error("Login misslyckades", error);
    }
  };

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const newErrors: IFormErrors = {};
        if (!validateUsername(registerData.username))
        newErrors.username = "3–20 tecken, endast bokstäver, siffror eller _";
        if (!validateEmail(registerData.email))
        newErrors.email = "Ogiltig e-postadress";
        if (!validatePassword(registerData.password))
        newErrors.password = "Lösenordet måste vara 8–30 tecken";

        if (Object.keys(newErrors).length > 0) {
        setRegisterErrors(newErrors);
        return;
        }

        try {
        const response = await register(registerData);
        console.log("Registrerad", response);
        setRegisterErrors({});
        navigate("/");
        } catch (error) {
        console.error("Registrering misslyckades", error);
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
                        />
                        {loginErrors.email && (
                            <p className="text-red-500 text-sm">{loginErrors.email}</p>
                        )}
                    </FormField>
                    <FormField id="login-password" label="Lösenord:">
                        <CInput
                            type="password"
                            id="login-password"
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                        />
                        {loginErrors.password && (
                            <p className="text-red-500 text-sm">{loginErrors.password}</p>
                        )}
                    </FormField>
                    <CButton type="submit">Logga In</CButton>
                </form>
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
                            value={registerData.username}
                            onChange={handleRegisterChange}
                        />
                        {registerErrors.username && (
                            <p className="text-red-500 text-sm">{registerErrors.username}</p>
                        )}
                    </FormField>
                    <FormField id="register-email" label="E-post:">
                        <CInput
                            type="email"
                            id="register-email"
                            name="email"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                        />
                        {registerErrors.email && (
                            <p className="text-red-500 text-sm">{registerErrors.email}</p>
                        )}
                    </FormField>
                    <FormField id="register-password" label="Lösenord:">
                        <CInput
                            type="password"
                            id="register-password"
                            name="password"
                            value={registerData.password}
                            onChange={handleRegisterChange}
                        />
                        {registerErrors.password && (
                            <p className="text-red-500 text-sm">{registerErrors.password}</p>
                        )}
                    </FormField>
                    <CButton type="submit">Registrera</CButton>
                </form>
            </div>
        </div>
    )
}

export default Auth;
