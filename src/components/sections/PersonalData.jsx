export default function PersonalData({ form, set, errors }) {
  return (
    <div className="card">
      <h2>1. Datos personales</h2>
      <div className="grid-2">
        <div className="field">
          <label>Nombre y apellidos *</label>
          <input type="text" value={form.clientName} onChange={e => set('clientName', e.target.value)} placeholder="Tu nombre completo" />
          {errors.clientName && <p className="error-msg">{errors.clientName}</p>}
        </div>
        <div className="field">
          <label>Teléfono *</label>
          <input type="tel" value={form.clientPhone} onChange={e => set('clientPhone', e.target.value)} placeholder="6XX XXX XXX" />
          {errors.clientPhone && <p className="error-msg">{errors.clientPhone}</p>}
        </div>
      </div>
      <div className="field">
        <label>Email *</label>
        <input type="email" value={form.clientEmail} onChange={e => set('clientEmail', e.target.value)} placeholder="tu@email.com" />
        {errors.clientEmail && <p className="error-msg">{errors.clientEmail}</p>}
      </div>
    </div>
  )
}
