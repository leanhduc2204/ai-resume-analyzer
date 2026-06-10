import type { FC } from "react";

type Suggestion = {
  type: "good" | "improve";
  tip: string;
};

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const getGradientFrom = (score: number) => {
  if (score > 69) return "from-green-100";
  if (score > 49) return "from-yellow-100";
  return "from-red-100";
};

const getHeaderIcon = (score: number) => {
  if (score > 69) return "/icons/ats-good.svg";
  if (score > 49) return "/icons/ats-warning.svg";
  return "/icons/ats-bad.svg";
};

const getSubTitle = (score: number) => {
  if (score > 69) return "Great Job!";
  if (score > 49) return "Good Start";
  return "Needs Improvement";
};

const ATS: FC<ATSProps> = ({ score, suggestions }) => {
  const fromClass = getGradientFrom(score);
  const headerIcon = getHeaderIcon(score);
  const subTitle = getSubTitle(score);

  return (
    <div
      className={`rounded-2xl shadow-md w-full p-6 bg-linear-to-b ${fromClass} to-white`}
    >
      <div className="flex items-center gap-4 mb-6">
        <img src={headerIcon} alt="ATS Score Icon" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold">ATS Score - {score}/100</h2>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{subTitle}</h3>
        <p className="mb-4 text-gray-600">
          This score represents how well your resume is likely to perform in
          Applicant Tracking Systems used by employers.
        </p>

        <ul className="space-y-3">
          {suggestions.map((suggestion, idx) => {
            const icon =
              suggestion.type === "good"
                ? "/icons/check.svg"
                : "/icons/warning.svg";
            return (
              <li key={idx} className="flex items-start gap-3">
                <img
                  src={icon}
                  alt={suggestion.type === "good" ? "Check" : "Warning"}
                  className="w-5 h-5 mt-1"
                />
                <p
                  className={
                    suggestion.type === "good"
                      ? "text-green-700"
                      : "text-amber-700"
                  }
                >
                  {suggestion.tip}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="text-gray-700 italic">
        Keep refining your resume to improve your chances of getting past ATS
        filters and into the hands of recruiters.
      </p>
    </div>
  );
};

export default ATS;
