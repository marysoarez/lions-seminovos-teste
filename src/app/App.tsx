import { createBrowserRouter, RouterProvider } from 'react-router'
import { createRouteDefinitions } from './routes'

const router = createBrowserRouter(createRouteDefinitions())

export default function App() {
  return <RouterProvider router={router} />
}
