-- create schema if not exists "pgmq_public";
-- set check_function_bodies = off;
-- CREATE OR REPLACE FUNCTION pgmq_public.archive(queue_name text, message_id bigint)
--  RETURNS boolean
--  LANGUAGE plpgsql
--  SET search_path TO ''
-- AS $function$ begin return pgmq.archive( queue_name := queue_name, msg_id := message_id ); end; $function$
-- ;
-- CREATE OR REPLACE FUNCTION pgmq_public.delete(queue_name text, message_id bigint)
--  RETURNS boolean
--  LANGUAGE plpgsql
--  SET search_path TO ''
-- AS $function$ begin return pgmq.delete( queue_name := queue_name, msg_id := message_id ); end; $function$
-- ;
-- CREATE OR REPLACE FUNCTION pgmq_public.pop(queue_name text)
--  RETURNS SETOF pgmq.message_record
--  LANGUAGE plpgsql
--  SET search_path TO ''
-- AS $function$ begin return query select * from pgmq.pop( queue_name := queue_name ); end; $function$
-- ;
-- CREATE OR REPLACE FUNCTION pgmq_public.read(queue_name text, sleep_seconds integer, n integer)
--  RETURNS SETOF pgmq.message_record
--  LANGUAGE plpgsql
--  SET search_path TO ''
-- AS $function$ begin return query select * from pgmq.read( queue_name := queue_name, vt := sleep_seconds, qty := n ); end; $function$
-- ;
-- CREATE OR REPLACE FUNCTION pgmq_public.send(queue_name text, message jsonb, sleep_seconds integer DEFAULT 0)
--  RETURNS SETOF bigint
--  LANGUAGE plpgsql
--  SET search_path TO ''
-- AS $function$ begin return query select * from pgmq.send( queue_name := queue_name, msg := message, delay := sleep_seconds ); end; $function$
-- ;
-- CREATE OR REPLACE FUNCTION pgmq_public.send_batch(queue_name text, messages jsonb[], sleep_seconds integer DEFAULT 0)
--  RETURNS SETOF bigint
--  LANGUAGE plpgsql
--  SET search_path TO ''
-- AS $function$ begin return query select * from pgmq.send_batch( queue_name := queue_name, msgs := messages, delay := sleep_seconds ); end; $function$
-- ;
create type "public"."client_status" as enum (
  'Prospect',
  'Consulting Agreement',
  'Project Contract',
  'Managed Service',
  'Retired'
);

create type "public"."system-types" as enum (
  'digital-ocean-function',
  'digital-ocean-app',
  'supabase-edge-function',
  'supabase-database-function',
  'vercel-nextjs',
  'strapi'
);

-- drop policy "Allow auth admin to read user roles" on "public"."user_roles";

-- revoke delete on table "public"."role_permissions"
-- from
--   "anon";

-- revoke
-- insert
--   on table "public"."role_permissions"
-- from
--   "anon";

-- revoke references on table "public"."role_permissions"
-- from
--   "anon";

-- revoke
-- select
--   on table "public"."role_permissions"
-- from
--   "anon";

-- revoke trigger on table "public"."role_permissions"
-- from
--   "anon";

-- revoke truncate on table "public"."role_permissions"
-- from
--   "anon";

-- revoke
-- update
--   on table "public"."role_permissions"
-- from
--   "anon";

-- revoke delete on table "public"."role_permissions"
-- from
--   "authenticated";

-- revoke
-- insert
--   on table "public"."role_permissions"
-- from
--   "authenticated";

-- revoke references on table "public"."role_permissions"
-- from
--   "authenticated";

-- revoke
-- select
--   on table "public"."role_permissions"
-- from
--   "authenticated";

-- revoke trigger on table "public"."role_permissions"
-- from
--   "authenticated";

-- revoke truncate on table "public"."role_permissions"
-- from
--   "authenticated";

-- revoke
-- update
--   on table "public"."role_permissions"
-- from
--   "authenticated";

-- revoke delete on table "public"."role_permissions"
-- from
--   "service_role";

-- revoke
-- insert
--   on table "public"."role_permissions"
-- from
--   "service_role";

-- revoke references on table "public"."role_permissions"
-- from
--   "service_role";

-- revoke
-- select
--   on table "public"."role_permissions"
-- from
--   "service_role";

-- revoke trigger on table "public"."role_permissions"
-- from
--   "service_role";

-- revoke truncate on table "public"."role_permissions"
-- from
--   "service_role";

-- revoke
-- update
--   on table "public"."role_permissions"
-- from
--   "service_role";

-- revoke delete on table "public"."user_roles"
-- from
--   "anon";

-- revoke
-- insert
--   on table "public"."user_roles"
-- from
--   "anon";

-- revoke references on table "public"."user_roles"
-- from
--   "anon";

-- revoke
-- select
--   on table "public"."user_roles"
-- from
--   "anon";

-- revoke trigger on table "public"."user_roles"
-- from
--   "anon";

-- revoke truncate on table "public"."user_roles"
-- from
--   "anon";

-- revoke
-- update
--   on table "public"."user_roles"
-- from
--   "anon";

-- revoke delete on table "public"."user_roles"
-- from
--   "authenticated";

-- revoke
-- insert
--   on table "public"."user_roles"
-- from
--   "authenticated";

-- revoke references on table "public"."user_roles"
-- from
--   "authenticated";

-- revoke
-- select
--   on table "public"."user_roles"
-- from
--   "authenticated";

-- revoke trigger on table "public"."user_roles"
-- from
--   "authenticated";

-- revoke truncate on table "public"."user_roles"
-- from
--   "authenticated";

-- revoke
-- update
--   on table "public"."user_roles"
-- from
--   "authenticated";

-- revoke delete on table "public"."user_roles"
-- from
--   "service_role";

-- revoke
-- insert
--   on table "public"."user_roles"
-- from
--   "service_role";

-- revoke references on table "public"."user_roles"
-- from
--   "service_role";

-- revoke
-- select
--   on table "public"."user_roles"
-- from
--   "service_role";

-- revoke trigger on table "public"."user_roles"
-- from
--   "service_role";

-- revoke truncate on table "public"."user_roles"
-- from
--   "service_role";

-- revoke
-- update
--   on table "public"."user_roles"
-- from
--   "service_role";

-- revoke delete on table "public"."user_roles"
-- from
--   "supabase_auth_admin";

-- revoke
-- insert
--   on table "public"."user_roles"
-- from
--   "supabase_auth_admin";

-- revoke references on table "public"."user_roles"
-- from
--   "supabase_auth_admin";

-- revoke
-- select
--   on table "public"."user_roles"
-- from
--   "supabase_auth_admin";

-- revoke trigger on table "public"."user_roles"
-- from
--   "supabase_auth_admin";

-- revoke truncate on table "public"."user_roles"
-- from
--   "supabase_auth_admin";

-- revoke
-- update
--   on table "public"."user_roles"
-- from
--   "supabase_auth_admin";

-- alter table
--   "public"."role_permissions" drop constraint "role_permissions_role_permission_key";

-- alter table
--   "public"."user_roles" drop constraint "user_roles_user_id_fkey";

-- alter table
--   "public"."user_roles" drop constraint "user_roles_user_id_role_key";

-- drop function if exists "public"."authorize"(requested_permission app_permission);

-- drop function if exists "public"."custom_access_token_hook"(event jsonb);

-- alter table
--   "public"."role_permissions" drop constraint "role_permissions_pkey";

-- alter table
--   "public"."user_roles" drop constraint "user_roles_pkey";

-- drop index if exists "public"."role_permissions_pkey";

-- drop index if exists "public"."role_permissions_role_permission_key";

-- drop index if exists "public"."user_roles_pkey";

-- drop index if exists "public"."user_roles_user_id_role_key";

-- drop table "public"."role_permissions";

-- drop table "public"."user_roles";

create table "public"."clients" (
  "id" uuid not null default gen_random_uuid(),
  "created_at" timestamp with time zone not null default now(),
  "company_name" text,
  "contact_name" text,
  "contact_email" text,
  "status" client_status not null default 'Prospect' :: client_status
);

alter table
  "public"."clients" enable row level security;

create table "public"."systems" (
  "id" uuid not null default gen_random_uuid(),
  "created_at" timestamp with time zone not null default now(),
  "modified_at" timestamp with time zone not null default now(),
  "client" uuid not null,
  "system" "system-types" not null,
  "name" text not null,
  "description" text
);

alter table
  "public"."systems" enable row level security;

create table "public"."systems_activity_log" (
  "id" bigint generated by default as identity not null,
  "system" uuid not null,
  "client" uuid not null,
  "action" text not null,
  "details" jsonb,
  "timestamp" timestamp with time zone not null default now()
);

alter table
  "public"."systems_activity_log" enable row level security;

-- drop type "public"."app_permission";

-- drop type "public"."app_role";

CREATE UNIQUE INDEX clients_pkey ON public.clients USING btree (id);

CREATE UNIQUE INDEX "systems-activity-log_pkey" ON public.systems_activity_log USING btree (id);

CREATE UNIQUE INDEX systems_pkey ON public.systems USING btree (id);

alter table
  "public"."clients"
add
  constraint "clients_pkey" PRIMARY KEY using index "clients_pkey";

alter table
  "public"."systems"
add
  constraint "systems_pkey" PRIMARY KEY using index "systems_pkey";

alter table
  "public"."systems_activity_log"
add
  constraint "systems-activity-log_pkey" PRIMARY KEY using index "systems-activity-log_pkey";

alter table
  "public"."systems"
add
  constraint "systems_client_fkey" FOREIGN KEY (client) REFERENCES clients(id) not valid;

alter table
  "public"."systems" validate constraint "systems_client_fkey";

alter table
  "public"."systems_activity_log"
add
  constraint "systems-activity-log_client_fkey" FOREIGN KEY (client) REFERENCES clients(id) not valid;

alter table
  "public"."systems_activity_log" validate constraint "systems-activity-log_client_fkey";

alter table
  "public"."systems_activity_log"
add
  constraint "systems-activity-log_system_fkey" FOREIGN KEY (system) REFERENCES systems(id) not valid;

alter table
  "public"."systems_activity_log" validate constraint "systems-activity-log_system_fkey";

set
  check_function_bodies = off;

-- FUNCTION
CREATE
OR REPLACE FUNCTION public.enforce_client_consistency() RETURNS trigger LANGUAGE plpgsql AS $function$

begin if (
  select
    client
  from
    systems
  where
    id = new.system
) != new.client then raise exception 'Client does not match the system';

end if;

return new;

end;

$function$;

CREATE TRIGGER activity_log_client_consistency BEFORE
INSERT
  OR
UPDATE
  ON public.systems_activity_log FOR EACH ROW EXECUTE FUNCTION enforce_client_consistency();

grant delete on table "public"."clients" to "anon";

grant
insert
  on table "public"."clients" to "anon";

grant references on table "public"."clients" to "anon";

grant
select
  on table "public"."clients" to "anon";

grant trigger on table "public"."clients" to "anon";

grant truncate on table "public"."clients" to "anon";

grant
update
  on table "public"."clients" to "anon";

grant delete on table "public"."clients" to "authenticated";

grant
insert
  on table "public"."clients" to "authenticated";

grant references on table "public"."clients" to "authenticated";

grant
select
  on table "public"."clients" to "authenticated";

grant trigger on table "public"."clients" to "authenticated";

grant truncate on table "public"."clients" to "authenticated";

grant
update
  on table "public"."clients" to "authenticated";

grant delete on table "public"."clients" to "service_role";

grant
insert
  on table "public"."clients" to "service_role";

grant references on table "public"."clients" to "service_role";

grant
select
  on table "public"."clients" to "service_role";

grant trigger on table "public"."clients" to "service_role";

grant truncate on table "public"."clients" to "service_role";

grant
update
  on table "public"."clients" to "service_role";

grant delete on table "public"."systems" to "anon";

grant
insert
  on table "public"."systems" to "anon";

grant references on table "public"."systems" to "anon";

grant
select
  on table "public"."systems" to "anon";

grant trigger on table "public"."systems" to "anon";

grant truncate on table "public"."systems" to "anon";

grant
update
  on table "public"."systems" to "anon";

grant delete on table "public"."systems" to "authenticated";

grant
insert
  on table "public"."systems" to "authenticated";

grant references on table "public"."systems" to "authenticated";

grant
select
  on table "public"."systems" to "authenticated";

grant trigger on table "public"."systems" to "authenticated";

grant truncate on table "public"."systems" to "authenticated";

grant
update
  on table "public"."systems" to "authenticated";

grant delete on table "public"."systems" to "service_role";

grant
insert
  on table "public"."systems" to "service_role";

grant references on table "public"."systems" to "service_role";

grant
select
  on table "public"."systems" to "service_role";

grant trigger on table "public"."systems" to "service_role";

grant truncate on table "public"."systems" to "service_role";

grant
update
  on table "public"."systems" to "service_role";

grant delete on table "public"."systems_activity_log" to "anon";

grant
insert
  on table "public"."systems_activity_log" to "anon";

grant references on table "public"."systems_activity_log" to "anon";

grant
select
  on table "public"."systems_activity_log" to "anon";

grant trigger on table "public"."systems_activity_log" to "anon";

grant truncate on table "public"."systems_activity_log" to "anon";

grant
update
  on table "public"."systems_activity_log" to "anon";

grant delete on table "public"."systems_activity_log" to "authenticated";

grant
insert
  on table "public"."systems_activity_log" to "authenticated";

grant references on table "public"."systems_activity_log" to "authenticated";

grant
select
  on table "public"."systems_activity_log" to "authenticated";

grant trigger on table "public"."systems_activity_log" to "authenticated";

grant truncate on table "public"."systems_activity_log" to "authenticated";

grant
update
  on table "public"."systems_activity_log" to "authenticated";

grant delete on table "public"."systems_activity_log" to "service_role";

grant
insert
  on table "public"."systems_activity_log" to "service_role";

grant references on table "public"."systems_activity_log" to "service_role";

grant
select
  on table "public"."systems_activity_log" to "service_role";

grant trigger on table "public"."systems_activity_log" to "service_role";

grant truncate on table "public"."systems_activity_log" to "service_role";

grant
update
  on table "public"."systems_activity_log" to "service_role";