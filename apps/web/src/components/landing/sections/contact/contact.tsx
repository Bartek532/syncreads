import { LANDING_CONTACT } from "../../../../config";

import { ContactForm } from "./form/contact-form";

export const Contact = () => {
  return (
    <section
      className="!col-span-full grid grid-cols-subgrid justify-items-center gap-12 bg-muted py-12 md:gap-20 md:py-24 lg:py-32"
      id="contact"
    >
      <div className="col-start-2 flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {LANDING_CONTACT.title}
        </h2>
        <p className="mt-2 max-w-2xl text-center text-muted-foreground md:text-xl">
          {LANDING_CONTACT.description}
        </p>
      </div>

      <div className="col-start-2 w-full max-w-2xl">
        <ContactForm />
      </div>
    </section>
  );
};
