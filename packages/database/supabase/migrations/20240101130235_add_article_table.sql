create table "public"."Article" (
    "syncId" uuid not null,
    "url" text not null
);


CREATE UNIQUE INDEX "Article_pkey" ON public."Article" USING btree ("syncId", url);

alter table "public"."Article" add constraint "Article_pkey" PRIMARY KEY using index "Article_pkey";

alter table "public"."Article" add constraint "Article_syncId_fkey" FOREIGN KEY ("syncId") REFERENCES "Sync"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Article" validate constraint "Article_syncId_fkey";

alter table "public"."Sync" drop column "syncedArticlesCount";
