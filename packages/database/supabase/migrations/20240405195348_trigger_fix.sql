CREATE OR REPLACE function create_api_key() 
RETURNS trigger AS $$
BEGIN
  insert into "public"."UserApiKey" ("userId")
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

