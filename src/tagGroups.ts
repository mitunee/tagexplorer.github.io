export interface TagGroup {
  slug: string
  wikiPage?: string
  prompt?: string
  tags: string[]
  fails?: string[]
}

export const defaultPrompt = '1girl, bob cut, black hair, bedroom,'

export const unconventionalMedia: TagGroup = {
  slug: 'unconventional_media',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/unconventional_media',
  // prettier-ignore
  tags: [ 'amigurumi \\(medium\\)', 'diorama \\(medium\\)', 'food art \\(medium\\)', 'kyaraben \\(medium\\)', 'latte art \\(medium\\)', 'lego \\(medium\\)', 'model kit \\(medium\\)', 'papercraft \\(medium\\)', 'kirigami \\(medium\\)', 'paper child', 'paper cutout \\(medium\\)', 'sand \\(medium\\)', 'snow \\(medium\\)', 'stop motion animation', 'wax \\(medium\\)', 'wood carving \\(medium\\)', ],
  // prettier-ignore
  fails: [ '3d printing \\(medium\\)', 'clay \\(medium\\)', 'garage kit \\(medium\\)', 'origami \\(medium\\)', 'polystrene \\(medium\\)', ],
}

export const traditionalMedia: TagGroup = {
  slug: 'traditional_media',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/traditional_media',
  // prettier-ignore
  tags: [ 'acrylic paint \\(medium\\)', 'airbrush \\(medium\\)', 'ballpoint pen \\(medium\\)', 'brush \\(medium\\)', 'chalk \\(medium\\)', 'calligraphy brush \\(medium\\)', 'canvas \\(medium\\)', 'charcoal \\(medium\\)', 'colored pencil \\(medium\\)', 'color ink \\(medium\\)', 'coupy pencil \\(medium\\)', 'crayon \\(medium\\)', 'gouache \\(medium\\)', 'graphite \\(medium\\)', 'ink \\(medium\\)', 'marker \\(medium\\)', 'millipen \\(medium\\)', 'nib pen \\(medium\\)', 'oil painting \\(medium\\)', 'painting \\(medium\\)', 'pastel \\(medium\\)', 'photo \\(medium\\)', 'tempera \\(medium\\)', 'watercolor \\(medium\\)', 'watercolor pencil \\(medium\\)', ],
}

export const imageCompositionViewAngle: TagGroup = {
  slug: 'image_composition_-_view_angle',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition',
  // prettier-ignore
  tags: [ 'dutch angle', 'from above', 'from behind', 'from below', 'from side', 'high up', 'multiple views', 'sideways', 'straight-on', 'upside-down', ],
}

export const imageCompositionPerspectiveDepth: TagGroup = {
  slug: 'image_composition_-_perspective-depth',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition',
  // prettier-ignore
  tags: ["atmospheric perspective", "fisheye", "panorama", "perspective", "vanishing point", "variations"],
}

export const imageCompositionComposition: TagGroup = {
  slug: 'image_composition_-_composition',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition',
  // prettier-ignore
  tags: ["afterimage", "border", "fading border", "inset border", "ornate border", "outside border", "rounded corners", "viewfinder", "collage", "column lineup", "diorama", "from outside", "glitch", "isometric", "letterboxed", "pillarboxed", "lineup", "mosaic art", "photomosaic", "negative space", "omake", "outside border", "pov", "social media composition", "symmetry", "polar opposites", "rotational symmetry", "tachi-e", "trim marks", "zoom layer", "projected inset"],
}

// export const imageComposition: TagGroup = {
// slug: 'image_composition',
// wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition',
// tags: [],
// }

export const allTagGroups: TagGroup[] = [
  unconventionalMedia,
  traditionalMedia,
  imageCompositionComposition,
  imageCompositionPerspectiveDepth,
  imageCompositionViewAngle,
]
