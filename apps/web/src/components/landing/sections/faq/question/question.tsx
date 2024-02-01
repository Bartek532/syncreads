"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { memo, useState } from "react";

type QuestionProps = {
  readonly question: string;
  readonly answer: string;
};

export const Question = memo<QuestionProps>(({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col bg-background">
      <button
        className="flex items-start justify-start gap-3"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <MinusIcon className="h-6 w-6 text-muted-foreground md:h-7 md:w-7" />
        ) : (
          <PlusIcon className="h-6 w-6 text-muted-foreground md:h-7 md:w-7" />
        )}
        <div className="flex flex-col items-start gap-3">
          <span className="md:text-lg">{question}</span>
          {open && (
            <p className="text-left text-sm text-muted-foreground md:text-base">
              {answer}
            </p>
          )}
        </div>
      </button>
    </div>
  );
});

Question.displayName = "Question";
