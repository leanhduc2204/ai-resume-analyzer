import type { FC } from "react";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: FC<ScoreBadgeProps> = ({ score }) => {
  const isStrong = score > 70;
  const isGood = score > 49 && score <= 70;

  const badgeColor = isStrong
    ? "bg-badge-green"
    : isGood
      ? "bg-badge-yellow"
      : "bg-badge-red";

  const textColor = isStrong
    ? "text-green-600"
    : isGood
      ? "text-yellow-600"
      : "text-red-600";

  const badgeText = isStrong ? "Strong" : isGood ? "Good Start" : "Needs Work";

  return (
    <div className={`score-badge ${badgeColor}`}>
      <p className={`text-xs ${textColor}`}>{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
