import { lazy, Suspense, type ReactNode } from 'react'

const HomeRoute = lazy(() => import('./pages').then(module => ({ default: module.HomeRoute })))
const CatalogRoute = lazy(() => import('./pages').then(module => ({ default: module.CatalogRoute })))
const VehicleDetailRoute = lazy(() => import('./pages').then(module => ({ default: module.VehicleDetailRoute })))
const AppointmentRoute = lazy(() => import('./pages').then(module => ({ default: module.AppointmentRoute })))
const NotFoundRoute = lazy(() => import('./pages').then(module => ({ default: module.NotFoundRoute })))

function RouteLoading() {
  return <div className="notice" role="status">Carregando página…</div>
}

function RouteBoundary({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteLoading />}>{children}</Suspense>
}

export function LazyHomeRoute() {
  return <RouteBoundary><HomeRoute /></RouteBoundary>
}

export function LazyCatalogRoute() {
  return <RouteBoundary><CatalogRoute /></RouteBoundary>
}

export function LazyVehicleDetailRoute() {
  return <RouteBoundary><VehicleDetailRoute /></RouteBoundary>
}

export function LazyAppointmentRoute() {
  return <RouteBoundary><AppointmentRoute /></RouteBoundary>
}

export function LazyNotFoundRoute() {
  return <RouteBoundary><NotFoundRoute /></RouteBoundary>
}
