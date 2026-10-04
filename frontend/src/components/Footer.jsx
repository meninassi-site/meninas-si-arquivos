import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-conteudo">
        <div className="footer-logo-secao">
          <img
            src="/assets/images/icons/LogoMeninasDeSistema.png"
            alt="Logo Meninas de Sistemas"
            className="logo"
          />
        </div>
        <div className="footer-links">
          <div>
            <h4>Navegação</h4>
            <Link to="/">Página Inicial</Link>
            <Link to="/noticias">Notícias</Link>
            <Link to="/eventos">Eventos</Link>
            <Link to="/membros">Membros</Link>
            <Link to="/sobre">Sobre</Link>
            <Link to="/admin/login">Login</Link>
          </div>
          <div>
            <h4>Cidades</h4>
            <a href="#top">Cametá</a>
            <a href="#top">Oeiras</a>
            <a href="#top">Limoeiro do Ajurú</a>
          </div>
          <div>
            <h4>Parcerias</h4>
            <a href="#top">UFPA</a>
            <a href="#top">SBC</a>
            <a href="#top">Meninas Digitais</a>
            <a href="#top">PROEX</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Meninas de Sistemas | Universidade Federal do Pará</p>
      </div>
    </footer>
  )
}
