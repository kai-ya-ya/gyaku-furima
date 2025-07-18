export default function ({ dim = "col", className, children }) {
  return <div className={`flex flex-${dim} ${className}`}>{children}</div>;
}
