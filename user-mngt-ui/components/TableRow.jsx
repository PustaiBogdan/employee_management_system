export default function TableRow({ label }) {
  return (
    <td className="text-left px-6 py-4 whitespace-nowrap">
      {label && <div className="text-sm text-gray-500">{label}</div>}
    </td>
  );
}
