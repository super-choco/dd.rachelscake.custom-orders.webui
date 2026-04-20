import { useState } from 'react'
import PersonalData from './sections/PersonalData'
import OrderItems from './sections/OrderItems'
import Delivery from './sections/Delivery'
import ContactInfo from './sections/ContactInfo'
import Terms from './Terms'

const INITIAL = {
  clientName: '', clientEmail: '', clientPhone: '',
  orderTypeCake: false,
  cakeName: '', cakeAge: '', cakeTopic: '', cakeDetails: '',
  cakeSize: '', cakeType: 'fondant',
  floor1Cake: 'Sin preferencias', floor1Filling: 'Sin preferencias',
  floor2: false, floor2Cake: 'Sin preferencias', floor2Filling: 'Sin preferencias',
  floor3: false, floor3Cake: 'Sin preferencias', floor3Filling: 'Sin preferencias',
  doubleFilling: false,
  orderTypeCupcakes: false, cupcakesNumber: '', cupcakesDetail: '',
  orderTypeCookies: false, cookiesNumber: '', cookiesDetail: '',
  orderTypeOthers: false, othersDetail: '',
  images: [],
  intolerances: [], otherIntolerances: '',
  deliveryDate: '', deliveryType: 'pickUp',
  deliveryAddress: '', deliveryCity: '', deliveryInformation: '',
  contactWay: 'Web', nickName: '',
  acceptNewsletter: false, acceptTerms: false,
}

export default function OrderForm({ onSuccess }) {
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: undefined }))
  }

  function validate() {
    const e = {}
    if (!form.clientName.trim()) e.clientName = 'Campo obligatorio'
    if (!form.clientEmail.trim()) e.clientEmail = 'Campo obligatorio'
    if (!form.clientPhone.trim()) e.clientPhone = 'Campo obligatorio'
    if (!form.orderTypeCake && !form.orderTypeCupcakes && !form.orderTypeCookies && !form.orderTypeOthers)
      e.orderType = 'Selecciona al menos un tipo de pedido'
    if (form.orderTypeCake && !form.cakeSize) e.cakeSize = 'Selecciona el tamaño'
    if (form.orderTypeCupcakes && (!form.cupcakesNumber || parseInt(form.cupcakesNumber) < 1))
      e.cupcakesNumber = 'Indica la cantidad'
    if (form.orderTypeCookies && (!form.cookiesNumber || parseInt(form.cookiesNumber) < 1))
      e.cookiesNumber = 'Indica la cantidad'
    if (form.orderTypeOthers && !form.othersDetail.trim()) e.othersDetail = 'Indica los detalles'
    if (!form.deliveryDate) e.deliveryDate = 'Selecciona una fecha'
    else {
      const today = new Date(); today.setHours(0,0,0,0)
      if (new Date(form.deliveryDate) < today) e.deliveryDate = 'La fecha no puede ser en el pasado'
    }
    if (!form.acceptTerms) e.acceptTerms = 'Debes aceptar los términos'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    const data = new FormData()
    data.append('clientName', form.clientName)
    data.append('clientEmail', form.clientEmail)
    data.append('clientPhone', form.clientPhone)
    if (form.orderTypeCake) {
      data.append('orderTypeCakeCb', 'cake')
      data.append('cakeName', form.cakeName)
      data.append('cakeAge', form.cakeAge)
      data.append('cakeTopic', form.cakeTopic)
      data.append('cakeDetails', form.cakeDetails)
      data.append('cakeSize', form.cakeSize)
      data.append('cakeType', form.cakeType)
      data.append('floor1Cake', form.floor1Cake)
      data.append('floor1Filling', form.floor1Filling)
      if (form.floor2) {
        data.append('floorNumber2Cb', '2')
        data.append('floor2Cake', form.floor2Cake)
        data.append('floor2Filling', form.floor2Filling)
        if (form.floor3) {
          data.append('floorNumber3Cb', '3')
          data.append('floor3Cake', form.floor3Cake)
          data.append('floor3Filling', form.floor3Filling)
        }
      }
      if (form.doubleFilling) data.append('doubleFilling', '1')
    }
    if (form.orderTypeCupcakes) {
      data.append('orderTypeCupcakesCb', 'cupcakes')
      data.append('cupcakesNumber', form.cupcakesNumber)
      data.append('cupcakesDetail', form.cupcakesDetail)
    }
    if (form.orderTypeCookies) {
      data.append('orderTypeCookiesCb', 'cookies')
      data.append('cookiesNumber', form.cookiesNumber)
      data.append('cookiesDetail', form.cookiesDetail)
    }
    if (form.orderTypeOthers) {
      data.append('orderTypeOthersCb', 'others')
      data.append('othersDetail', form.othersDetail)
    }
    form.intolerances.forEach(v => data.append('intolerancesCheck[]', v))
    data.append('otherIntolerances', form.otherIntolerances)
    form.images.forEach(f => data.append('images[]', f))
    data.append('deliveryDate', form.deliveryDate)
    data.append('deliveryType', form.deliveryType)
    if (form.deliveryType === 'home') {
      data.append('deliveryAddress', form.deliveryAddress)
      data.append('deliveryCity', form.deliveryCity)
      data.append('deliveryInformation', form.deliveryInformation)
    }
    data.append('contactWay', form.contactWay)
    data.append('nickName', form.nickName)
    if (form.acceptTerms) data.append('acceptTerms', 'accepted')
    if (form.acceptNewsletter) data.append('acceptNewsletter', 'accepted')

    try {
      const res = await fetch('/api/php/orders.php', { method: 'POST', body: data })
      const text = await res.text()
      const result = JSON.parse(text)
      onSuccess(result)
    } catch {
      onSuccess('ko')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Confirma tu pedido</h1>
      <PersonalData form={form} set={set} errors={errors} />
      <OrderItems form={form} set={set} errors={errors} />
      <Delivery form={form} set={set} errors={errors} />
      <ContactInfo form={form} set={set} errors={errors} />
      <div className="card">
        <label className="check-label">
          <input type="checkbox" checked={form.acceptNewsletter}
            onChange={e => set('acceptNewsletter', e.target.checked)} />
          Deseo recibir la newsletter con información y promociones
        </label>
        <label className="check-label" style={{ marginTop: '0.5rem' }}>
          <input type="checkbox" checked={form.acceptTerms}
            onChange={e => set('acceptTerms', e.target.checked)} />
          Acepto los <a href="#terms" style={{ color: 'var(--color-primary-dark)' }}>términos y condiciones</a>
        </label>
        {errors.acceptTerms && <p className="error-msg">{errors.acceptTerms}</p>}
        <button className="btn-submit" type="submit" disabled={loading} style={{ marginTop: '1.5rem' }}>
          {loading ? 'Enviando...' : 'Confirmar pedido'}
        </button>
      </div>
      <Terms />
    </form>
  )
}
