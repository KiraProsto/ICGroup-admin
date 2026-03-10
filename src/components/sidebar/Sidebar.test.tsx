import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./Sidebar";
import { describe, it, expect } from "vitest";

describe('Sidebar', ()=> {
    it('Рендерит меню', ()=>{
        render(
            <MemoryRouter initialEntries={['/admin']}> 
                <Sidebar></Sidebar>
            </MemoryRouter>
        )
        
        const links = [
            'Главная страница',
            'Новости',
            'Пользователи',
            'Об ic-group',
            'Закупки',
            'Контакты',
            'Акционерам',
        ]

        links.forEach((label) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        })
    })

    it('Отображает активную вкладку', () => {
        render(
            <MemoryRouter initialEntries={['/admin/news']}> 
                <Sidebar></Sidebar>
            </MemoryRouter>
        )

        const activeLink = screen.getByText('Новости');
        expect(activeLink).toHaveClass('sidebar__link-active');
    })

    it('Отображает не активные вкладки', ()=>{
        render(
            <MemoryRouter initialEntries={['/admin/news']}>
                <Sidebar />
            </MemoryRouter>
        )

        const inactiveLink = screen.getByText('Главная страница')
        expect(inactiveLink).toHaveClass('sidebar__link')
        expect(inactiveLink).not.toHaveClass('sidebar__link-active')
    })
})