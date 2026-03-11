import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';
import { renderWithProviders } from '@/tests/test-utils';

describe('LoginForm', () => {
  it('рендерит форму', () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByText(/Вход/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Логин/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Введите пароль/i)).toBeInTheDocument();
  });

  it('вводит логин', () => {
    renderWithProviders(<LoginForm />);
    const input = screen.getByPlaceholderText(/Логин/i);
    fireEvent.change(input, { target: { value: 'admin' } });
    expect(input).toHaveValue('admin');
  });

  it('вводит пароль', () => {
    renderWithProviders(<LoginForm />);
    const input = screen.getByPlaceholderText(/Введите пароль/i);
    fireEvent.change(input, { target: { value: '123' } });
    expect(input).toHaveValue('123');
  });

  it('показывает ошибку при пустых полях', () => {
    renderWithProviders(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: /Войти/i }));
    expect(screen.getByText(/Неверный логин или пароль/i)).toBeInTheDocument();
  });

  it('очищает логин по клику на крестик', () => {
    renderWithProviders(<LoginForm />);
    const input = screen.getByPlaceholderText(/Логин/i);
    fireEvent.change(input, { target: { value: 'test' } });

    const clearBtn = screen.getByRole('button', {
      name: /Очитить поле логин/i,
    });
    fireEvent.click(clearBtn);

    expect(input).toHaveValue('');
  });

  it('переключает видимость пароля', () => {
    renderWithProviders(<LoginForm />);
    const toggleBtn = screen.getByRole('button', { name: /Показать пароль/i });
    const input = screen.getByPlaceholderText(/Введите пароль/i);

    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'text');
  });

  it('не показывает ошибку при валидных данных', () => {
    renderWithProviders(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText(/Логин/i), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Введите пароль/i), {
      target: { value: '123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Войти/i }));

    expect(
      screen.queryByText(/Неверный логин или пароль/i),
    ).not.toBeInTheDocument();
  });
});
