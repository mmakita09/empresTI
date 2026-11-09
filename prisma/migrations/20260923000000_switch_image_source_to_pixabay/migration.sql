ALTER TABLE "image_credits" RENAME COLUMN "pexels_photo_id" TO "pixabay_image_id";
ALTER INDEX "image_credits_pexels_photo_id_key" RENAME TO "image_credits_pixabay_image_id_key";
