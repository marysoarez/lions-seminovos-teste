import { useState, type FormEvent } from 'react'
import type { AppointmentInput } from '../types'

interface AppointmentPageProps {
  onSubmit: (input: AppointmentInput) => Promise<{ protocol: string }>
  initialVehicle: string
}

export function AppointmentPage({ onSubmit, initialVehicle }: AppointmentPageProps) {
  const [minimumDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
    const input: AppointmentInput = {
      name: String(form.get('name') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      phone: String(form.get('phone') ?? '').trim(),
      date: String(form.get('date') ?? ''),
      time: String(form.get('time') ?? ''),
      vehicle: String(form.get('vehicle') ?? '').trim(),
    }
    if (input.name.length < 2 || !/^\S+@\S+\.\S+$/.test(input.email) || input.phone.replace(/\D/g, '').length < 10 || !input.date || !input.time) {
      setError('Confira os campos destacados e tente novamente.')
      return
    }
    setBusy(true)
    try {
      await onSubmit(input)
      setSubmitted(true)
    } catch {
      setError('Não foi possível enviar agora. Tente novamente.')
    } finally {
      setBusy(false)
    }
  }

  return <section className="appointment container"><div className="appointment-copy"><div className="eyebrow"><i/> AGENDE UMA VISITA</div><h1>Venha conhecer<br/>nossos veículos <em>de perto.</em></h1><p>Escolha o melhor dia e horário para visitar a Lions. Nossa equipe estará pronta para apresentar os veículos e ajudar você a encontrar o seminovo ideal.</p><div className="appointment-detail"><span>01</span><div><strong>Conheça nossos veículos</strong><p>Veja de perto os detalhes do veículo que chamou sua atenção.</p></div></div><div className="appointment-detail"><span>02</span><div><strong>Atendimento da equipe Lions</strong><p>Converse com nossa equipe durante sua visita.</p></div></div></div><div className="form-panel">{submitted ? <div className="success"><div className="success-mark">✓</div><div className="eyebrow"><i/> SOLICITAÇÃO RECEBIDA</div><h2>Obrigado pelo<br/><em>seu interesse.</em></h2><p>Nossa equipe entrará em contato para confirmar os detalhes da visita.</p><div className="demo-note">Esta é uma demonstração. Nenhuma reserva real foi registrada e seus dados não foram armazenados.</div></div> : <><div className="form-heading"><div className="eyebrow"><i/> AGENDAR UMA VISITA</div><h2>Vamos receber você.</h2><p>Informe seus dados e a preferência de horário. Nossa equipe entrará em contato para confirmar a visita.</p></div><form onSubmit={handleSubmit} noValidate>{error && <div className="form-error" role="alert">{error}</div>}<label>Seu nome<input name="name" placeholder="Como podemos chamar você?" required minLength={2}/></label><div className="form-row"><label>E-mail<input name="email" type="email" placeholder="voce@email.com" required/></label><label>Celular<input name="phone" type="tel" placeholder="(21) 99999-9999" required minLength={10}/></label></div><label>Veículo de interesse <span className="optional">OPCIONAL</span><input name="vehicle" placeholder="Marca e modelo" defaultValue={initialVehicle}/></label><div className="form-row"><label>Data<input name="date" type="date" required min={minimumDate}/></label><label>Horário<select name="time" required defaultValue=""><option value="" disabled>Selecione</option><option>09:00</option><option>10:30</option><option>13:00</option><option>14:30</option><option>16:00</option><option>17:00</option></select></label></div><button className="button button-dark submit" disabled={busy}>{busy ? 'Enviando…' : 'Agendar visita'} <span>↗</span></button><p className="privacy">Ao enviar, você concorda em ser contatado pela Lions Seminovos para tratar da sua visita.</p><p className="demo-note">Demonstração: sua solicitação não cria uma reserva real.</p></form></>}</div></section>
}
