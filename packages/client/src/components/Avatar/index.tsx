import './Avatar.scss'

export default ({ image, className }: { image: string; className: string }) => {
  return (
    <div
      className={`avatar ${className}`}
      style={{ backgroundImage: `url(${image})` }}></div>
  )
}
