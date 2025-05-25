import path from "node:path";
import { type ImageType } from "@/types/image";
import { getImage } from "astro:assets";

// 全ての画像を静的に読み込み
const allImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/data/works/**/*.{png,jpg,jpeg,gif,webp,svg}",
  { eager: true },
);

export const optimizedImages = async (
  id: string,
  originalImages: ImageType[],
): Promise<ImageType[]> => {
  const results = await Promise.all(
    originalImages.map(async (image) => {
      try {
        // 相対パスを絶対パスに
        const imagePath = path.join(`/src/data/works/${id}`, image.src);
        const imageModule = allImages[imagePath];

        if (!imageModule) {
          console.error(`Image not found: ${imagePath}`);
          return null;
        }

        const optimizedImage = await getImage({
          src: imageModule.default,
          format: "webp",
        });

        return {
          ...image,
          src: optimizedImage.src,
        };
      } catch (error) {
        console.error(`Failed to load image ${image.src}:`, error);
        return null;
      }
    }),
  );

  return results.filter((image) => image !== null);
};
