export const CATEGORY_IMAGES = {
  hyaluron: "assets/images/Hyaluron-img.png",
  weitere: "assets/images/about2.png",
  kosmetik: "assets/images/about1.png",
};

export const treatments = [
  // HYALURON (9)
  { slug: "jawline", category: "hyaluron", related: ["kinn-aufbau", "wangenaufbau", "nasolabialfalte"] },
  { slug: "kinn-aufbau", category: "hyaluron", related: ["jawline", "wangenaufbau", "marionettenfalte"] },
  { slug: "augenringe", category: "hyaluron", related: ["nasolabialfalte", "wangenaufbau", "skinbooster"] },
  { slug: "lippenfalten", category: "hyaluron", related: ["lippenunterspritzung", "nasolabialfalte", "marionettenfalte"] },
  { slug: "lippenunterspritzung", category: "hyaluron", related: ["lippenfalten", "nasolabialfalte", "hylase"] },
  { slug: "russian-lips", category: "hyaluron", related: ["lippenunterspritzung", "lippenfalten", "hylase"] },
  { slug: "marionettenfalte", category: "hyaluron", related: ["nasolabialfalte", "lippenunterspritzung", "jawline"] },
  { slug: "wangenaufbau", category: "hyaluron", related: ["jawline", "kinn-aufbau", "vampire-lifting-prp"] },
  { slug: "nasolabialfalte", category: "hyaluron", related: ["marionettenfalte", "wangenaufbau", "skinbooster"] },
  // WEITERE (12)
  { slug: "hylase", category: "weitere", related: ["lippenunterspritzung", "jawline", "skinbooster"] },
  { slug: "botox", category: "weitere", related: ["jawline", "hylase", "nasolabialfalte"] },
  { slug: "mesotherapie", category: "weitere", related: ["skinbooster", "profhilo", "vampire-lifting-prp"] },
  { slug: "polynukleotide-pdrn", category: "weitere", related: ["skinbooster", "profhilo", "mesotherapie"] },
  { slug: "skinbooster", category: "weitere", related: ["profhilo", "mesotherapie", "vampire-lifting-prp"] },
  { slug: "profhilo", category: "weitere", related: ["skinbooster", "mesotherapie", "vampire-lifting-prp"] },
  { slug: "fett-weg-spritze", category: "weitere", related: ["mesotherapie", "hydrafacial", "carboxytherapie"] },
  { slug: "prp-haarausfall", category: "weitere", related: ["vampire-lifting-prp", "mesotherapie", "infusionstherapie"] },
  { slug: "vampire-lifting-prp", category: "weitere", related: ["prp-haarausfall", "profhilo", "radiofrequenz-microneedling"] },
  { slug: "infusionstherapie", category: "weitere", related: ["mesotherapie", "prp-haarausfall", "profhilo"] },
  { slug: "radiofrequenz-microneedling", category: "weitere", related: ["microneedling", "vampire-lifting-prp", "hifu-ultraschall"] },
  { slug: "hydrafacial", category: "weitere", related: ["mesotherapie", "chemische-peelings", "skinbooster"] },
  // KOSMETIK (5)
  { slug: "chemische-peelings", category: "kosmetik", related: ["microneedling", "hydrafacial", "radiofrequenz-needling"] },
  { slug: "radiofrequenz-needling", category: "kosmetik", related: ["radiofrequenz-microneedling", "microneedling", "hifu-ultraschall"] },
  { slug: "carboxytherapie", category: "kosmetik", related: ["mesotherapie", "vampire-lifting-prp", "skinbooster"] },
  { slug: "hifu-ultraschall", category: "kosmetik", related: ["radiofrequenz-needling", "radiofrequenz-microneedling", "vampire-lifting-prp"] },
  { slug: "microneedling", category: "kosmetik", related: ["radiofrequenz-needling", "vampire-lifting-prp", "chemische-peelings"] },
];
