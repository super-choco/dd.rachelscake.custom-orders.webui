import { useState } from 'react'
import Stepper from './Stepper'
import Step1Personal from './steps/Step1Personal'
import Step2Order from './steps/Step2Order'
import Step3Delivery from './steps/Step3Delivery'
import Step4Summary from './steps/Step4Summary'

const INITIAL = {
  clientName: '', clientEmail: '', clientPhone: '',
  deliveryDate: '',
  orderTypeCake: false, isBirthday: false,
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
  deliveryType: 'pickUp',
  deliveryAddress: '', deliveryCity: '', deliveryInformation: '',
  contactWay: 'Web', nickName: '',
  acceptNewsletter: false, acceptTerms: false,
}

function validateStep(step, form) {
  const e = {}
  if (step === 0) {
    if (!form.clientName.trim()) e.clientName = 'Campo obligatorio'
    if (!form.clientEmail.trim()) e.clientEmail = 'Campo obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.clientEmail)) e.clientEmail = 'Formato de email no válido'
    if (!form.clientPhone.trim()) e.clientPhone = 'Campo obligatorio'
    else if (!/^[+]?[\d\s\-()]{9,15}$/.test(form.clientPhone.trim())) e.clientPhone = 'Formato de teléfono no válido'
    if (!form.deliveryDate) e.deliveryDate = 'Selecciona una fecha'
    else {
      const today = new Date(); today.setHours(0, 0, 0, 0)
      if (new Date(form.deliveryDate) < today) e.deliveryDate = 'La fecha no puede ser en el pasado'
    }
  }
  if (step === 1) {
    if (!form.orderTypeCake && !form.orderTypeCupcakes && !form.orderTypeCookies && !form.orderTypeOthers)
      e.orderType = 'Selecciona al menos un tipo de pedido'
    if (form.orderTypeCake && !form.cakeSize) e.cakeSize = 'Selecciona el tamaño'
    if (form.orderTypeCupcakes && (!form.cupcakesNumber || parseInt(form.cupcakesNumber) < 1))
      e.cupcakesNumber = 'Indica la cantidad'
    if (form.orderTypeCookies && (!form.cookiesNumber || parseInt(form.cookiesNumber) < 1))
      e.cookiesNumber = 'Indica la cantidad'
    if (form.orderTypeOthers && !form.othersDetail.trim()) e.othersDetail = 'Indica los detalles'
  }
  if (step === 3) {
    if (!form.acceptTerms) e.acceptTerms = 'Debes aceptar los términos'
  }
  return e
}

export default function OrderForm({ onSuccess }) {
  const [form, setForm] = useState(INITIAL)
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: undefined }))
  }

  function handleNext() {
    const errs = validateStep(step, form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStep(s => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBack() {
    setErrors({})
    setStep(s => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validateStep(3, form)
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
      const res = await fetch(`${import.meta.env.BASE_URL}api/php/orders.php`, { method: 'POST', body: data })
      const result = JSON.parse(await res.text())
      onSuccess(result)
    } catch {
      onSuccess('ko')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    <Step1Personal form={form} set={set} errors={errors} />,
    <Step2Order form={form} set={set} errors={errors} />,
    <Step3Delivery form={form} set={set} />,
    <Step4Summary form={form} set={set} errors={errors} loading={loading} onBack={handleBack} />,
  ]

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Confirma tu pedido</h1>
      <Stepper current={step} />
      {steps[step]}
      {step < 3 && (
        <div className="wizard-nav">
          {step > 0 && (
            <button type="button" className="btn-back" onClick={handleBack}>← Atrás</button>
          )}
          <button type="button" className="btn-next" onClick={handleNext}>Siguiente →</button>
        </div>
      )}
    </form>
  )
}
