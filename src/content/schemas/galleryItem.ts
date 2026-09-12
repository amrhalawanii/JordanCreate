import { z } from "zod";

export const GalleryItemSchema = z.object({
  id: z.string(),
  image: z.string(),
  /** Live desktop masonry uses ~3:2 (false) and ~2:3 (true) tiles. */
  tall: z.boolean().default(false),
  /** Desktop masonry column index (0 = inner, 1 = outer). */
  column: z.union([z.literal(0), z.literal(1)]).default(0),
  order: z.number(),
});
export type GalleryItem = z.infer<typeof GalleryItemSchema>;
