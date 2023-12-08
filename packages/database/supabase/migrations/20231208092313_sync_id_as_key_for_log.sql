alter table "public"."Log" drop constraint "Log_pkey";

drop index if exists "public"."Log_pkey";

alter table "public"."Log" drop column "id";

CREATE UNIQUE INDEX "Log_pkey" ON public."Log" USING btree ("syncId");

alter table "public"."Log" add constraint "Log_pkey" PRIMARY KEY using index "Log_pkey";


