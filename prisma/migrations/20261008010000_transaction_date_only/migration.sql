-- Recover each user's calendar date from the UTC timestamp previously stored.
UPDATE "public"."transaction" AS t
SET "date" = (
    (t."date" AT TIME ZONE 'UTC')
    AT TIME ZONE COALESCE(NULLIF(user_record."timezone", ''), 'UTC')
)::DATE
FROM "public"."user" AS user_record
WHERE user_record."id" = t."userId";

ALTER TABLE "public"."transaction"
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" TYPE DATE USING "date"::DATE;
