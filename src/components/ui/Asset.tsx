type AssetProps = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
};

export function Asset({ src, width, height, alt = "", className }: AssetProps) {
  return <img src={src} width={width} height={height} alt={alt} className={className} />;
}
