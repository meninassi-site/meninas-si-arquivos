import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function SidebarLink({ to, children, end }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}>
      <span>{children}</span>
    </NavLink>
  )
}

export default function AdminLayout() {
  const { admin, logout } = useAuth()

  return (
    <>
      <header className="admin-header">
        <div className="admin-header-container">
          <div className="logo-container">
            <NavLink to="/admin">
              <img src="/assets/images/icons/LogoMeninasDeSistema.png" alt="Logo Meninas de Sistemas" className="logo-topo" />
            </NavLink>
          </div>

          <div className="admin-user-profile">
            <span>{admin?.username}</span>
            <button
              type="button"
              onClick={logout}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontWeight: 600 }}
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="admin-dashboard-container">
        <aside className="admin-sidebar">
          <nav className="sidebar-menu">
            <SidebarLink to="/admin" end>
              Início / Dashboard
            </SidebarLink>
            <SidebarLink to="/admin/postagens">Postagens (Eventos, Workshops, Minicursos)</SidebarLink>
            <SidebarLink to="/admin/membros">Membros</SidebarLink>
            <SidebarLink to="/admin/administradores/novo">Cadastrar Administrador</SidebarLink>
          </nav>
        </aside>

        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </>
  )
}
