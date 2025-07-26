export default function ({ dim = "col", className = "", children, ref }) {
  return (
    <div ref={ref} className={`flex flex-${dim} ${className}`}>
      {children}
    </div>
  );
}
