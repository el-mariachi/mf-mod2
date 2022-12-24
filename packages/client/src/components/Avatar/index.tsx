import './index.css';

export default (props: { image: string; className: string }) => {
  const { image, className } = props;

  return (
    <div
      className={`avatar ${className}`}
      style={{ backgroundImage: `url(${image})` }}></div>
  );
};
