import { useState } from "react"
import './login.css'

export default function LoginForm(){
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!login.trim() || !password.trim()){
            setError(true)
            return
        }
    
        setError(false)
    }

    return (
        <form className="body__frame" onSubmit={handleSubmit}>
            <h1 className="title">Вход в IC Portal</h1>

            <div className="filed__login">
                <label 
                    htmlFor="login" 
                    className={`login__label ${login ? "label-visible" : ""}`}
                >
                    Логин
                </label>

                <input 
                    id = "login"
                    type = "text" 
                    className={`login ${login ? "input-has-value" : ""} ${error ? "input-error" : ""}`}
                    placeholder="Логин" 
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />

                {login && (
                    <button 
                        type="button" 
                        className="close-btn" 
                        aria-label="Очитить поле логин"
                        onClick={() => setLogin("")}
                    >
                        <img 
                            src = "/Close.svg" 
                            alt="Очитить поле"
                            className="close__img close-visible" 
                        />
                    </button>
                )}
            </div>
            
            <div className="filed__password">
                <label 
                    htmlFor="password" 
                    className = {`password__label ${password ? "label-visible" : ""}`}
                >
                    Введите пароль
                </label>
                <input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className = {`password ${password ? "input-has-value" : ""} ${error ? "input-error" : ""}`}
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    type="button" 
                    aria-label="Показать пароль"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    <img 
                        src = "/Stroke.svg" 
                        alt={showPassword ? `Скрыть пароль` : `Показать пароль`} 
                        className="stroke__img" 
                    />
                </button>
            </div>
            {error && <p className="error"> Неверный логин или пароль </p> }

            <button 
                type="submit" 
                className={`button ${login && password ? "button-active" : ""}`}
            >
                Войти
            </button>
        </form>
    )
}