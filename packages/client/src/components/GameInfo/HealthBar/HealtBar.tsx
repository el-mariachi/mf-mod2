import { useAppSelector } from '@hooks/redux_typed_hooks'
import { selectHealth } from '@store/selectors'

function HealthBar() {
  const { health, maxHealth } = useAppSelector(selectHealth)
  return (
    <div>
      <p>
        heath: {health}/{maxHealth}
      </p>
      <div className="bar__health">
        <div style={{ width: (health / maxHealth) * 100 + '%' }}></div>
      </div>
    </div>
  )
}

export default HealthBar
