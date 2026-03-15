import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import AdminPage from './pages/admin/AdminPage';
import NewsPage from './pages/admin/News/NewsPage';
import UsersPage from './pages/admin/UsersPage';
import AboutPage from './pages/admin/AboutPage';
import PurchasesPage from './pages/admin/PurchasesPage';
import ContactsPage from './pages/admin/ContactsPage';
import ShareholdersPage from './pages/admin/ShareholdersPage';
import NewsAddPage from './pages/admin/News/NewsAddPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/add" element={<NewsAddPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="purchases" element={<PurchasesPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="shareholders" element={<ShareholdersPage />} />
      </Route>
    </Routes>
  );
}
