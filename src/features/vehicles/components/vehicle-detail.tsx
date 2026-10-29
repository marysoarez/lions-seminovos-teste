import { useState } from 'react'
import type { Vehicle } from '../types'
import { formatCurrency } from '../../../shared/utils/format-currency'

interface VehicleDetailProps {
  vehicle: Vehicle
  onBack: () => void
  onAppointment: () => void
}

export function VehicleDetail({ vehicle, onBack, onAppointment }: VehicleDetailProps) {
  const [activeImage, setActiveImage] = useState(0)
  return <section className="vehicle-detail container">
    <button className="back-link" onClick={onBack}>← Voltar ao catálogo</button>
    <div className="detail-layout">
      <div className="gallery"><div className="gallery-main"><img src={vehicle.images[activeImage]} alt={`${vehicle.brand} ${vehicle.model} — foto ${activeImage + 1}`} /><span className="gallery-count">{String(activeImage + 1).padStart(2, '0')} / {String(vehicle.images.length).padStart(2, '0')}</span></div><div className="gallery-thumbs" aria-label="Fotos do veículo">{vehicle.images.map((image, index) => <button key={image} className={index === activeImage ? 'selected' : ''} onClick={() => setActiveImage(index)} aria-label={`Ver foto ${index + 1}`} aria-pressed={index === activeImage}><img src={image} alt="" /></button>)}</div></div>
      <aside className="detail-summary"><div className="eyebrow"><i/> {vehicle.demoOnly ? 'MOTO PARA DEMONSTRAÇÃO' : vehicle.featured ? 'SELEÇÃO LIONS' : 'DISPONÍVEL NO CATÁLOGO'}</div><p className="detail-make">{vehicle.brand}</p><h1>{vehicle.model}</h1><div className="detail-price">{formatCurrency(vehicle.price)}</div><div className="detail-meta"><span><b>{vehicle.year}</b>Ano</span><span><b>{vehicle.mileage.toLocaleString('pt-BR')} km</b>Quilometragem</span><span><b>{vehicle.vehicleType === 'Moto' ? vehicle.motorcycleCategory : vehicle.category}</b>{vehicle.vehicleType === 'Moto' ? 'Categoria' : 'Carroceria'}</span></div><p className="detail-description">{vehicle.description}</p><button className="button button-dark detail-cta" onClick={onAppointment}>Tenho interesse <span>↗</span></button><p className="detail-demo">{vehicle.demoOnly ? 'Exemplo fictício: não representa anúncio ou unidade disponível para compra.' : 'Confirme com a Lions a disponibilidade e as especificações atualizadas.'}</p></aside>
    </div>
    <div className="detail-information"><div><div className="eyebrow"><i/> FICHA DO VEÍCULO</div><h2>Informações do <em>anúncio.</em></h2><div className="spec-grid"><div><span>Marca</span><strong>{vehicle.brand}</strong></div><div><span>Modelo</span><strong>{vehicle.model}</strong></div><div><span>Ano modelo</span><strong>{vehicle.year}</strong></div><div><span>Quilometragem</span><strong>{vehicle.mileage.toLocaleString('pt-BR')} km</strong></div>{vehicle.vehicleType === 'Moto' ? <><div><span>Categoria da moto</span><strong>{vehicle.motorcycleCategory}</strong></div><div><span>Cilindrada</span><strong>{vehicle.displacementCc} cm³</strong></div><div><span>Combustível</span><strong>{vehicle.fuel}</strong></div></> : <div><span>Carroceria</span><strong>{vehicle.category}</strong></div>}<div><span>Cor anunciada</span><strong>{vehicle.color}</strong></div><div><span>Preço anunciado</span><strong>{formatCurrency(vehicle.price)}</strong></div></div></div><div className="feature-list"><h3>Descrição técnica</h3><p>{vehicle.technicalDescription}</p><h3>{vehicle.vehicleType === 'Moto' ? 'Peças e acessórios adicionais' : 'Opcionais'}</h3>{vehicle.vehicleType === 'Moto' ? vehicle.additionalParts.length ? <ul>{vehicle.additionalParts.map(part => <li key={part}><span>＋</span>{part}</li>)}</ul> : <p>O anúncio não informa peças ou acessórios adicionais. Consulte a loja para confirmar os itens instalados nesta unidade.</p> : <p>O veículo pode contar com itens opcionais de conforto, tecnologia e segurança conforme a configuração anunciada. A lista e a disponibilidade de cada item variam por unidade; confirme os opcionais presentes neste carro diretamente com a Lions.</p>}</div></div>
  </section>
}
