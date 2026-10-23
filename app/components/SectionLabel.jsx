export default function SectionLabel({ number, children }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      <span className="label-rule" />
      {children}
    </p>
  );
}
