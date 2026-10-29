import { vehicles } from './vehicleMock'
import type { VehicleRepository } from './types'

export const mockVehicleRepository: VehicleRepository = {
  async list() {
    await new Promise(resolve => setTimeout(resolve, 350))
    return vehicles.map(vehicle => ({ ...vehicle }))
  },
}
