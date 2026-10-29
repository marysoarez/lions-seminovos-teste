import { useMemo, useState } from 'react'
import { useVehicles } from './features/vehicles/useVehicles'
import { requestAppointment } from './features/appointments/appointmentService'
import type { AppointmentInput } from './features/appointments/types'
import type { Vehicle } from './features/vehicles/types'
import lionsLogo from './assets/lions-logo.png'
import './App.css'

type Page = 'home' | 'vehicles' | 'detail' | 'appointment'
const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

function App() {
  const [page, setPage] = useState<Page>('home')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todos')
  const [vehicleType, setVehicleType] = useState('Todos')
  const [motorcycleCategory, setMotorcycleCategory] = useState('Todas')
  const [ccFrom, setCcFrom] = useState('')
  const [ccTo, setCcTo] = useState('')
  const [partsFilter, setPartsFilter] = useState('Todos')
  const [brand, setBrand] = useState('Todas')
  const [model, setModel] = useState('Todos')
  const [color, setColor] = useState('Todas')
  const [fuel, setFuel] = useState('Todos')
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const { vehicles, loading, error } = useVehicles()
  const brands = useMemo(() => [...new Set(vehicles.filter(v => vehicleType === 'Todos' || v.vehicleType === vehicleType).map(v => v.brand))].sort(), [vehicles, vehicleType])
  const models = useMemo(() => [...new Set(vehicles.filter(v => (vehicleType === 'Todos' || v.vehicleType === vehicleType) && (brand === 'Todas' || v.brand === brand)).map(v => v.model))].sort(), [vehicles, brand, vehicleType])
  const filtered = useMemo(() => vehicles.filter(v =>
    (vehicleType === 'Todos' || v.vehicleType === vehicleType) &&
    (vehicleType === 'Moto' ? (motorcycleCategory === 'Todas' || v.motorcycleCategory === motorcycleCategory) : (category === 'Todos' || v.category === category)) &&
    (vehicleType !== 'Moto' || (!ccFrom || (v.displacementCc ?? 0) >= Number(ccFrom)) && (!ccTo || (v.displacementCc ?? Infinity) <= Number(ccTo))) &&
    (vehicleType !== 'Moto' || partsFilter === 'Todos' || (partsFilter === 'Informados' ? v.additionalParts.length > 0 : v.additionalParts.length === 0)) &&
    (brand === 'Todas' || v.brand === brand) &&
    (model === 'Todos' || v.model === model) &&
    (color === 'Todas' || v.color === color) &&
    (fuel === 'Todos' || v.fuel === fuel) &&
    (!yearFrom || v.year >= Number(yearFrom)) && (!yearTo || v.year <= Number(yearTo)) &&
    (!priceFrom || v.price >= Number(priceFrom)) && (!priceTo || v.price <= Number(priceTo)) &&
    `${v.brand} ${v.model} ${v.year}`.toLowerCase().includes(search.toLowerCase())
  ), [vehicles, vehicleType, category, motorcycleCategory, ccFrom, ccTo, partsFilter, brand, model, color, fuel, yearFrom, yearTo, priceFrom, priceTo, search])
  const clearFilters = () => { setSearch(''); setVehicleType('Todos'); setCategory('Todos'); setMotorcycleCategory('Todas'); setCcFrom(''); setCcTo(''); setPartsFilter('Todos'); setBrand('Todas'); setModel('Todos'); setColor('Todas'); setFuel('Todos'); setYearFrom(''); setYearTo(''); setPriceFrom(''); setPriceTo('') }
  const go = (next: Page) => { setPage(next); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return <div className="site-shell">
    <div className="topline"><div className="container topline-inner"><span>Revenda de automóveis seminovos com mais de 10 anos no ramo.</span><span>Rio de Janeiro · RJ&nbsp;&nbsp; | &nbsp;&nbsp;Seg–Sáb, 9h às 18h</span></div></div>
    <header className="header"><div className="container nav"><button className="brand" onClick={() => go('home')} aria-label="Lions Seminovos, página inicial"><img src={lionsLogo} alt="Lions Seminovos" /></button><nav aria-label="Navegação principal"><button className={page === 'home' ? 'active' : ''} onClick={() => go('home')}>Início</button><button className={page === 'vehicles' ? 'active' : ''} onClick={() => go('vehicles')}>Catálogo</button><button onClick={() => go('appointment')}>A loja</button></nav><button className="button button-dark nav-cta" onClick={() => go('appointment')}>Agendar visita <span>↗</span></button><button className="mobile-menu" onClick={() => go(page === 'vehicles' ? 'home' : 'vehicles')}>☰</button></div></header>
    <main>
      {page === 'home' && <>
        <section className="hero"><div className="hero-image"/><div className="container hero-content"><div className="eyebrow light"><i/> SEMINOVOS · RIO DE JANEIRO</div><h1>Seu próximo veículo<br/>está mais perto.</h1><p>Carros e motos seminovos para diferentes trajetos<br className="desktop"/> e orçamentos. Confira os anúncios disponíveis.</p><div className="hero-actions"><button className="button button-light" onClick={() => go('vehicles')}>Explorar catálogo <span>↗</span></button><button className="text-link light-link" onClick={() => go('appointment')}>Agendar visita <span>→</span></button></div></div><div className="hero-caption">LIONS SEMINOVOS · RIO DE JANEIRO</div></section>
        <section className="intro container"><div><div className="eyebrow"><i/> MAIS DE 10 ANOS NO RAMO</div><h2>Seminovos para<br/><em>o seu dia a dia.</em></h2></div><div className="intro-copy"><p>Há mais de 10 anos, a Lions trabalha com automóveis seminovos. Consulte o catálogo, compare modelos e fale com a equipe para confirmar preço, disponibilidade e detalhes de cada veículo.</p><div className="intro-actions"><button className="text-link" onClick={() => go('appointment')}>Fale com a equipe Lions <span>↗</span></button><a className="button button-dark official-link" href="https://lionsseminovos.com.br/" target="_blank" rel="noopener noreferrer">Acessar site oficial <span>↗</span></a></div></div></section>
        <section className="featured"><div className="container"><div className="section-head"><div><div className="eyebrow"><i/> ANÚNCIOS DO CATÁLOGO</div><h2>Modelos para diferentes <em>caminhos.</em></h2></div><button className="text-link" onClick={() => go('vehicles')}>Ver todos os anúncios <span>↗</span></button></div><div className="vehicle-grid">{vehicles.filter(v => v.featured).slice(0, 3).map(v => <VehicleCard key={v.id} vehicle={v} onClick={() => { setSelectedVehicle(v); go('detail') }}/>)}</div></div></section>
        <section className="visit-band"><div className="container visit-inner"><div><div className="eyebrow light"><i/> VISITE A LOJA NO RIO DE JANEIRO</div><h2>Veja de perto.<br/>Tire suas dúvidas.</h2></div><button className="button button-light" onClick={() => go('appointment')}>Agendar uma visita <span>↗</span></button></div></section>
      </>}
      {page === 'vehicles' && <section className="catalog container"><div className="eyebrow"><i/> CATÁLOGO LIONS</div><h1>Nosso <em>catálogo.</em></h1><p className="page-lead">Carros e motos selecionados para combinar com o seu próximo capítulo.</p>
        <div className="catalog-filter-panel">
          <div className="catalog-filter-top"><div className="type-switch" aria-label="Tipo de veículo">{['Todos', 'Carro', 'Moto'].map(type => <button key={type} className={vehicleType === type ? 'selected' : ''} aria-pressed={vehicleType === type} onClick={() => { setVehicleType(type); setBrand('Todas'); setModel('Todos'); setCategory('Todos'); setMotorcycleCategory('Todas') }}>{type === 'Todos' ? 'Todos' : `${type}s`}</button>)}</div><label className="search"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar marca, modelo ou ano" aria-label="Buscar veículos"/></label><label className="filter-control brand-filter"><select aria-label="Filtrar marca" value={brand} onChange={e => { setBrand(e.target.value); setModel('Todos') }}><option value="Todas">Marca</option>{brands.map(option => <option key={option}>{option}</option>)}</select></label></div>
          <div className="catalog-filter-grid"><label className="filter-control"><span>{vehicleType === 'Moto' ? 'CATEGORIA DE MOTO' : 'CATEGORIA'}</span><select aria-label={vehicleType === 'Moto' ? 'Filtrar categoria de moto' : 'Filtrar categoria'} value={vehicleType === 'Moto' ? motorcycleCategory : category} onChange={e => vehicleType === 'Moto' ? setMotorcycleCategory(e.target.value) : setCategory(e.target.value)}>{vehicleType === 'Moto' ? <><option>Todas</option><option>Trail</option><option>Naked</option><option>Street</option><option>Custom</option><option>Scooter</option><option>Esportiva</option></> : <><option>Todos</option><option>SUV</option><option>Sedan</option><option>Hatch</option><option>Minivan</option></>}</select></label><label className="filter-control"><span>MODELO</span><select aria-label="Filtrar modelo" value={model} onChange={e => setModel(e.target.value)}><option>Todos</option>{models.map(option => <option key={option}>{option}</option>)}</select></label>{vehicleType === 'Moto' && <fieldset className="range-filter"><legend>CILINDRADA · CC</legend><input type="number" min="0" value={ccFrom} onChange={e => setCcFrom(e.target.value)} placeholder="De" aria-label="Cilindrada mínima em cc"/><span>–</span><input type="number" min="0" value={ccTo} onChange={e => setCcTo(e.target.value)} placeholder="Até" aria-label="Cilindrada máxima em cc"/></fieldset>}<label className="filter-control"><span>COR</span><select aria-label="Filtrar cor" value={color} onChange={e => setColor(e.target.value)}><option>Todas</option>{[...new Set(vehicles.filter(v => vehicleType === 'Todos' || v.vehicleType === vehicleType).map(v => v.color))].sort().map(option => <option key={option}>{option}</option>)}</select></label><label className="filter-control"><span>COMBUSTÍVEL</span><select aria-label="Filtrar combustível" value={fuel} onChange={e => setFuel(e.target.value)}><option>Todos</option>{[...new Set(vehicles.filter(v => vehicleType === 'Todos' || v.vehicleType === vehicleType).map(v => v.fuel))].sort().map(option => <option key={option}>{option}</option>)}</select></label>{vehicleType === 'Moto' && <label className="filter-control"><span>PEÇAS E ACESSÓRIOS</span><select aria-label="Filtrar peças e acessórios" value={partsFilter} onChange={e => setPartsFilter(e.target.value)}><option>Todos</option><option value="Informados">Com itens informados</option><option value="Não informado">Sem itens informados</option></select></label>}<fieldset className="range-filter"><legend>ANO</legend><input type="number" min="1900" max="2100" value={yearFrom} onChange={e => setYearFrom(e.target.value)} placeholder="De" aria-label="Ano a partir de"/><span>–</span><input type="number" min="1900" max="2100" value={yearTo} onChange={e => setYearTo(e.target.value)} placeholder="Até" aria-label="Ano até"/></fieldset><fieldset className="range-filter price-range"><legend>PREÇO · R$</legend><input type="number" min="0" value={priceFrom} onChange={e => setPriceFrom(e.target.value)} placeholder="De" aria-label="Preço mínimo"/><span>–</span><input type="number" min="0" value={priceTo} onChange={e => setPriceTo(e.target.value)} placeholder="Até" aria-label="Preço máximo"/></fieldset><button className="clear-filters" onClick={clearFilters}>Limpar filtros <span>↺</span></button></div>
        </div>
        {loading ? <div className="notice">Carregando nossa seleção…</div> : error ? <div className="notice error">Não foi possível carregar o catálogo. Tente novamente em instantes.</div> : filtered.length ? <>{filtered.some(v => v.demoOnly) && <div className="demo-note catalog-demo-note">Motos fictícias para demonstrar futuras opções do catálogo. Preços, quilometragens e imagens são ilustrativos; não indicam disponibilidade real.</div>}<div className="result-count">{filtered.length} VEÍCULOS NA SELEÇÃO</div><div className="vehicle-grid">{filtered.map(v => <VehicleCard key={v.id} vehicle={v} onClick={() => { setSelectedVehicle(v); go('detail') }}/>)}</div></> : <div className="empty"><span>⌕</span><h3>Nenhum veículo encontrado</h3><p>Não encontramos veículos com esses filtros.</p><button className="text-link" onClick={clearFilters}>Limpar filtros ↗</button></div>}</section>}
      {page === 'detail' && selectedVehicle && <VehicleDetail vehicle={selectedVehicle} onBack={() => go('vehicles')} onAppointment={() => go('appointment')} />}
      {page === 'appointment' && <AppointmentPage initialVehicle={selectedVehicle?.model ?? ''} onSubmit={async input => requestAppointment(input)} />}
    </main>
    <footer className="footer"><div className="container footer-main"><div><img className="footer-logo" src={lionsLogo} alt="Lions Seminovos"/><p>Revenda de automóveis seminovos no Rio de Janeiro.<br/>Há mais de 10 anos no ramo.</p></div><div><div className="footer-label">VISITE-NOS</div><p>Av. Brasil, 20384<br/>Coelho Neto / Barros Filho, Rio de Janeiro - RJ<br/>CEP 21515-000</p></div><div><div className="footer-label">FALE COM A LIONS</div><p>(21) 96450-8240<br/>Seg–Sáb, 9h às 18h</p></div><button className="text-link light-link" onClick={() => go('vehicles')}>Explorar catálogo <span>↗</span></button></div><div className="container footer-bottom"><span>© 2025 LIONS SEMINOVOS</span><span>QUALIDADE EM CADA DETALHE.</span></div></footer>
  </div>
}

function VehicleCard({ vehicle, onClick }: { vehicle: Vehicle, onClick: () => void }) {
  return <article className="vehicle-card"><button className="card-image" onClick={onClick} aria-label={`Ver detalhes de ${vehicle.brand} ${vehicle.model}`}><img src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} loading="lazy"/>{vehicle.demoOnly ? <span className="badge">MOTO DEMONSTRATIVA</span> : vehicle.featured && <span className="badge">SELEÇÃO LIONS</span>}<span className="card-arrow">↗</span></button><div className="card-info"><div className="vehicle-title"><div><span className="make">{vehicle.brand}</span><h3>{vehicle.model}</h3></div><strong>{money(vehicle.price)}</strong></div><div className="vehicle-meta"><span>{vehicle.year}</span><span>{vehicle.mileage.toLocaleString('pt-BR')} km</span><span>{vehicle.vehicleType === 'Moto' ? vehicle.motorcycleCategory : vehicle.category}</span></div>{vehicle.demoOnly && <p className="demo-card-note">Preço e quilometragem ilustrativos</p>}<button className="card-details" onClick={onClick}>Ver detalhes <span>↗</span></button></div></article>
}

function VehicleDetail({ vehicle, onBack, onAppointment }: { vehicle: Vehicle; onBack: () => void; onAppointment: () => void }) {
  const [activeImage, setActiveImage] = useState(0)
  return <section className="vehicle-detail container">
    <button className="back-link" onClick={onBack}>← Voltar ao catálogo</button>
    <div className="detail-layout">
      <div className="gallery"><div className="gallery-main"><img src={vehicle.images[activeImage]} alt={`${vehicle.brand} ${vehicle.model} — foto ${activeImage + 1}`} /><span className="gallery-count">{String(activeImage + 1).padStart(2, '0')} / {String(vehicle.images.length).padStart(2, '0')}</span></div><div className="gallery-thumbs" aria-label="Fotos do veículo">{vehicle.images.map((image, index) => <button key={image} className={index === activeImage ? 'selected' : ''} onClick={() => setActiveImage(index)} aria-label={`Ver foto ${index + 1}`} aria-pressed={index === activeImage}><img src={image} alt="" /></button>)}</div></div>
      <aside className="detail-summary"><div className="eyebrow"><i/> {vehicle.demoOnly ? 'MOTO PARA DEMONSTRAÇÃO' : vehicle.featured ? 'SELEÇÃO LIONS' : 'DISPONÍVEL NO CATÁLOGO'}</div><p className="detail-make">{vehicle.brand}</p><h1>{vehicle.model}</h1><div className="detail-price">{money(vehicle.price)}</div><div className="detail-meta"><span><b>{vehicle.year}</b>Ano</span><span><b>{vehicle.mileage.toLocaleString('pt-BR')} km</b>Quilometragem</span><span><b>{vehicle.vehicleType === 'Moto' ? vehicle.motorcycleCategory : vehicle.category}</b>{vehicle.vehicleType === 'Moto' ? 'Categoria' : 'Carroceria'}</span></div><p className="detail-description">{vehicle.description}</p><button className="button button-dark detail-cta" onClick={onAppointment}>Tenho interesse <span>↗</span></button><p className="detail-demo">{vehicle.demoOnly ? 'Exemplo fictício: não representa anúncio ou unidade disponível para compra.' : 'Confirme com a Lions a disponibilidade e as especificações atualizadas.'}</p></aside>
    </div>
    <div className="detail-information"><div><div className="eyebrow"><i/> FICHA DO VEÍCULO</div><h2>Informações do <em>anúncio.</em></h2><div className="spec-grid"><div><span>Marca</span><strong>{vehicle.brand}</strong></div><div><span>Modelo</span><strong>{vehicle.model}</strong></div><div><span>Ano modelo</span><strong>{vehicle.year}</strong></div><div><span>Quilometragem</span><strong>{vehicle.mileage.toLocaleString('pt-BR')} km</strong></div>{vehicle.vehicleType === 'Moto' ? <><div><span>Categoria da moto</span><strong>{vehicle.motorcycleCategory}</strong></div><div><span>Cilindrada</span><strong>{vehicle.displacementCc} cm³</strong></div><div><span>Combustível</span><strong>{vehicle.fuel}</strong></div></> : <div><span>Carroceria</span><strong>{vehicle.category}</strong></div>}<div><span>Cor anunciada</span><strong>{vehicle.color}</strong></div><div><span>Preço anunciado</span><strong>{money(vehicle.price)}</strong></div></div></div><div className="feature-list"><h3>Descrição técnica</h3><p>{vehicle.technicalDescription}</p><h3>{vehicle.vehicleType === 'Moto' ? 'Peças e acessórios adicionais' : 'Opcionais'}</h3>{vehicle.vehicleType === 'Moto' ? vehicle.additionalParts.length ? <ul>{vehicle.additionalParts.map(part => <li key={part}><span>＋</span>{part}</li>)}</ul> : <p>O anúncio não informa peças ou acessórios adicionais. Consulte a loja para confirmar os itens instalados nesta unidade.</p> : <p>O veículo pode contar com itens opcionais de conforto, tecnologia e segurança conforme a configuração anunciada. A lista e a disponibilidade de cada item variam por unidade; confirme os opcionais presentes neste carro diretamente com a Lions.</p>}</div></div>
  </section>
}

function AppointmentPage({ onSubmit, initialVehicle }: { onSubmit: (input: AppointmentInput) => Promise<{ protocol: string }>; initialVehicle: string }) {
  const [minimumDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('')
    const form = new FormData(event.currentTarget)
    const input = { name: String(form.get('name') ?? '').trim(), email: String(form.get('email') ?? '').trim(), phone: String(form.get('phone') ?? '').trim(), date: String(form.get('date') ?? ''), time: String(form.get('time') ?? ''), vehicle: String(form.get('vehicle') ?? '').trim() }
    if (input.name.length < 2 || !/^\S+@\S+\.\S+$/.test(input.email) || input.phone.replace(/\D/g, '').length < 10 || !input.date || !input.time) { setError('Confira os campos destacados e tente novamente.'); return }
    setBusy(true); try { await onSubmit(input); setSubmitted(true) } catch { setError('Não foi possível enviar agora. Tente novamente.') } finally { setBusy(false) }
  }
  return <section className="appointment container"><div className="appointment-copy"><div className="eyebrow"><i/> AGENDE UMA VISITA</div><h1>Venha conhecer<br/>nossos carros <em>de perto.</em></h1><p>Escolha o melhor dia e horário para visitar a Lions. Nossa equipe estará pronta para apresentar os veículos e ajudar você a encontrar o seminovo ideal.</p><div className="appointment-detail"><span>01</span><div><strong>Conheça nossos veículos</strong><p>Veja de perto os detalhes do carro que chamou sua atenção.</p></div></div><div className="appointment-detail"><span>02</span><div><strong>Atendimento da equipe Lions</strong><p>Converse com nossa equipe durante sua visita.</p></div></div></div><div className="form-panel">{submitted ? <div className="success"><div className="success-mark">✓</div><div className="eyebrow"><i/> SOLICITAÇÃO RECEBIDA</div><h2>Obrigado pelo<br/><em>seu interesse.</em></h2><p>Nossa equipe entrará em contato para confirmar os detalhes da visita.</p><div className="demo-note">Esta é uma demonstração. Nenhuma reserva real foi registrada e seus dados não foram armazenados.</div></div> : <><div className="form-heading"><div className="eyebrow"><i/> AGENDAR UMA VISITA</div><h2>Vamos receber você.</h2><p>Informe seus dados e a preferência de horário. Nossa equipe entrará em contato para confirmar a visita.</p></div><form onSubmit={handleSubmit} noValidate>{error && <div className="form-error" role="alert">{error}</div>}<label>Seu nome<input name="name" placeholder="Como podemos chamar você?" required minLength={2}/></label><div className="form-row"><label>E-mail<input name="email" type="email" placeholder="voce@email.com" required/></label><label>Celular<input name="phone" type="tel" placeholder="(11) 99999-9999" required minLength={10}/></label></div><label>Veículo de interesse <span className="optional">OPCIONAL</span><input name="vehicle" placeholder="Marca e modelo" defaultValue={initialVehicle}/></label><div className="form-row"><label>Data<input name="date" type="date" required min={minimumDate}/></label><label>Horário<select name="time" required defaultValue=""><option value="" disabled>Selecione</option><option>09:00</option><option>10:30</option><option>13:00</option><option>14:30</option><option>16:00</option><option>17:00</option></select></label></div><button className="button button-dark submit" disabled={busy}>{busy ? 'Enviando…' : 'Agendar visita'} <span>↗</span></button><p className="privacy">Ao enviar, você concorda em ser contatado pela Lions Seminovos para tratar da sua visita.</p><p className="demo-note">Demonstração: sua solicitação não cria uma reserva real.</p></form></>}</div></section>
}

export default App











