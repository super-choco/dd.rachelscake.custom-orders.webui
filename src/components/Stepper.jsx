const STEPS = ['Tus datos', 'Pedido', 'Entrega', 'Confirmar']

export default function Stepper({ current }) {
  return (
    <div className="stepper">
      {STEPS.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : ''
        return (
          <div key={i} className={`step-item ${state}`}>
            <div className="step-circle">
              {i < current ? '✓' : i + 1}
            </div>
            <span className="step-label">{label}</span>
          </div>
        )
      })}
    </div>
  )
}
