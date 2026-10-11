import type { AdminColumn } from "../../types/admin";
import EmptyState from "../Dashboard/EmptyState";

interface AdminTableProps<T> {
  /** Accessible table name, also used as a hidden caption */
  caption: string;
  columns: AdminColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string | number;
  emptyTitle: string;
  emptyText: string;
}

const styles = `
.gh-atable__wrap {
  overflow-x: auto;
  background: #FDFDFD;
  border: 1px solid rgba(4, 54, 79, 0.08);
  border-radius: 2px;
  box-shadow: 0 8px 24px rgba(4, 54, 79, 0.05);
}
.gh-atable__wrap:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 2px;
}
.gh-atable {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
  font-size: 14px;
  color: #04364F;
}
.gh-atable__caption {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
.gh-atable th {
  padding: 14px 20px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
  color: #93979A;
  background: #EFEFF2;
}
.gh-atable td {
  padding: 16px 20px;
  vertical-align: middle;
  white-space: nowrap;
  border-top: 1px solid #EFEFF2;
}
.gh-atable tbody tr {
  transition: background 0.2s ease;
}
.gh-atable tbody tr:hover {
  background: rgba(239, 239, 242, 0.6);
}
.gh-atable__stack {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.gh-atable__primary {
  font-weight: 600;
  color: #04364F;
}
.gh-atable__secondary {
  font-size: 12px;
  color: #93979A;
}
`;

function AdminTable<T>({
  caption,
  columns,
  rows,
  getRowKey,
  emptyTitle,
  emptyText,
}: AdminTableProps<T>) {
  if (rows.length === 0) {
    return <EmptyState title={emptyTitle} text={emptyText} />;
  }

  return (
    <>
      <style>{styles}</style>
      <div
        className="gh-atable__wrap"
        role="region"
        aria-label={caption}
        tabIndex={0}
      >
        <table className="gh-atable">
          <caption className="gh-atable__caption">{caption}</caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={getRowKey(row)}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render(row)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminTable;