interface Props {
  adminCount: number;
  userCount: number;
}

const ADMIN_COLOR = "#246BFD";
const USER_COLOR = "#1BAF7A";

export default function AdminUserDonutChart({ adminCount, userCount }: Props) {
  const total = adminCount + userCount;
  const adminPct = total > 0 ? (adminCount / total) * 100 : 0;
  const userPct = total > 0 ? 100 - adminPct : 0;

  const radius = 70;
  const strokeWidth = 26;
  const circumference = 2 * Math.PI * radius;
  const gap = total > 0 ? 3 : 0;

  const adminLength = Math.max((circumference * adminPct) / 100 - gap, 0);
  const userLength = Math.max((circumference * userPct) / 100 - gap, 0);

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
      <svg
        viewBox="0 0 200 200"
        className="h-44 w-44 shrink-0 -rotate-90"
        role="img"
        aria-label={`Admin vs Users: ${adminCount} admins, ${userCount} users`}
      >
        <circle cx={100} cy={100} r={radius} fill="none" stroke="#eef1f6" strokeWidth={strokeWidth} />
        {adminCount > 0 && (
          <circle
            cx={100}
            cy={100}
            r={radius}
            fill="none"
            stroke={ADMIN_COLOR}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${adminLength} ${circumference - adminLength}`}
            strokeDashoffset={0}
          >
            <title>{`Admin: ${adminCount} (${adminPct.toFixed(0)}%)`}</title>
          </circle>
        )}
        {userCount > 0 && (
          <circle
            cx={100}
            cy={100}
            r={radius}
            fill="none"
            stroke={USER_COLOR}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${userLength} ${circumference - userLength}`}
            strokeDashoffset={-((circumference * adminPct) / 100)}
          >
            <title>{`Users: ${userCount} (${userPct.toFixed(0)}%)`}</title>
          </circle>
        )}
        <text
          x={100}
          y={95}
          textAnchor="middle"
          className="rotate-90"
          style={{ transformOrigin: "100px 100px", fill: "#111827", fontSize: 30, fontWeight: 700 }}
        >
          {total}
        </text>
        <text
          x={100}
          y={122}
          textAnchor="middle"
          className="rotate-90"
          style={{ transformOrigin: "100px 100px", fill: "#6b7280", fontSize: 13, fontWeight: 500 }}
        >
          Total
        </text>
      </svg>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: ADMIN_COLOR }} />
          <span className="text-sm font-medium text-gray-700">
            Admin — {adminCount} ({adminPct.toFixed(0)}%)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: USER_COLOR }} />
          <span className="text-sm font-medium text-gray-700">
            Users — {userCount} ({userPct.toFixed(0)}%)
          </span>
        </div>
      </div>
    </div>
  );
}
