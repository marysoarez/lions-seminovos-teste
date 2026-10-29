import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router'
import { AppointmentPage } from '../features/appointments/components/appointment-page'
import { requestAppointment } from '../features/appointments/services/appointment-service'
import { HomePage } from '../features/home/home-page'
import { CatalogPage } from '../features/vehicles/components/catalog-page'
import { VehicleDetail } from '../features/vehicles/components/vehicle-detail'
import type { AppOutletContext } from './AppLayout'

export function HomeRoute() {
  const { vehicles } = useOutletContext<AppOutletContext>()
  const navigate = useNavigate()
  return <HomePage vehicles={vehicles} onNavigate={page => navigate(page === 'vehicles' ? '/catalogo' : '/agendar')} onSelectVehicle={vehicle => navigate(`/veiculo/${vehicle.id}`)} />
}

export function CatalogRoute() {
  const { vehicles, loading, error } = useOutletContext<AppOutletContext>()
  const navigate = useNavigate()
  return <CatalogPage vehicles={vehicles} loading={loading} error={error} onSelectVehicle={vehicle => navigate(`/veiculo/${vehicle.id}`)} />
}

export function VehicleDetailRoute() {
  const { vehicles, loading, error } = useOutletContext<AppOutletContext>()
  const { vehicleId } = useParams()
  const navigate = useNavigate()
  const vehicle = vehicles.find(item => item.id === vehicleId)
  if (loading) return <div className="notice">Carregando detalhes do veículo…</div>
  if (error) return <div className="notice error">Não foi possível carregar os detalhes do veículo.</div>
  if (!vehicle) return <section className="empty container"><h1>Veículo não encontrado</h1><p>O anúncio pode ter sido removido ou o endereço está incorreto.</p><button className="text-link" onClick={() => navigate('/catalogo')}>Voltar ao catálogo ↗</button></section>
  return <VehicleDetail vehicle={vehicle} onBack={() => navigate('/catalogo')} onAppointment={() => navigate(`/agendar?veiculo=${encodeURIComponent(vehicle.id)}`)} />
}

export function AppointmentRoute() {
  const { vehicles } = useOutletContext<AppOutletContext>()
  const [searchParams] = useSearchParams()
  const vehicleId = searchParams.get('veiculo')
  const initialVehicle = vehicles.find(vehicle => vehicle.id === vehicleId)?.model ?? ''
  return <AppointmentPage key={vehicleId ?? 'general'} initialVehicle={initialVehicle} onSubmit={requestAppointment} />
}

export function NotFoundRoute() {
  const navigate = useNavigate()
  return <section className="empty container"><h1>Página não encontrada</h1><p>O endereço informado não corresponde a uma página deste catálogo.</p><button className="text-link" onClick={() => navigate('/')}>Voltar ao início ↗</button></section>
}

