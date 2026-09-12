import { getGalleryImages } from "@/content/repository";
import { GalleryClient } from "./GalleryClient";

export async function Gallery() {
  const images = await getGalleryImages();
  return <GalleryClient images={images} />;
}
