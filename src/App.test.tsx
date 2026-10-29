import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { vehicleService } from './features/vehicles/vehicleService'
import { requestAppointment } from './features/appointments/appointmentService'
import type { Vehicle } from './features/vehicles/types'

vi.mock('./features/vehicles/vehicleService', () => ({ vehicleService: { list: vi.fn() } }))
vi.mock('./features/appointments/appointmentService', () => ({ requestAppointment: vi.fn() }))
const sampleVehicles: Vehicle[] = [
  { id: 'a', brand: 'BMW', model: 'X1 sDrive20i M Sport', year: 2023, mileage: 18000, price: 259900, category: 'SUV', image: 'https://example.com/x1.jpg', images: ['https://example.com/x1.jpg', 'https://example.com/x1-side.jpg'], featured: true, color: 'Cinza', vehicleType: 'Carro', fuel: 'Flex', additionalParts: [], description: 'Veículo demonstrativo.', technicalDescription: 'Motor 2.0.' },
  { id: 'b', brand: 'Audi', model: 'A3 Sedan', year: 2022, mileage: 22000, price: 199900, category: 'Sedan', image: 'https://example.com/a3.jpg', images: ['https://example.com/a3.jpg'], featured: false, color: 'Preto', vehicleType: 'Carro', fuel: 'Flex', additionalParts: [], description: 'Veículo demonstrativo.', technicalDescription: 'Motor 1.4.' },
  { id: 'c', brand: 'BMW', model: 'G 310 GS', year: 2023, mileage: 4595, price: 27390, category: 'Moto', image: 'https://example.com/g310.jpg', images: ['https://example.com/g310.jpg'], featured: false, color: 'Preta', vehicleType: 'Moto', fuel: 'Gasolina', motorcycleCategory: 'Trail', displacementCc: 313, additionalParts: [], description: 'Moto demonstrativa.', technicalDescription: 'Motor 313 cm³.' },
]
const listMock = vi.mocked(vehicleService.list)
afterEach(() => { cleanup(); vi.clearAllMocks() })

describe('experiência Lions', () => {
  it('filtra por tipo de veículo e marca', async () => {
    listMock.mockResolvedValue(sampleVehicles)
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Catálogo' }))
    fireEvent.click(screen.getByRole('button', { name: 'Motos' }))
    expect(await screen.findByRole('heading', { name: 'G 310 GS' })).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Filtrar categoria de moto'), { target: { value: 'Trail' } })
    fireEvent.change(screen.getByLabelText('Cilindrada mínima em cc'), { target: { value: '300' } })
    expect(screen.getByRole('heading', { name: 'G 310 GS' })).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Cilindrada mínima em cc'), { target: { value: '400' } })
    expect(screen.getByText('Nenhum veículo encontrado')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Limpar filtros ↺' }))
    fireEvent.click(screen.getByRole('button', { name: 'Carros' }))
    fireEvent.change(screen.getByLabelText('Filtrar marca'), { target: { value: 'Audi' } })
    expect(screen.getByRole('heading', { name: 'A3 Sedan' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'X1 sDrive20i M Sport' })).not.toBeInTheDocument()
  })

  it('abre detalhes do veículo com fotos e ficha técnica', async () => {
    listMock.mockResolvedValue(sampleVehicles)
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Catálogo' }))
    fireEvent.click(await screen.findByRole('button', { name: 'Ver detalhes de BMW X1 sDrive20i M Sport' }))
    expect(screen.getByRole('heading', { name: 'Informações do anúncio.' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Ver foto 2' }))
    expect(screen.getByRole('img', { name: /foto 2/ })).toHaveAttribute('src', 'https://example.com/x1-side.jpg')
    fireEvent.click(screen.getByRole('button', { name: 'Tenho interesse ↗' }))
    expect(screen.getByLabelText(/Veículo de interesse/)).toHaveValue('X1 sDrive20i M Sport')
  })

  it('filtra o catálogo por texto e categoria e informa quando não há resultados', async () => {
    listMock.mockResolvedValue(sampleVehicles)
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Catálogo' }))
    expect(await screen.findByRole('heading', { name: 'X1 sDrive20i M Sport' })).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Buscar veículos'), { target: { value: 'audi' } })
    expect(screen.getByRole('heading', { name: 'A3 Sedan' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'X1 sDrive20i M Sport' })).not.toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Filtrar categoria'), { target: { value: 'Hatch' } })
    expect(screen.getByText('Nenhum veículo encontrado')).toBeInTheDocument()
  })

  it('mostra o estado de carregamento e trata falha do catálogo', async () => {
    listMock.mockImplementation(() => new Promise((_, reject) => setTimeout(() => reject(new Error('offline')), 30)))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Catálogo' }))
    expect(screen.getByText('Carregando nossa seleção…')).toBeInTheDocument()
    expect(await screen.findByText(/Não foi possível carregar o catálogo/)).toBeInTheDocument()
  })

  it('valida campos obrigatórios e envia a solicitação válida', async () => {
    listMock.mockResolvedValue(sampleVehicles)
    vi.mocked(requestAppointment).mockResolvedValue({ protocol: 'L-TESTE', receivedAt: new Date().toISOString() })
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Agendar visita ↗' }))
    fireEvent.click(screen.getAllByRole('button', { name: 'Agendar visita ↗' })[1])
    expect(screen.getByRole('alert')).toHaveTextContent('Confira os campos destacados')
    fireEvent.change(screen.getByLabelText('Seu nome'), { target: { value: 'Ana Silva' } })
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'ana@example.com' } })
    fireEvent.change(screen.getByLabelText('Celular'), { target: { value: '(11) 99999-9999' } })
    fireEvent.change(screen.getByLabelText('Data'), { target: { value: '2027-01-14' } })
    fireEvent.change(screen.getByLabelText('Horário'), { target: { value: '10:30' } })
    fireEvent.click(screen.getAllByRole('button', { name: 'Agendar visita ↗' })[1])
    await waitFor(() => expect(requestAppointment).toHaveBeenCalledWith({ name: 'Ana Silva', email: 'ana@example.com', phone: '(11) 99999-9999', date: '2027-01-14', time: '10:30', vehicle: '' }))
    expect(await screen.findByText(/Esta é uma demonstração/)).toBeInTheDocument()
  })
})



