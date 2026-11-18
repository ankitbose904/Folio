export default function TransparentImage({ src, alt, style, className }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{
        ...style,
        display: "block",
        opacity: 1,
      }}
      className={className}
      draggable={false}
    />
  );
}
