export default function Avatar({ assignee, size = 26 }) {
  return (
    <span
      className={`avatar avatar-${assignee.color}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {assignee.initials}
    </span>
  )
}
