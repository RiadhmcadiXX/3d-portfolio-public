import { useState } from "react";
import type { ContributionCalendar, ContributionDay } from "@/lib/github.functions";

interface Props {
  calendar: ContributionCalendar;
}

// Map contribution counts to our theme's blue palette
export function getLevelColor(count: number): string {
  if (count === 0) return "#e2e8f0"; // slate-200
  if (count <= 2) return "#d1ebed"; // ~20% tint
  if (count <= 5) return "#a3d6db"; // ~40% tint
  if (count <= 9) return "#47b2bd"; // ~70% tint
  return "#1a99a6";                  // 100% brand blue
}


export function GitHubHeatmap({ calendar }: Props) {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  return (
    <div className="rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">GitHub Contributions</h3>
          <p className="text-sm text-slate-500">
            {calendar.totalContributions.toLocaleString()} contributions in the last year
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>Less</span>
          <span className="h-2.5 w-2.5 rounded-sm bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-blue/20" />
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-blue/40" />
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-blue/60" />
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1">
          {calendar.weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {week.contributionDays.map((day) => (
                <div
                  key={day.date}
                  style={{ backgroundColor: getLevelColor(day.contributionCount) }}
                  className="h-2.5 w-2.5 rounded-sm transition-transform hover:scale-125"
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {hoveredDay && (
        <div className="mt-2 text-xs font-medium text-slate-600">
          {hoveredDay.contributionCount} contribution{hoveredDay.contributionCount === 1 ? "" : "s"} on{" "}
          {new Date(hoveredDay.date).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      )}
    </div>
  );
}
