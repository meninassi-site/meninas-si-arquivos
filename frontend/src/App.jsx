import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'

import Home from './pages/Home'
import About from './pages/About'
import ActivityDetail from './pages/ActivityDetail'
import NewsList from './pages/news/NewsList'
import EventsList from './pages/events/EventsList'
import MembersList from './pages/members/MembersList'
import MemberDetail from './pages/members/MemberDetail'

import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminUserForm from './pages/admin/AdminUserForm'
import MembersAdmin from './pages/admin/members/MembersAdmin'
import MemberForm from './pages/admin/members/MemberForm'
import PostsAdmin from './pages/admin/posts/PostsAdmin'
import PostForm from './pages/admin/posts/PostForm'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/noticias" element={<NewsList />} />
            <Route path="/noticias/:type/:id" element={<ActivityDetail backTo="/noticias" />} />
            <Route path="/eventos" element={<EventsList />} />
            <Route path="/eventos/:type/:id" element={<ActivityDetail backTo="/eventos" />} />
            <Route path="/membros" element={<MembersList />} />
            <Route path="/membros/:id" element={<MemberDetail />} />
          </Route>

          <Route path="/admin/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/administradores/novo" element={<AdminUserForm />} />
              <Route path="/admin/membros" element={<MembersAdmin />} />
              <Route path="/admin/membros/novo" element={<MemberForm />} />
              <Route path="/admin/membros/:id/editar" element={<MemberForm />} />
              <Route path="/admin/postagens" element={<PostsAdmin />} />
              <Route path="/admin/postagens/novo" element={<PostForm />} />
              <Route path="/admin/postagens/:type/:id/editar" element={<PostForm />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
