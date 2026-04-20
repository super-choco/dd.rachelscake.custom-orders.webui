const CAKE_SIZES = [
  'Pequeño (de 5 a 6 raciones) - 12cm',
  'Estándar (de 7 a 12 raciones) - 15cm',
  'Grande (15 raciones) - 18cm',
  'Plancha rectangular (20 raciones)',
  '2 pisos (20 raciones) - 18 y 12cm',
  '2 pisos (30 raciones) - 20 y 15cm',
  'Plancha rectangular (30 raciones)',
  '2 pisos (35 raciones) - 23 y 12cm',
  '2 pisos (40 raciones) - 23 y 15cm',
  '2 pisos (45 raciones) - 23 y 20cm',
  '3 pisos (50 raciones) - 23, 18 y 12cm',
  'Otros (+50 raciones)',
]
const CAKE_FLAVORS = [
  'Sin preferencias', 'Vainilla', 'Chocolate', 'Naranja', 'Limón',
  'Carrot Cake (*)', 'Red Velvet (*)', 'Cerveza Negra (*)',
  'Colores Varios (*)', 'Pasteles piñata (*)',
]
const FILLINGS = [
  'Sin preferencias', 'Chocolate blanco', 'Crema suave de chocolate',
  'Nutella', 'Crema de frutos rojos', 'Crema de pistacho (+3€)',
  'Crema de caramelo salado', 'Crema de fresa', 'Crema de Kinder Bueno',
  'Crema de oreo', 'Crema de limón', 'Dulce de leche', 'Crema de queso',
  'Crema de lotus', 'Mermeladas de cualquier tipo',
]
const ALLERGENS = [
  { value: 'gluten', label: 'Glúten' },
  { value: 'lactosa', label: 'Lactosa' },
  { value: 'huevo', label: 'Huevo' },
  { value: 'frutos_secos', label: 'Frutos secos' },
  { value: 'plv', label: 'PLV' },
  { value: 'cacahuete', label: 'Cacahuete' },
  { value: 'soja', label: 'Soja' },
]

function FloorSelect({ label, cakeField, fillingField, form, set }) {
  return (
    <div className="grid-2" style={{ marginTop: '0.75rem' }}>
      <div className="field">
        <label>{label} — Bizcocho</label>
        <select value={form[cakeField]} onChange={e => set(cakeField, e.target.value)}>
          {CAKE_FLAVORS.map(f => <option key={f} value={f.replace(' (*)', '')}>{f}</option>)}
        </select>
      </div>
      <div className="field">
        <label>{label} — Relleno</label>
        <select value={form[fillingField]} onChange={e => set(fillingField, e.target.value)}>
          {FILLINGS.map(f => <option key={f}>{f}</option>)}
        </select>
      </div>
    </div>
  )
}

export default function OrderItems({ form, set, errors }) {
  function toggleAllergen(value) {
    const current = form.intolerances
    set('intolerances', current.includes(value) ? current.filter(v => v !== value) : [...current, value])
  }

  function handleImages(e) {
    const files = Array.from(e.target.files)
    if (files.length > 3) { alert('Máximo 3 imágenes'); e.target.value = ''; return }
    for (const f of files) {
      if (f.size > 5242880) { alert('Cada imagen debe ser menor de 5MB'); e.target.value = ''; return }
      if (!['image/jpeg','image/jpg','image/png','image/gif'].includes(f.type)) {
        alert('Solo se aceptan imágenes (JPEG, PNG, GIF)'); e.target.value = ''; return
      }
    }
    set('images', files)
  }

  return (
    <div className="card">
      <h2>2. Pedido</h2>
      {errors.orderType && <p className="error-msg" style={{ marginBottom: '1rem' }}>{errors.orderType}</p>}

      {/* PASTEL */}
      <div className="order-type-block">
        <label className="check-label">
          <input type="checkbox" checked={form.orderTypeCake} onChange={e => set('orderTypeCake', e.target.checked)} />
          <strong>Pastel</strong>
        </label>
        {form.orderTypeCake && (
          <div className="sub-section">
            <div className="grid-2">
              <div className="field">
                <label>Nombre (si es cumpleaños)</label>
                <input type="text" maxLength={20} value={form.cakeName} onChange={e => set('cakeName', e.target.value)} placeholder="Nombre" />
              </div>
              <div className="field">
                <label>Edad (si es cumpleaños)</label>
                <input type="number" value={form.cakeAge} onChange={e => set('cakeAge', e.target.value)} placeholder="Edad" min={0} />
              </div>
            </div>
            <div className="field">
              <label>Temática</label>
              <input type="text" maxLength={20} value={form.cakeTopic} onChange={e => set('cakeTopic', e.target.value)} placeholder="Ej: Frozen, fútbol, flores..." />
            </div>
            <div className="field">
              <label>Detalles del pastel</label>
              <textarea value={form.cakeDetails} onChange={e => set('cakeDetails', e.target.value)}
                placeholder="Colores, muñecos, fotografía, cualquier detalle importante..." />
            </div>
            <div className="grid-2">
              <div className="field">
                <label>Tamaño *</label>
                <select value={form.cakeSize} onChange={e => set('cakeSize', e.target.value)}>
                  <option value="">Selecciona un tamaño</option>
                  {CAKE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.cakeSize && <p className="error-msg">{errors.cakeSize}</p>}
              </div>
              <div className="field">
                <label>Tipo de cobertura</label>
                <div style={{ paddingTop: '0.5rem' }}>
                  <label className="check-label">
                    <input type="radio" name="cakeType" value="fondant" checked={form.cakeType === 'fondant'} onChange={() => set('cakeType', 'fondant')} />
                    Fondant
                  </label>
                  <label className="check-label">
                    <input type="radio" name="cakeType" value="buttercream" checked={form.cakeType === 'buttercream'} onChange={() => set('cakeType', 'buttercream')} />
                    Buttercream
                  </label>
                </div>
              </div>
            </div>
            <FloorSelect label="1er piso" cakeField="floor1Cake" fillingField="floor1Filling" form={form} set={set} />
            <div className="floor-block">
              <label className="check-label">
                <input type="checkbox" checked={form.floor2} onChange={e => set('floor2', e.target.checked)} />
                Añadir sabores 2º piso
              </label>
              {form.floor2 && <FloorSelect label="2º piso" cakeField="floor2Cake" fillingField="floor2Filling" form={form} set={set} />}
            </div>
            {form.floor2 && (
              <div className="floor-block">
                <label className="check-label">
                  <input type="checkbox" checked={form.floor3} onChange={e => set('floor3', e.target.checked)} />
                  Añadir sabores 3er piso
                </label>
                {form.floor3 && <FloorSelect label="3er piso" cakeField="floor3Cake" fillingField="floor3Filling" form={form} set={set} />}
              </div>
            )}
            <label className="check-label" style={{ marginTop: '0.75rem' }}>
              <input type="checkbox" checked={form.doubleFilling} onChange={e => set('doubleFilling', e.target.checked)} />
              Doble relleno (consultar suplemento)
            </label>
          </div>
        )}
      </div>

      {/* CUPCAKES */}
      <div className="order-type-block">
        <label className="check-label">
          <input type="checkbox" checked={form.orderTypeCupcakes} onChange={e => set('orderTypeCupcakes', e.target.checked)} />
          <strong>Cupcakes</strong>
        </label>
        {form.orderTypeCupcakes && (
          <div className="sub-section">
            <div className="field">
              <label>¿Cuántos quieres? *</label>
              <input type="number" value={form.cupcakesNumber} onChange={e => set('cupcakesNumber', e.target.value)} placeholder="Cantidad" min={1} />
              {errors.cupcakesNumber && <p className="error-msg">{errors.cupcakesNumber}</p>}
            </div>
            <div className="field">
              <label>Cuéntanos tu idea</label>
              <textarea value={form.cupcakesDetail} onChange={e => set('cupcakesDetail', e.target.value)} placeholder="Describe la decoración, colores, temática..." />
            </div>
          </div>
        )}
      </div>

      {/* GALLETAS */}
      <div className="order-type-block">
        <label className="check-label">
          <input type="checkbox" checked={form.orderTypeCookies} onChange={e => set('orderTypeCookies', e.target.checked)} />
          <strong>Galletas</strong>
        </label>
        {form.orderTypeCookies && (
          <div className="sub-section">
            <div className="field">
              <label>¿Cuántas quieres? *</label>
              <input type="number" value={form.cookiesNumber} onChange={e => set('cookiesNumber', e.target.value)} placeholder="Cantidad" min={1} />
              {errors.cookiesNumber && <p className="error-msg">{errors.cookiesNumber}</p>}
            </div>
            <div className="field">
              <label>Cuéntanos tu idea</label>
              <textarea value={form.cookiesDetail} onChange={e => set('cookiesDetail', e.target.value)} placeholder="Describe la decoración, forma, temática..." />
            </div>
          </div>
        )}
      </div>

      {/* OTROS */}
      <div className="order-type-block">
        <label className="check-label">
          <input type="checkbox" checked={form.orderTypeOthers} onChange={e => set('orderTypeOthers', e.target.checked)} />
          <strong>Otros</strong> <span style={{ fontWeight: 400, fontSize: '0.9rem', color: 'var(--color-muted)' }}>(cakepops, piruletas, donuts...)</span>
        </label>
        {form.orderTypeOthers && (
          <div className="sub-section">
            <div className="field">
              <label>Descríbenos tu pedido *</label>
              <textarea value={form.othersDetail} onChange={e => set('othersDetail', e.target.value)} placeholder="Indica qué quieres y cualquier detalle relevante..." />
              {errors.othersDetail && <p className="error-msg">{errors.othersDetail}</p>}
            </div>
          </div>
        )}
      </div>

      {/* IMÁGENES */}
      <div className="field" style={{ marginTop: '1.5rem' }}>
        <label>Adjunta imágenes de referencia (máx. 3, 5MB cada una)</label>
        <input type="file" accept="image/*" multiple onChange={handleImages} />
      </div>

      {/* ALERGIAS */}
      <div style={{ marginTop: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>
          Alergias e intolerancias
        </label>
        <div className="allergens-grid">
          {ALLERGENS.map(a => (
            <label key={a.value} className="check-label">
              <input type="checkbox" checked={form.intolerances.includes(a.value)}
                onChange={() => toggleAllergen(a.value)} />
              {a.label}
            </label>
          ))}
        </div>
        <div className="field" style={{ marginTop: '0.75rem' }}>
          <input type="text" maxLength={50} value={form.otherIntolerances}
            onChange={e => set('otherIntolerances', e.target.value)}
            placeholder="Otras alergias o intolerancias" />
        </div>
      </div>
    </div>
  )
}
