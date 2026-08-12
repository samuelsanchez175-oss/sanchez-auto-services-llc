/**
 * Work photos sourced from Instagram @francisco4704 (shop work feed).
 * Captions on IG were empty — labels are shop-curated for the site.
 * Pair order: before = in-shop / damaged stage, after = finished result when known.
 */
export type WorkPair = {
  id: string;
  titleEn: string;
  titleEs: string;
  before: string;
  after: string;
  beforeLabelEn: string;
  beforeLabelEs: string;
  afterLabelEn: string;
  afterLabelEs: string;
  igBefore?: string;
  igAfter?: string;
};

export type WorkShot = {
  id: string;
  src: string;
  titleEn: string;
  titleEs: string;
  permalink: string;
};

/** Primary before/after pairs for the compare slider */
export const WORK_PAIRS: WorkPair[] = [
  {
    id: "amazon-prime-van",
    titleEn: "Amazon Prime van — panel repair",
    titleEs: "Van Amazon Prime — reparación de panel",
    before: "/before-after/ig-01-C7LI_biOyWQ.jpg",
    after: "/before-after/ig-00-C7LJHlKOYW_.jpg",
    beforeLabelEn: "In the bay",
    beforeLabelEs: "En el taller",
    afterLabelEn: "Finished",
    afterLabelEs: "Listo",
    igBefore: "https://www.instagram.com/p/C7LI_biOyWQ/",
    igAfter: "https://www.instagram.com/p/C7LJHlKOYW_/",
  },
  {
    id: "body-paint-set-a",
    titleEn: "Body & paint job A",
    titleEs: "Trabajo de carrocería y pintura A",
    before: "/before-after/ig-03-C6IMEbxu1Wd.jpg",
    after: "/before-after/ig-02-C6INiUFuJ5E.jpg",
    beforeLabelEn: "Stage 1",
    beforeLabelEs: "Etapa 1",
    afterLabelEn: "Stage 2",
    afterLabelEs: "Etapa 2",
    igBefore: "https://www.instagram.com/p/C6IMEbxu1Wd/",
    igAfter: "https://www.instagram.com/p/C6INiUFuJ5E/",
  },
  {
    id: "body-paint-set-b",
    titleEn: "Body & paint job B",
    titleEs: "Trabajo de carrocería y pintura B",
    before: "/before-after/ig-05-C6ILcUKu3i6.jpg",
    after: "/before-after/ig-04-C6ILxQhusX2.jpg",
    beforeLabelEn: "Stage 1",
    beforeLabelEs: "Etapa 1",
    afterLabelEn: "Stage 2",
    afterLabelEs: "Etapa 2",
    igBefore: "https://www.instagram.com/p/C6ILcUKu3i6/",
    igAfter: "https://www.instagram.com/p/C6ILxQhusX2/",
  },
  {
    id: "body-paint-set-c",
    titleEn: "Body & paint job C",
    titleEs: "Trabajo de carrocería y pintura C",
    before: "/before-after/ig-07-C6ILNefuy4l.jpg",
    after: "/before-after/ig-06-C6ILYdzOAG8.jpg",
    beforeLabelEn: "Stage 1",
    beforeLabelEs: "Etapa 1",
    afterLabelEn: "Stage 2",
    afterLabelEs: "Etapa 2",
    igBefore: "https://www.instagram.com/p/C6ILNefuy4l/",
    igAfter: "https://www.instagram.com/p/C6ILYdzOAG8/",
  },
  {
    id: "body-paint-set-d",
    titleEn: "Body & paint job D",
    titleEs: "Trabajo de carrocería y pintura D",
    before: "/before-after/ig-09-C5M-qqmuBSA.jpg",
    after: "/before-after/ig-08-C5M-vqiudcC.jpg",
    beforeLabelEn: "Stage 1",
    beforeLabelEs: "Etapa 1",
    afterLabelEn: "Stage 2",
    afterLabelEs: "Etapa 2",
    igBefore: "https://www.instagram.com/p/C5M-qqmuBSA/",
    igAfter: "https://www.instagram.com/p/C5M-vqiudcC/",
  },
  {
    id: "body-paint-set-e",
    titleEn: "Body & paint job E",
    titleEs: "Trabajo de carrocería y pintura E",
    before: "/before-after/ig-11-Csuw-0kuGoY.jpg",
    after: "/before-after/ig-10-C5M-c_zOkVB.jpg",
    beforeLabelEn: "Stage 1",
    beforeLabelEs: "Etapa 1",
    afterLabelEn: "Stage 2",
    afterLabelEs: "Etapa 2",
    igBefore: "https://www.instagram.com/p/Csuw-0kuGoY/",
    igAfter: "https://www.instagram.com/p/C5M-c_zOkVB/",
  },
];

export const IG_HANDLE = "francisco4704";
export const IG_PROFILE = "https://www.instagram.com/francisco4704/";
