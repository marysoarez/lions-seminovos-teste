import type { RouteObject } from 'react-router'
import { AppLayout } from './AppLayout'
import { LazyAppointmentRoute, LazyCatalogRoute, LazyHomeRoute, LazyNotFoundRoute, LazyVehicleDetailRoute } from './lazy-routes'

export function createRouteDefinitions(): RouteObject[] {
  return [{
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <LazyHomeRoute /> },
      { path: 'catalogo', element: <LazyCatalogRoute /> },
      { path: 'veiculo/:vehicleId', element: <LazyVehicleDetailRoute /> },
      { path: 'agendar', element: <LazyAppointmentRoute /> },
      { path: '*', element: <LazyNotFoundRoute /> },
    ],
  }]
}

