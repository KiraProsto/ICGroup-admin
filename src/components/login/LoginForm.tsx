import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import '../../pages/login/login.css';
import {
  setLogin,
  setPassword,
  toggleShowPassword,
  setError,
  clearLogin,
} from '@/features/auth/authSlice';
import { useLoginMutation } from '@/features/auth/authApi';

export default function LoginForm() {
  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.auth.login);
  const password = useSelector((state: RootState) => state.auth.password);
  const showPassword = useSelector(
    (state: RootState) => state.auth.showPassword,
  );
  const error = useSelector((state: RootState) => state.auth.error);
  const [loginRequest] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!login.trim() || !password.trim()) {
      dispatch(setError(true));
      return;
    }

    dispatch(setError(false));

    try {
      await loginRequest({ login, password }).unwrap();
      console.log('Успешный вход');
    } catch {
      dispatch(setError(true));
    }
  };

  return (
    <form className="body__frame" onSubmit={handleSubmit}>
      <h1 className="title">Вход в IC Portal</h1>

      <div className="filed__login">
        <label
          htmlFor="login"
          className={`login__label ${login ? 'label-visible' : ''}`}
        >
          Логин
        </label>

        <input
          id="login"
          type="text"
          className={`login ${login ? 'input-has-value' : ''} ${error ? 'input-error' : ''}`}
          placeholder="Логин"
          value={login}
          onChange={(e) => dispatch(setLogin(e.target.value))}
        />

        {login && (
          <button
            type="button"
            className="close-btn"
            aria-label="Очитить поле логин"
            onClick={() => dispatch(clearLogin())}
          >
            <img
              src="/Close.svg"
              alt="Очитить поле"
              className="close__img close-visible"
            />
          </button>
        )}
      </div>

      <div className="filed__password">
        <label
          htmlFor="password"
          className={`password__label ${password ? 'label-visible' : ''}`}
        >
          Введите пароль
        </label>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          className={`password ${password ? 'input-has-value' : ''} ${error ? 'input-error' : ''}`}
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        <button
          type="button"
          aria-label="Показать пароль"
          onClick={() => dispatch(toggleShowPassword())}
        >
          <img
            src="/Stroke.svg"
            alt={showPassword ? `Скрыть пароль` : `Показать пароль`}
            className="stroke__img"
          />
        </button>
      </div>
      {error && <p className="error"> Неверный логин или пароль </p>}

      <button
        type="submit"
        className={`button ${login && password ? 'button-active' : ''}`}
      >
        Войти
      </button>
    </form>
  );
}
