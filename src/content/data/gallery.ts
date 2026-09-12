import type { GalleryItem } from "../schemas/galleryItem";

// Desktop masonry columns measured from https://www.jordancreate.com/
// `#about-3` / `#work` at 1440px (gap 8px, short ≈ 3:2, tall ≈ 2:3).
const COL_LEFT: Array<{ hash: string; tall: boolean }> = [
  { hash: "1PwAiqn9xvY2KktCKwHq7wehAs", tall: false },
  { hash: "FK3l2fxxaM3K56yoTwtVpqm8", tall: false },
  { hash: "AdZOpM5dGh2YE3hq1glXVA2ePk", tall: false },
  { hash: "yakWU8zu3VpIgL6Dndc7Fn4bPn8", tall: false },
  { hash: "6Po2GS32Bq3IqV3cUJ480ZLKg4", tall: true },
  { hash: "dAX3mOKnTLf37zDALjUuy9M5Dc", tall: false },
  { hash: "3MMMVxIQuQwQkDelWluNnfE4UGQ", tall: true },
];

const COL_RIGHT: Array<{ hash: string; tall: boolean }> = [
  { hash: "ikn02ebXdMIz5eoFXyemCJ2IL8", tall: false },
  { hash: "FHQUItaGeoQEMaUkiNlRspOx7E", tall: true },
  { hash: "WQROQhtQAHwUBAyHpLgoB9tXros", tall: false },
  { hash: "GuYtQgKCaPC9RRyBFW2wD04ras", tall: false },
  { hash: "AF6j7xDimP5tJO4njzhfGxBcq2g", tall: false },
  { hash: "GGYESnWngomdkx2hjMf8GH73xM", tall: false },
  { hash: "hzb4EtHeI0eQKBoTUKewo1VtziY", tall: true },
];

function toItems(
  rows: Array<{ hash: string; tall: boolean }>,
  column: 0 | 1,
): GalleryItem[] {
  return rows.map(({ hash, tall }, i) => ({
    id: hash,
    image: `/assets/gallery/${hash}.jpg`,
    tall,
    column,
    order: column * 100 + i,
  }));
}

export const galleryImages: GalleryItem[] = [
  ...toItems(COL_LEFT, 0),
  ...toItems(COL_RIGHT, 1),
];

export function getGalleryColumns(images: GalleryItem[]) {
  const left = images.filter((i) => i.column === 0).sort((a, b) => a.order - b.order);
  const right = images.filter((i) => i.column === 1).sort((a, b) => a.order - b.order);
  if (left.length || right.length) return [left, right] as const;
  // Fallback: split evenly if column metadata missing
  const mid = Math.ceil(images.length / 2);
  return [images.slice(0, mid), images.slice(mid)] as const;
}
