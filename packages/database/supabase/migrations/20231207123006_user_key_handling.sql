CREATE OR REPLACE FUNCTION gen_random_string(length INT)
RETURNS TEXT AS $$
BEGIN
  RETURN substring(md5(random()::text), 1, length);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE function create_api_key() 
RETURNS trigger AS $$
BEGIN
  insert into "public"."UserApiKey" ("userId")
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create table "public"."ApiKey" (
    "userId" uuid default auth.uid(),
    "key" text not null unique default gen_random_string(32),
    "createdAt" timestamp with time zone not null default now(),
    "updatedAt" timestamp with time zone not null default now()
);

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure create_api_key();


CREATE UNIQUE INDEX "ApiKey_pkey" ON public."ApiKey" USING btree ("userId");

alter table "public"."ApiKey" add constraint "ApiKey_pkey" PRIMARY KEY using index "ApiKey_pkey";

alter table "public"."ApiKey" add constraint "ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."ApiKey" validate constraint "ApiKey_userId_fkey";


