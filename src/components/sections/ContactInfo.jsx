const CONTACT_WAYS = ['Web', 'Whatsapp', 'Facebook', 'Instagram']

export default function ContactInfo({ form, set }) {
  return (
    <div className="card">
      <h2>4. Cómo nos conociste</h2>
      <div className="grid-2">
        <div className="field">
          <label>Canal de contacto</label>
          <select value={form.contactWay} onChange={e => set('contactWay', e.target.value)}>
            {CONTACT_WAYS.map(w => <option key={w}>{w}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Nombre en redes sociales</label>
          <input type="text" value={form.nickName} onChange={e => set('nickName', e.target.value)} placeholder="@usuario" />
        </div>
      </div>
    </div>
  )
}
