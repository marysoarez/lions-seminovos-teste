export type VehicleCategory = 'SUV' | 'Sedan' | 'Hatch' | 'Minivan' | 'Moto'
export type VehicleType = 'Carro' | 'Moto'
export type MotorcycleCategory = 'Naked' | 'Trail' | 'Street' | 'Custom' | 'Scooter' | 'Esportiva'
export interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  mileage: number
  price: number
  category: VehicleCategory
  image: string
  images: string[]
  color: string
  vehicleType: VehicleType
  fuel: string
  motorcycleCategory?: MotorcycleCategory
  displacementCc?: number
  additionalParts: string[]
  demoOnly?: boolean
  featured: boolean
  description: string
  technicalDescription: string
}
export interface VehicleRepository { list(): Promise<Vehicle[]> }
