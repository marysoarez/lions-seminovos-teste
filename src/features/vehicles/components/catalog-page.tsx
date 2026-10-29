import { useMemo, useState } from 'react'
import type { Vehicle } from '../types'
import { VehicleCard } from '../../../shared/components/vehicle-card'

interface CatalogPageProps {
  vehicles: Vehicle[]
  loading: boolean
  error: boolean
  onSelectVehicle: (vehicle: Vehicle) => void
}

export function CatalogPage({ vehicles, loading, error, onSelectVehicle }: CatalogPageProps) {
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

  const brands = useMemo(() => [...new Set(vehicles.filter(vehicle => vehicleType === 'Todos' || vehicle.vehicleType === vehicleType).map(vehicle => vehicle.brand))].sort(), [vehicles, vehicleType])
  const models = useMemo(() => [...new Set(vehicles.filter(vehicle => (vehicleType === 'Todos' || vehicle.vehicleType === vehicleType) && (brand === 'Todas' || vehicle.brand === brand)).map(vehicle => vehicle.model))].sort(), [vehicles, brand, vehicleType])
  const availableColors = useMemo(() => [...new Set(vehicles.filter(vehicle => vehicleType === 'Todos' || vehicle.vehicleType === vehicleType).map(vehicle => vehicle.color))].sort(), [vehicles, vehicleType])
  const availableFuel = useMemo(() => [...new Set(vehicles.filter(vehicle => vehicleType === 'Todos' || vehicle.vehicleType === vehicleType).map(vehicle => vehicle.fuel))].sort(), [vehicles, vehicleType])
  const filtered = useMemo(() => vehicles.filter(vehicle =>
    (vehicleType === 'Todos' || vehicle.vehicleType === vehicleType) &&
    (vehicleType === 'Moto' ? (motorcycleCategory === 'Todas' || vehicle.motorcycleCategory === motorcycleCategory) : (category === 'Todos' || vehicle.category === category)) &&
    (vehicleType !== 'Moto' || (!ccFrom || (vehicle.displacementCc ?? 0) >= Number(ccFrom)) && (!ccTo || (vehicle.displacementCc ?? Infinity) <= Number(ccTo))) &&
    (vehicleType !== 'Moto' || partsFilter === 'Todos' || (partsFilter === 'Informados' ? vehicle.additionalParts.length > 0 : vehicle.additionalParts.length === 0)) &&
    (brand === 'Todas' || vehicle.brand === brand) && (model === 'Todos' || vehicle.model === model) &&
    (color === 'Todas' || vehicle.color === color) && (fuel === 'Todos' || vehicle.fuel === fuel) &&
    (!yearFrom || vehicle.year >= Number(yearFrom)) && (!yearTo || vehicle.year <= Number(yearTo)) &&
    (!priceFrom || vehicle.price >= Number(priceFrom)) && (!priceTo || vehicle.price <= Number(priceTo)) &&
    `${vehicle.brand} ${vehicle.model} ${vehicle.year}`.toLowerCase().includes(search.toLowerCase())
  ), [vehicles, vehicleType, category, motorcycleCategory, ccFrom, ccTo, partsFilter, brand, model, color, fuel, yearFrom, yearTo, priceFrom, priceTo, search])

  function clearFilters() {
    setSearch(''); setVehicleType('Todos'); setCategory('Todos'); setMotorcycleCategory('Todas'); setCcFrom(''); setCcTo(''); setPartsFilter('Todos'); setBrand('Todas'); setModel('Todos'); setColor('Todas'); setFuel('Todos'); setYearFrom(''); setYearTo(''); setPriceFrom(''); setPriceTo('')
  }

  return <section className="catalog container"><div className="eyebrow"><i/> CATÁLOGO LIONS</div><h1>Nosso <em>catálogo.</em></h1><p className="page-lead">Carros e motos selecionados para combinar com o seu próximo capítulo.</p>
    <div className="catalog-filter-panel">
      <div className="catalog-filter-top"><div className="type-switch" aria-label="Tipo de veículo">{['Todos', 'Carro', 'Moto'].map(type => <button key={type} className={vehicleType === type ? 'selected' : ''} aria-pressed={vehicleType === type} onClick={() => { setVehicleType(type); setBrand('Todas'); setModel('Todos'); setCategory('Todos'); setMotorcycleCategory('Todas') }}>{type === 'Todos' ? 'Todos' : `${type}s`}</button>)}</div><label className="search"><span>⌕</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Buscar marca, modelo ou ano" aria-label="Buscar veículos"/></label><label className="filter-control brand-filter"><select aria-label="Filtrar marca" value={brand} onChange={event => { setBrand(event.target.value); setModel('Todos') }}><option value="Todas">Marca</option>{brands.map(option => <option key={option}>{option}</option>)}</select></label></div>
      <div className="catalog-filter-grid"><label className="filter-control"><span>{vehicleType === 'Moto' ? 'CATEGORIA DE MOTO' : 'CATEGORIA'}</span><select aria-label={vehicleType === 'Moto' ? 'Filtrar categoria de moto' : 'Filtrar categoria'} value={vehicleType === 'Moto' ? motorcycleCategory : category} onChange={event => vehicleType === 'Moto' ? setMotorcycleCategory(event.target.value) : setCategory(event.target.value)}>{vehicleType === 'Moto' ? <><option>Todas</option><option>Trail</option><option>Naked</option><option>Street</option><option>Custom</option><option>Scooter</option><option>Esportiva</option></> : <><option>Todos</option><option>SUV</option><option>Sedan</option><option>Hatch</option><option>Minivan</option></>}</select></label><label className="filter-control"><span>MODELO</span><select aria-label="Filtrar modelo" value={model} onChange={event => setModel(event.target.value)}><option>Todos</option>{models.map(option => <option key={option}>{option}</option>)}</select></label>{vehicleType === 'Moto' && <fieldset className="range-filter"><legend>CILINDRADA · CC</legend><input type="number" min="0" value={ccFrom} onChange={event => setCcFrom(event.target.value)} placeholder="De" aria-label="Cilindrada mínima em cc"/><span>–</span><input type="number" min="0" value={ccTo} onChange={event => setCcTo(event.target.value)} placeholder="Até" aria-label="Cilindrada máxima em cc"/></fieldset>}<label className="filter-control"><span>COR</span><select aria-label="Filtrar cor" value={color} onChange={event => setColor(event.target.value)}><option>Todas</option>{availableColors.map(option => <option key={option}>{option}</option>)}</select></label><label className="filter-control"><span>COMBUSTÍVEL</span><select aria-label="Filtrar combustível" value={fuel} onChange={event => setFuel(event.target.value)}><option>Todos</option>{availableFuel.map(option => <option key={option}>{option}</option>)}{!availableFuel.includes('Elétrico') && <option>Elétrico</option>}{!availableFuel.includes('Híbrido') && <option>Híbrido</option>}</select></label>{vehicleType === 'Moto' && <label className="filter-control"><span>PEÇAS E ACESSÓRIOS</span><select aria-label="Filtrar peças e acessórios" value={partsFilter} onChange={event => setPartsFilter(event.target.value)}><option>Todos</option><option value="Informados">Com itens informados</option><option value="Não informado">Sem itens informados</option></select></label>}<fieldset className="range-filter"><legend>ANO</legend><input type="number" min="1900" max="2100" value={yearFrom} onChange={event => setYearFrom(event.target.value)} placeholder="De" aria-label="Ano a partir de"/><span>–</span><input type="number" min="1900" max="2100" value={yearTo} onChange={event => setYearTo(event.target.value)} placeholder="Até" aria-label="Ano até"/></fieldset><fieldset className="range-filter price-range"><legend>PREÇO · R$</legend><input type="number" min="0" value={priceFrom} onChange={event => setPriceFrom(event.target.value)} placeholder="De" aria-label="Preço mínimo"/><span>–</span><input type="number" min="0" value={priceTo} onChange={event => setPriceTo(event.target.value)} placeholder="Até" aria-label="Preço máximo"/></fieldset><button className="clear-filters" onClick={clearFilters}>Limpar filtros <span>↺</span></button></div>
    </div>
    {loading ? <div className="notice">Carregando nossa seleção…</div> : error ? <div className="notice error">Não foi possível carregar o catálogo. Tente novamente em instantes.</div> : filtered.length ? <>{filtered.some(vehicle => vehicle.demoOnly) && <div className="demo-note catalog-demo-note">Motos fictícias para demonstrar futuras opções do catálogo. Preços, quilometragens e imagens são ilustrativos; não indicam disponibilidade real.</div>}<div className="result-count">{filtered.length} VEÍCULOS NA SELEÇÃO</div><div className="vehicle-grid">{filtered.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={() => onSelectVehicle(vehicle)} />)}</div></> : <div className="empty"><span>⌕</span><h3>Nenhum veículo encontrado</h3><p>Não encontramos veículos com esses filtros.</p><button className="text-link" onClick={clearFilters}>Limpar filtros ↗</button></div>}
  </section>
}
