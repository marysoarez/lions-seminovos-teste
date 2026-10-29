import { mockVehicleRepository } from './vehicle-repository'

export const vehicleService = { list: () => mockVehicleRepository.list() }
