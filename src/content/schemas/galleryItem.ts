import { z } from "zod";

export const GalleryItemSchema = z.object({
  id: z.string(),
  image: z.string(),
  order: z.number(),
});
export type GalleryItem = z.infer<typeof GalleryItemSchema>;
