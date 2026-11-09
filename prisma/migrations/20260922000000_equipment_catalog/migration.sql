CREATE TYPE "EquipmentSituation" AS ENUM ('AVAILABLE', 'MAINTENANCE', 'BORROWED');

CREATE TABLE "image_credits" (
    "id" UUID NOT NULL,
    "pexels_photo_id" TEXT NOT NULL,
    "source_url" TEXT NOT NULL,
    "photographer" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_credits_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "equipments" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "patrimony" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "situation" "EquipmentSituation" NOT NULL DEFAULT 'AVAILABLE',
    "image_url" TEXT NOT NULL,
    "image_credit_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "image_credits_pexels_photo_id_key" ON "image_credits"("pexels_photo_id");
CREATE UNIQUE INDEX "equipments_image_credit_id_key" ON "equipments"("image_credit_id");
CREATE UNIQUE INDEX "equipments_tenant_id_patrimony_key" ON "equipments"("tenant_id", "patrimony");
CREATE INDEX "equipments_tenant_id_situation_idx" ON "equipments"("tenant_id", "situation");

ALTER TABLE "equipments" ADD CONSTRAINT "equipments_tenant_id_fkey"
  FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "equipments" ADD CONSTRAINT "equipments_image_credit_id_fkey"
  FOREIGN KEY ("image_credit_id") REFERENCES "image_credits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
