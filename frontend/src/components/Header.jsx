import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const activeStyle = { color: '#ec4899', textDecoration: 'underline' }

function MenuLink({ to, children, end }) {
  return (
    <li>
      <NavLink to={to} end={end} style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        {children}
      </NavLink>
    </li>
  )
}

export default function Header() {
  const { isAuthenticated } = useAuth()

  return (
    <header className="header">
      <div className="logo-container">
        <NavLink to="/">
          <img
            src="/assets/images/icons/LogoMeninasDeSistema.png"
            alt="Logo Meninas de Sistemas"
            className="logo-topo"
          />
        </NavLink>
      </div>
      <nav>
        <ul className="menu">
          <MenuLink to="/" end>
            Página Inicial
          </MenuLink>
          <MenuLink to="/noticias">Notícias</MenuLink>
          <MenuLink to="/eventos">Eventos</MenuLink>
          <MenuLink to="/membros">Membros</MenuLink>
          <MenuLink to="/sobre">Sobre</MenuLink>
          <MenuLink to={isAuthenticated ? '/admin' : '/admin/login'}>
            {isAuthenticated ? 'Painel' : 'Login'}
          </MenuLink>
        </ul>
      </nav>
    </header>
  )
}
