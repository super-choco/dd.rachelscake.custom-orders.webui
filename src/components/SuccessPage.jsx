export default function SuccessPage({ result }) {
  if (result === 'ok') {
    return (
      <div className="success-box">
        <div className="icon">🎂</div>
        <h1>¡Pedido confirmado!</h1>
        <p>Hemos recibido tu pedido correctamente.</p>
        <p>En breve recibirás un email de confirmación con todos los detalles.</p>
        <p>Recuerda enviar el comprobante de pago por WhatsApp para que quede confirmado.</p>
      </div>
    )
  }
  return (
    <div className="success-box">
      <div className="icon">😕</div>
      <h1>Algo ha ido mal</h1>
      <p>No hemos podido procesar tu pedido. Por favor, contáctanos directamente.</p>
      <p>info@rachelscake.es · 669 037 577</p>
    </div>
  )
}
