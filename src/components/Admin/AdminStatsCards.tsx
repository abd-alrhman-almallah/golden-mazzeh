import type { AdminStat } from "../../types/admin";

interface AdminStatsCardsProps {
  stats: AdminStat[];
}

const styles = `
.gh-astats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 16px;
}
.gh-astats__card {
  padding: 24px;
  background: #FDFDFD;
  border: 1px solid rgba(4, 54, 79, 0.08);
  border-radius: 2px;
  box-shadow: 0 8px 24px rgba(4, 54, 79, 0.05);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.gh-astats__card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(4, 54, 79, 0.1);
}
.gh-astats__card::before {
  content: "";
  display: block;
  width: 32px;
  height: 2px;
  margin-bottom: 18px;
  background: #601E34;
}
.gh-astats__label {
  display: block;
  margin-bottom: 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-astats__value {
  display: block;
  margin-bottom: 8px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
  color: #04364F;
}
.gh-astats__hint {
  font-size: 13px;
  line-height: 1.4;
  color: #93979A;
}
`;

function AdminStatsCards({ stats }: AdminStatsCardsProps) {
  return (
    <>
      <style>{styles}</style>
      <div className="gh-astats">
        {stats.map((stat) => (
          <div key={stat.label} className="gh-astats__card">
            <span className="gh-astats__label">{stat.label}</span>
            <span className="gh-astats__value">{stat.value}</span>
            <span className="gh-astats__hint">{stat.hint}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminStatsCards;