import { useState } from 'react'
import OrderForm from './components/OrderForm'
import SuccessPage from './components/SuccessPage'

export default function App() {
  const [submitted, setSubmitted] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)

  function handleSuccess(result) {
    setSubmitResult(result)
    setSubmitted(true)
  }

  return (
    <>
      <header>
        <img src="/img/new-logo.svg" alt="Rachel's Cake" />
      </header>
      <main className="page">
        {submitted
          ? <SuccessPage result={submitResult} />
          : <OrderForm onSuccess={handleSuccess} />
        }
      </main>
      <footer>
        <p>© Rachel's Cake 2025</p>
        <p>Raquel Zamora Cabeza · C/Federico García Lorca, 6 · 08160 Montmeló (BCN)</p>
        <p>info@rachelscake.es · 669 037 577</p>
      </footer>
    </>
  )
}
