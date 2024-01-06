type IconProps = {
  width: number;
  height: number;
  xlinkHref: string;
}
export function Icon({width, height, xlinkHref}: IconProps): JSX.Element {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      <use xlinkHref={xlinkHref}></use>
    </svg>
  );
}
