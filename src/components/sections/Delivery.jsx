export default function Delivery({ form, set, errors }) {
  return (
    <div className="card">
      <h2>3. Recogida / Entrega</h2>
      <div className="field">
        <label>Fecha *</label>
        <input type="date" value={form.deliveryDate} onChange={e => set('deliveryDate', e.target.value)}
          min={new Date().toISOString().split('T')[0]} />
        {errors.deliveryDate && <p className="error-msg">{errors.deliveryDate}</p>}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label className="check-label">
          <input type="radio" name="deliveryType" value="pickUp"
            checked={form.deliveryType === 'pickUp'} onChange={() => set('deliveryType', 'pickUp')} />
          Recoger en tienda (Montmeló)
        </label>
        <label className="check-label" style={{ marginTop: '0.4rem' }}>
          <input type="radio" name="deliveryType" value="home"
            checked={form.deliveryType === 'home'} onChange={() => set('deliveryType', 'home')} />
          A domicilio <span style={{ color: 'var(--color-muted)', fontSize: '0.88rem' }}>(consultar suplemento)</span>
        </label>
      </div>
      {form.deliveryType === 'home' && (
        <div className="sub-section" style={{ marginTop: '1rem' }}>
          <div className="grid-2">
            <div className="field">
              <label>Dirección</label>
              <input type="text" value={form.deliveryAddress} onChange={e => set('deliveryAddress', e.target.value)} placeholder="Calle, número, piso..." />
            </div>
            <div className="field">
              <label>Población</label>
              <input type="text" value={form.deliveryCity} onChange={e => set('deliveryCity', e.target.value)} placeholder="Ciudad" />
            </div>
          </div>
          <div className="field">
            <label>Información adicional para la entrega</label>
            <textarea value={form.deliveryInformation} onChange={e => set('deliveryInformation', e.target.value)}
              placeholder="Llama antes de entregar, horario, vecino, etc." />
          </div>
        </div>
      )}
    </div>
  )
}
