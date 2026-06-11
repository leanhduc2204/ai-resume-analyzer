import type { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";
import { cn } from "../lib/utils";

type Tip = {
  type: "good" | "improve";
  tip: string;
  explanation: string;
};

type Category = {
  score: number;
  tips: Tip[];
};

interface DetailsProps {
  feedback: Feedback;
}

const ScoreBadge: FC<{ score: number }> = ({ score }) => {
  const kind = score > 69 ? "good" : score > 39 ? "warn" : "bad";

  const bg =
    kind === "good"
      ? "bg-badge-green"
      : kind === "warn"
        ? "bg-badge-yellow"
        : "bg-badge-red";
  const text =
    kind === "good"
      ? "text-badge-green-text"
      : kind === "warn"
        ? "text-badge-yellow-text"
        : "text-badge-red-text";

  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
        bg,
      )}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-4"
      />
      <p className={cn("text-sm font-medium", text)}>{score}/100</p>
    </div>
  );
};

const CategoryHeader: FC<{ title: string; categoryScore: number }> = ({
  title,
  categoryScore,
}) => (
  <div className="flex flex-row gap-4 items-center py-2">
    <p className="text-2xl font-semibold">{title}</p>
    <ScoreBadge score={categoryScore} />
  </div>
);

const CategoryContent: FC<{ tips: Tip[] }> = ({ tips = [] }) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex flex-row gap-2 items-center">
            <img
              src={
                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt="score"
              className="size-5"
            />
            <p className="text-xl text-gray-500">{tip.tip}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 w-full">
        {tips.map((t, i) => (
          <div
            key={i + t.tip}
            className={cn(
              "flex flex-col gap-2 rounded-2xl p-4",
              t.type === "good"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-yellow-50 border border-yellow-200 text-yellow-700",
            )}
          >
            <div className="flex flex-row gap-2 items-center">
              <img
                src={
                  t.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
                }
                alt="score"
                className="size-5"
              />
              <p className="text-xl font-semibold">{t.tip}</p>
            </div>
            <p>{t.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details: FC<DetailsProps> = ({ feedback }) => {
  const sections: { key: string; title: string; data: Category }[] = [
    { key: "tone-style", title: "Tone & Style", data: feedback.toneAndStyle },
    { key: "content", title: "Content", data: feedback.content },
    { key: "structure", title: "Structure", data: feedback.structure },
    { key: "skills", title: "Skills", data: feedback.skills },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        {sections.map((s) => (
          <AccordionItem key={s.key} id={s.key}>
            <AccordionHeader itemId={s.key}>
              <CategoryHeader title={s.title} categoryScore={s.data.score} />
            </AccordionHeader>
            <AccordionContent itemId={s.key}>
              <div className="mt-2">
                <CategoryContent tips={s.data.tips} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;
