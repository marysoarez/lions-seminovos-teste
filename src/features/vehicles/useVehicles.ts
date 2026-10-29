import { useEffect, useState } from 'react'
import { vehicleService } from './vehicleService'
import type { Vehicle } from './types'

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    let active = true
    vehicleService.list().then(data => { if (active) setVehicles(data) }).catch(() => { if (active) setError(true) }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])
  return { vehicles, loading, error }
}
