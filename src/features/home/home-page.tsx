import type { Vehicle } from '../vehicles/types'
import { VehicleCard } from '../../shared/components/vehicle-card'

interface HomePageProps {
  vehicles: Vehicle[]
  onNavigate: (page: 'vehicles' | 'appointment') => void
  onSelectVehicle: (vehicle: Vehicle) => void
}

export function HomePage({ vehicles, onNavigate, onSelectVehicle }: HomePageProps) {
  return <>
    <section className="hero"><div className="hero-image"/><div className="container hero-content"><div className="eyebrow light"><i/> SEMINOVOS · RIO DE JANEIRO</div><h1>Seu próximo veículo<br/>está mais perto.</h1><p>Carros e motos seminovos para diferentes trajetos<br className="desktop"/> e orçamentos. Confira os anúncios disponíveis.</p><div className="hero-actions"><button className="button button-light" onClick={() => onNavigate('vehicles')}>Explorar catálogo <span>↗</span></button><button className="text-link light-link" onClick={() => onNavigate('appointment')}>Agendar visita <span>→</span></button></div></div><div className="hero-caption">LIONS SEMINOVOS · RIO DE JANEIRO</div></section>
    <section className="intro container"><div><div className="eyebrow"><i/> MAIS DE 10 ANOS NO RAMO</div><h2>Seminovos para<br/><em>o seu dia a dia.</em></h2></div><div className="intro-copy"><p>Há mais de 10 anos, a Lions trabalha com automóveis seminovos. Consulte o catálogo, compare modelos e fale com a equipe para confirmar preço, disponibilidade e detalhes de cada veículo.</p><div className="intro-actions"><button className="text-link" onClick={() => onNavigate('appointment')}>Fale com a equipe Lions <span>↗</span></button><a className="button button-dark official-link" href="https://lionsseminovos.com.br/" target="_blank" rel="noopener noreferrer">Acessar site oficial <span>↗</span></a></div></div></section>
    <section className="featured"><div className="container"><div className="section-head"><div><div className="eyebrow"><i/> ANÚNCIOS DO CATÁLOGO</div><h2>Modelos para diferentes <em>caminhos.</em></h2></div><button className="text-link" onClick={() => onNavigate('vehicles')}>Ver todos os anúncios <span>↗</span></button></div><div className="vehicle-grid">{vehicles.filter(vehicle => vehicle.featured).slice(0, 3).map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={() => onSelectVehicle(vehicle)} />)}</div></div></section>
    <section className="visit-band"><div className="container visit-inner"><div><div className="eyebrow light"><i/> VISITE A LOJA NO RIO DE JANEIRO</div><h2>Veja de perto.<br/>Tire suas dúvidas.</h2></div><button className="button button-light" onClick={() => onNavigate('appointment')}>Agendar uma visita <span>↗</span></button></div></section>
  </>
}
