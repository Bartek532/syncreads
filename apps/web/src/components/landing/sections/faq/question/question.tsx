"use client";

import { AnimatePresence, motion } from "framer-motion";
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
        className="flex items-start justify-start gap-2 md:gap-3"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <MinusIcon className="h-6 w-6 shrink-0 text-muted-foreground md:h-7 md:w-7" />
        ) : (
          <PlusIcon className="h-6 w-6 shrink-0 text-muted-foreground md:h-7 md:w-7" />
        )}

        <div className="flex flex-col items-start overflow-hidden">
          <span className="md:text-lg">{question}</span>
          <AnimatePresence>
            {open && (
              <motion.p
                key={question}
                className="text-left text-sm text-muted-foreground md:text-base"
                initial={{ height: 0, marginTop: 0 }}
                animate={{ height: "auto", marginTop: 6 }}
                exit={{ height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
              >
                {answer}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
});

Question.displayName = "Question";
