import { NavLink, Outlet, useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useVehicles } from '../features/vehicles/hooks/use-vehicles'
import type { Vehicle } from '../features/vehicles/types'
import lionsLogo from '../assets/logo.png'
import footerLogo from '../assets/lions-logo.png'

export interface AppOutletContext {
  vehicles: Vehicle[]
  loading: boolean
  error: boolean
}

export function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const vehicleState = useVehicles()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [location.pathname])

  return <div className="site-shell">
    <div className="topline"><div className="container topline-inner"><span>Revenda de automóveis seminovos com mais de 10 anos no ramo.</span><span>Rio de Janeiro · RJ&nbsp;&nbsp; | &nbsp;&nbsp;Seg–Sáb, 9h às 18h</span></div></div>
    <header className="header"><div className="container nav"><button className="brand" onClick={() => { setMobileMenuOpen(false); navigate('/') }} aria-label="Lions Seminovos, página inicial"><img src={lionsLogo} alt="Lions Seminovos" /></button><nav id="main-navigation" className={mobileMenuOpen ? 'is-open' : ''} aria-label="Navegação principal"><NavLink to="/" end onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Início</NavLink><NavLink to="/catalogo" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Catálogo</NavLink><NavLink to="/agendar" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Agende uma visita</NavLink></nav><NavLink className="button button-dark nav-cta" to="/agendar" onClick={() => setMobileMenuOpen(false)}>Agendar visita <span>↗</span></NavLink><button className="mobile-menu" type="button" aria-label={mobileMenuOpen ? 'Fechar navegação' : 'Abrir navegação'} aria-expanded={mobileMenuOpen} aria-controls="main-navigation" onClick={() => setMobileMenuOpen(open => !open)}>{mobileMenuOpen ? '×' : '☰'}</button></div></header>
    <main><Outlet context={vehicleState satisfies AppOutletContext}/></main>
    <footer className="footer"><div className="container footer-main"><div><img className="footer-logo" src={footerLogo} alt="Lions Seminovos"/><p>Revenda de automóveis seminovos no Rio de Janeiro.<br/>Há mais de 10 anos no ramo.</p></div><div><div className="footer-label">VISITE-NOS</div><p>Av. Brasil, 20384<br/>Coelho Neto / Barros Filho, Rio de Janeiro - RJ<br/>CEP 21515-000</p></div><div><div className="footer-label">FALE COM A LIONS</div><p>(21) 96450-8240<br/>Seg–Sáb, 9h às 18h</p></div><NavLink className="text-link light-link" to="/catalogo">Explorar catálogo <span>↗</span></NavLink></div><div className="container footer-bottom"><span>© 2025 LIONS SEMINOVOS</span><span>QUALIDADE EM CADA DETALHE.</span></div></footer>
  </div>
}
