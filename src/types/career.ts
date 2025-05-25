import { z } from "astro:content";

export const CareerSchema = z.object({
  title: z.string(),
  employmentPeriod: z.string(),
  jobName: z.string(),
  icon: z.string(),
});

export type CareerType = z.infer<typeof CareerSchema>;
