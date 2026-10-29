import type { AppointmentInput, AppointmentResult } from './types'

/** Demonstra envio assíncrono; não armazena os dados nem cria uma reserva real. */
export async function requestAppointment(_input: AppointmentInput): Promise<AppointmentResult> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return { protocol: `L-${Date.now().toString(36).toUpperCase()}`, receivedAt: new Date().toISOString() }
}
