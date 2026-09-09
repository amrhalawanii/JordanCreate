import type { GalleryItem } from "../schemas/galleryItem";

// "THE ROOM WHERE IT ALL HAPPENED" — 2025 gallery. The live site's marquee
// runs the same 14-image set in two rows; the second row is reversed here
// (a reasonable read of the "different ordering" the master prompt flags —
// the exact live re-ordering wasn't independently re-derived, see
// FIDELITY-NOTES.md).
export const galleryImages: GalleryItem[] = [
  "1PwAiqn9xvY2KktCKwHq7wehAs",
  "FK3l2fxxaM3K56yoTwtVpqm8",
  "AdZOpM5dGh2YE3hq1glXVA2ePk",
  "yakWU8zu3VpIgL6Dndc7Fn4bPn8",
  "6Po2GS32Bq3IqV3cUJ480ZLKg4",
  "dAX3mOKnTLf37zDALjUuy9M5Dc",
  "3MMMVxIQuQwQkDelWluNnfE4UGQ",
  "ikn02ebXdMIz5eoFXyemCJ2IL8",
  "FHQUItaGeoQEMaUkiNlRspOx7E",
  "WQROQhtQAHwUBAyHpLgoB9tXros",
  "GuYtQgKCaPC9RRyBFW2wD04ras",
  "AF6j7xDimP5tJO4njzhfGxBcq2g",
  "GGYESnWngomdkx2hjMf8GH73xM",
  "hzb4EtHeI0eQKBoTUKewo1VtziY",
].map((hash, i) => ({
  id: hash,
  image: `/assets/gallery/${hash}.jpg`,
  order: i,
}));
