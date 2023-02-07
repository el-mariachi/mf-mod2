interface Health {
  health: number
}

function HealthBar({ health }: Health) {
  return (
    <div>
      <p>heath: {health}/100</p>
      <div className="bar__health">
        <div style={{ width: health + '%' }}></div>
      </div>
    </div>
  )
}

export default HealthBar
