import { useAppSelector } from '@hooks/redux_typed_hooks'
import { selectHealth } from '@store/selectors'
import './HealthBar.scss'

function HealthBar() {
  const { health, maxHealth } = useAppSelector(selectHealth)
  return (
    <div className="health-bar">
      <p>
        heath: {health}/{maxHealth}
      </p>
      <div className="health-bar__bar">
        <div style={{ width: (health / maxHealth) * 100 + '%' }}></div>
      </div>
    </div>
  )
}

export default HealthBar
