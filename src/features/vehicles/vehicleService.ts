import { mockVehicleRepository } from './vehicleRepository'

export const vehicleService = { list: () => mockVehicleRepository.list() }
