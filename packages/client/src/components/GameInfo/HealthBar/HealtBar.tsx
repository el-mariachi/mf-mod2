interface Health {
  health: number
}

function HealthBar({ health }: Health) {
  return (
    <div className="healtInfo">
      <p>heath: {health}/100</p>
      <div className="healthBar">
        <div style={{ width: health + '%' }}></div>
      </div>
    </div>
  )
}

export default HealthBar
