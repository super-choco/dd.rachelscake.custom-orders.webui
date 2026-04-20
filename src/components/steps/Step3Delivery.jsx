export default function Step3Delivery({ form, set }) {
  return (
    <div className="card">
      <h2>Recogida o entrega</h2>
      <div style={{ marginBottom: '1.2rem' }}>
        <label className="check-label">
          <input type="radio" name="deliveryType" value="pickUp"
            checked={form.deliveryType === 'pickUp'} onChange={() => set('deliveryType', 'pickUp')} />
          <div>
            <strong>Recoger en tienda</strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>C/Federico García Lorca, 6 · Montmeló</p>
          </div>
        </label>
        <label className="check-label" style={{ marginTop: '0.6rem' }}>
          <input type="radio" name="deliveryType" value="home"
            checked={form.deliveryType === 'home'} onChange={() => set('deliveryType', 'home')} />
          <div>
            <strong>A domicilio</strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>Consultar suplemento según zona</p>
          </div>
        </label>
      </div>

      {form.deliveryType === 'home' && (
        <div className="sub-section">
          <div className="grid-2">
            <div className="field">
              <label>Dirección</label>
              <input type="text" value={form.deliveryAddress}
                onChange={e => set('deliveryAddress', e.target.value)}
                placeholder="Calle, número, piso..." />
            </div>
            <div className="field">
              <label>Población</label>
              <input type="text" value={form.deliveryCity}
                onChange={e => set('deliveryCity', e.target.value)}
                placeholder="Ciudad" />
            </div>
          </div>
          <div className="field">
            <label>Información adicional para la entrega</label>
            <textarea value={form.deliveryInformation}
              onChange={e => set('deliveryInformation', e.target.value)}
              placeholder="Llama antes de entregar, horario, vecino, etc." />
          </div>
        </div>
      )}
    </div>
  )
}
