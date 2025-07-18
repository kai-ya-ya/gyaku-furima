export default function ({ className, text }) {
  return <div className={`flex flex-col justify-center h-full ${className}`}>{text}</div>;
}
