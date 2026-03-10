import Sidebar from '@/components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './AdminLayout.css'

export const AdminLayout = () => {
  return (
    <div className="admin__layout">
      <Sidebar />

      <main className="admin__content">
        <Outlet />
      </main>
    </div>
  );
};
