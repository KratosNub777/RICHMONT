import type { MetadataRoute } from "next";
import { urlSitio } from "@/lib/url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: urlSitio,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
