import LoginForm from './LoginForm'
import './login.css'

export default function LoginPage(){
    return(
        <div className="login-page">
            <div className="body__logo">
                <img src = '/IC-logo-black.svg' alt="Логотип компании Волна" className = "logo" />
            </div>
            <LoginForm />
        </div>
    )
}