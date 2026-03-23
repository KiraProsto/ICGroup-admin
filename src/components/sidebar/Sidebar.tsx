import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

export default function Sidebar() {
  const location = useLocation();
  const menu = [
    { label: 'Главная страница', href: '/admin' },
    { label: 'Новости', href: '/admin/news' },
    { label: 'Пользователи', href: '/admin/users' },
    { label: 'Об ic-group', href: '/admin/about' },
    { label: 'Закупки', href: '/admin/purchases' },
    { label: 'Контакты', href: '/admin/contacts' },
    { label: 'Акционерам', href: '/admin/shareholders' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        {menu.map((item) => {
          let isActive;

          if (item.href === '/admin') {
            isActive = location.pathname === item.href;
          } else {
            isActive =
              location.pathname === item.href ||
              location.pathname.startsWith(item.href + '/');
          }

          return (
            <Link
              key={item.href}
              to={item.href}
              className={isActive ? 'sidebar__link-active' : 'sidebar__link'}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
