import Canvas from '@components/Canvas'
import { useWinSize } from '@hooks/useWinSize'
import { drawSpinner } from './drawSpinner'

const Spinner = () => {
  const [width, height] = useWinSize()
  return <Canvas draw={drawSpinner} width={width} height={height} />
}

export default Spinner
