const Auth: React.FC = () => {
    return (
        <>
            <div>
                <h2>Logga In</h2>
                <form>
                    <div>
                    <label>E-post:</label>
                    <input type="email" id="login-email" name="email" />
                    </div>
                    <div>
                    <label>Lösenord:</label>
                    <input type="password" id="login-password" name="password" />
                    </div>
                    <button type="submit">Logga In</button>
                </form>
            </div>
            <div>
                <p>
                    Eller
                </p>
            </div>
            <div>
                <h2>Registrera</h2>
                <form>
                    <div>
                    <label>Användarnamn:</label>
                    <input type="text" id="register-username" name="username" />
                    </div>
                    <div>
                    <label>E-post:</label>
                    <input type="email" id="register-email" name="email" />
                    </div>
                    <div>
                    <label>Lösenord:</label>
                    <input type="password" id="register-password" name="password" />
                    </div>
                    <button type="submit">Registrera</button>
                </form>
            </div>
        </>
    )
}

export default Auth;