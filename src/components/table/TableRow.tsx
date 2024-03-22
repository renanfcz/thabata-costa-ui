export default function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="hover:bg-light-primary cursor-pointer">{children}</tr>
}
