import { LANDING_FAQ } from "../../../../config";

import { Question } from "./question/question";

export const Faq = () => {
  return (
    <section
      className="!col-span-full grid grid-cols-subgrid justify-items-center bg-muted py-12 md:py-24 lg:py-32"
      id="faq"
    >
      <div className="col-start-2 flex flex-col items-center">
        <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {LANDING_FAQ.title}
        </h2>
      </div>

      <ul className="col-start-2 mt-14 flex w-full max-w-[51rem] flex-col overflow-hidden rounded-xl bg-background px-6 py-3 md:mt-24">
        {LANDING_FAQ.questions.map(({ question, answer }) => (
          <li key={question} className="border-b py-3.5 last:border-none">
            <Question question={question} answer={answer} />
          </li>
        ))}
      </ul>
    </section>
  );
};
