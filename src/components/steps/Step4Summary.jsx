import Terms from '../Terms'

function Row({ label, value }) {
  if (!value) return null
  return (
    <div className="summary-row">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

export default function Step4Summary({ form, set, errors, loading, onBack }) {
  const orderTypes = [
    form.orderTypeCake && 'Pastel',
    form.orderTypeCupcakes && 'Cupcakes',
    form.orderTypeCookies && 'Galletas',
    form.orderTypeOthers && 'Otros',
  ].filter(Boolean).join(', ')

  const allergens = [
    ...form.intolerances,
    form.otherIntolerances,
  ].filter(Boolean).join(', ')

  const deliveryLabel = form.deliveryType === 'pickUp'
    ? 'Recogida en tienda (Montmeló)'
    : `Domicilio: ${[form.deliveryAddress, form.deliveryCity].filter(Boolean).join(', ')}`

  return (
    <>
      <div className="card">
        <h2>Resumen del pedido</h2>

        <div className="summary-section">
          <h3>Datos personales</h3>
          <Row label="Nombre" value={form.clientName} />
          <Row label="Email" value={form.clientEmail} />
          <Row label="Teléfono" value={form.clientPhone} />
          <Row label="Fecha" value={form.deliveryDate ? form.deliveryDate.split('-').reverse().join('/') : ''} />
        </div>

        <div className="summary-section">
          <h3>Pedido</h3>
          <Row label="Tipo" value={orderTypes} />
          {form.orderTypeCake && <>
            <Row label="Tamaño" value={form.cakeSize} />
            <Row label="Cobertura" value={form.cakeType === 'fondant' ? 'Fondant' : 'Buttercream'} />
            {form.cakeTopic && <Row label="Temática" value={form.cakeTopic} />}
            {form.cakeName && <Row label="Nombre en pastel" value={`${form.cakeName}${form.cakeAge ? `, ${form.cakeAge} años` : ''}`} />}
            <Row label="Bizcocho (1er piso)" value={form.floor1Cake} />
            <Row label="Relleno (1er piso)" value={form.floor1Filling} />
            {form.floor2 && <Row label="Bizcocho (2º piso)" value={form.floor2Cake} />}
            {form.floor2 && <Row label="Relleno (2º piso)" value={form.floor2Filling} />}
            {form.floor3 && <Row label="Bizcocho (3er piso)" value={form.floor3Cake} />}
            {form.floor3 && <Row label="Relleno (3er piso)" value={form.floor3Filling} />}
            {form.doubleFilling && <Row label="Doble relleno" value="Sí" />}
          </>}
          {form.orderTypeCupcakes && <Row label="Cupcakes" value={`${form.cupcakesNumber} uds.`} />}
          {form.orderTypeCupcakes && form.cupcakesDetail && <Row label="Detalle cupcakes" value={form.cupcakesDetail} />}
          {form.orderTypeCookies && <Row label="Galletas" value={`${form.cookiesNumber} uds.`} />}
          {form.orderTypeCookies && form.cookiesDetail && <Row label="Detalle galletas" value={form.cookiesDetail} />}
          {allergens && <Row label="Alergias" value={allergens} />}
          {form.images.length > 0 && <Row label="Imágenes adjuntas" value={`${form.images.length} archivo(s)`} />}
        </div>

        <div className="summary-section">
          <h3>Entrega</h3>
          <Row label="Modalidad" value={deliveryLabel} />
        </div>

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.2rem', marginTop: '0.5rem' }}>
          <label className="check-label">
            <input type="checkbox" checked={form.acceptNewsletter}
              onChange={e => set('acceptNewsletter', e.target.checked)} />
            Deseo recibir la newsletter con información y promociones
          </label>
          <label className="check-label" style={{ marginTop: '0.6rem' }}>
            <input type="checkbox" checked={form.acceptTerms}
              onChange={e => set('acceptTerms', e.target.checked)} />
            Acepto los <a href="#terms" style={{ color: 'var(--color-primary-dark)', marginLeft: '0.25rem' }}>términos y condiciones</a>
          </label>
          {errors.acceptTerms && <p className="error-msg">{errors.acceptTerms}</p>}
        </div>

        <div className="wizard-nav">
          <button type="button" className="btn-back" onClick={onBack}>← Atrás</button>
          <button className="btn-submit" type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Confirmar pedido'}
          </button>
        </div>
      </div>

      <Terms />
    </>
  )
}
