import { faceTagsFailsList, faceTagsList, focusTags } from './nonoWords'

export interface TagGroup {
  slug: string
  wikiPage?: string
  prompt?: string
  tags: Tag[]
  fails?: Tag[]
  portrait?: boolean
}

export interface Tag {
  name: string
  positivePromptOverride?: string
  negativePromptOverride?: string
}

export const noOverride = (tag: string): Tag => ({ name: tag })

export const defaultPrompt =
  'masterpiece, best quality, amazing quality, 1girl, solo, bob cut, black hair, red cardigan, collared shirt, medium breasts, kitchen,'

const facePrompt =
  'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on, looking at viewer, simple background,'

export const faceTags: TagGroup = {
  slug: 'face_tags_-_expressions',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aface_tags',
  portrait: true,
  prompt: facePrompt,
  // prettier-ignore
  tags: faceTagsList,
  fails: faceTagsFailsList,
}

export const faceTagsDrawingStyles: TagGroup = {
  slug: 'face_tags_-_drawing_styles',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aface_tags',
  portrait: true,
  prompt: facePrompt,
  // prettier-ignore
  tags: [ 'constricted pupils', 'cross-eyed', 'wide-eyed', 'chestnut mouth', 'dot mouth', 'mouth drool', 'no mouth', 'rectangular mouth', 'split mouth', 'yurie mouth', 'wavy mouth', 'mob face', ]
    .map(noOverride)
    .concat([
      {
        name: 'sideways mouth',
        positivePromptOverride:
          'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, from side, looking at viewer, simple background, (sideways mouth:1.1)',
      },
    ]),
}

export const faceTagsMulticoloredHair: TagGroup = {
  slug: 'face_tags_-_multicolored_hair',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Ahair_color',
  portrait: true,
  prompt:
    'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, upper body, straight-on, looking at viewer, simple background,',
  // prettier-ignore
  tags: [ 'multicolored hair', 'colored inner hair', 'colored tips', 'gradient hair', 'patterned hair', 'rainbow hair', 'split-color hair', 'spotted hair', 'streaked hair', 'striped hair', 'two-tone hair', ]
  .map(noOverride).concat([
    {name:'roots \\(hair\\)',positivePromptOverride:'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, upper body, straight-on, looking at viewer, simple background, platinum blonde hair,  (roots_\\(hair\\):1.1)'}
  ]),
  fails: ['raccoon tails \\(hairstyle\\)'].map(noOverride),
}

export const faceTagsHairStyles: TagGroup = {
  slug: 'face_tags_-_hair_styles',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Ahair_styles',
  portrait: true,
  prompt:
    'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, black hair, upper body, straight-on, looking at viewer, simple background,',
  // prettier-ignore
  tags: [ 'buzz cut', 'crew cut', 'pixie cut', 'bob cut', 'inverted bob', 'bowl cut', 'undercut', 'flattop', 'chonmage', 'parted hair', 'flipped hair', 'wolf cut', 'hime cut', 'mullet', 'bantu knots', 'bow-shaped hair', 'shuangyaji', 'four leaf clover hairstyle', 'rabbit hairstyle', 'braid', 'braided bangs', 'front braid', 'side braid', 'crown braid', 'single braid', 'multiple braids', 'twin braids', 'low twin braids', 'tri braids', 'quad braids', 'african braids', 'cornrows', 'dreadlocks', 'flower-shaped hair', 'hair bun', 'braided bun', 'single hair bun', 'double bun', 'cone hair bun', 'donut hair bun', 'heart hair bun', 'triple bun', 'hair rings', 'feixianji', 'katsuyamamage', 'single hair ring', 'half updo', 'half up braid', 'half up half down braid', 'one side up', 'two side up', 'low-braided long hair', 'low-tied long hair', 'mizura', 'multi-tied hair', 'nihongami', 'ponytail', 'folded ponytail', 'front ponytail', 'high ponytail', 'short ponytail', 'side ponytail', 'split ponytail', 'star-shaped hair', 'topknot', 'twintails', 'low twintails', 'short twintails', 'uneven twintails', 'tri tails', 'quad tails', 'quin tails', 'twisted hair', 'afro', 'huge afro', 'beehive hairdo', 'crested hair', 'liangbatou', 'pompadour', 'quiff', 'shouten pegasus mix mori', 'curly hair', 'drill hair', 'twin drills', 'tri drills', 'hair flaps', 'messy hair', 'pointy hair', 'ringlets', 'spiked hair', 'straight hair', 'wavy hair', 'fluffy hair', ].map(noOverride),
}

export const faceTagsHairTopOfHead: TagGroup = {
  slug: 'face_tags_-_hair_-_top_of_head',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Ahair_styles',
  portrait: true,
  prompt: facePrompt,
  // prettier-ignore
  tags: [ 'ahoge', 'heart ahoge', 'huge ahoge', 'antenna hair', 'heart antenna hair', 'comb over', 'hair pulled back', 'hair slicked back', 'mohawk', ].map(noOverride),
  fails: ['oseledets'].map(noOverride),
}

export const faceTagsHairBangsFrontOfHead: TagGroup = {
  slug: 'face_tags_-_hair_-_bangs_-_front_of_head',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Ahair_styles',
  portrait: true,
  prompt: facePrompt,
  // prettier-ignore
  tags: [ 'arched bangs', 'asymmetrical bangs', 'bangs pinned back', 'blunt bangs', 'braided bangs', 'crossed bangs', 'choppy bangs', 'wispy bangs', 'diagonal bangs', 'fanged bangs', 'short bangs', 'long bangs', 'hair between eyes', 'hair over one eye', 'hair over eyes', 'parted bangs', 'curtained hair', 'swept bangs', 'colored bangs', 'hair intakes', 'single hair intake', 'sidelocks', 'asymmetrical sidelocks', 'drill sidelocks', 'low-tied sidelocks', 'sidelocks tied back', 'single sidelock', "widow's peak", ].map(noOverride),
}

export const styleArtStyles: TagGroup = {
  slug: 'style_-_art_styles',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Avisual_aesthetic',
  // prettier-ignore
  tags: [ '1980s \\(style\\)', '1990s \\(style\\)', '2000s \\(style\\)', 'art deco', 'art nouveau', 'cubism', 'impressionism', 'ligne claire', 'low poly', 'nihonga', 'sumi-e', 'ukiyo-e', ].map(noOverride),
  fails: ['cave paintings'].map(noOverride),
}

export const styleGeneralAesthetics: TagGroup = {
  slug: 'style_-_general_aesthetics',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Avisual_aesthetic',
  // prettier-ignore
  tags: ["abstract", "acid graphics", "biopunk", "blingee", "cyberpunk", "dieselpunk", "dunhuang style", "frutiger aero", "frutiger metro", "heisei retro", "silkpunk", "steampunk", "surreal", "synthwave", "tenshi kaiwai", "weirdcore", "vaporwave", "yami kawaii", "yume kawaii"].map(noOverride),
  fails: ['gurokawa'].map(noOverride),
}

export const styleTraditionalMedia: TagGroup = {
  slug: 'style_-_traditional_media',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/traditional_media',
  // prettier-ignore
  tags: [ 'acrylic paint \\(medium\\)', 'airbrush \\(medium\\)', 'ballpoint pen \\(medium\\)', 'brush \\(medium\\)', 'chalk \\(medium\\)', 'calligraphy brush \\(medium\\)', 'canvas \\(medium\\)', 'charcoal \\(medium\\)', 'colored pencil \\(medium\\)', 'color ink \\(medium\\)', 'coupy pencil \\(medium\\)', 'crayon \\(medium\\)', 'gouache \\(medium\\)', 'graphite \\(medium\\)', 'ink \\(medium\\)', 'marker \\(medium\\)', 'millipen \\(medium\\)', 'nib pen \\(medium\\)', 'oil painting \\(medium\\)', 'painting \\(medium\\)', 'pastel \\(medium\\)', 'photo \\(medium\\)', 'tempera \\(medium\\)', 'watercolor \\(medium\\)', 'watercolor pencil \\(medium\\)', ].map(noOverride),
}

export const styleParodies: TagGroup = {
  slug: 'style_-_parodies',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/list_of_style_parodies',
  // prettier-ignore
  tags: ['retro artstyle', '1920s \\(style\\)', '1930s \\(style\\)', '1940s \\(style\\)', '1950s \\(style\\)', '1960s \\(style\\)', '1970s \\(style\\)', '1980s \\(style\\)', '1990s \\(style\\)', '2000s \\(style\\)', 'pinup \\(style\\)','toon \\(style\\)', 'cartoonized', 'western comics \\(style\\)'].map(noOverride),
}

export const styleArtistParodies: TagGroup = {
  slug: 'style_-_artist_parodies',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/style_parody',
  // prettier-ignore
  tags: [ 'alphes \\(style\\)', 'araki hirohiko \\(style\\)', 'asanagi \\(style\\)', 'bkub \\(style\\)', 'charles schulz \\(style\\)', 'clamp \\(style\\)', 'fujiko f. fujio \\(style\\)', 'fukumoto nobuyuki \\(style\\)', 'channel \\(caststation\\) \\(style\\)', 'gyari \\(imagesdawn\\) \\(style\\)', 'hara tetsuo \\(style\\)', 'harukawa moe \\(style\\)', 'ishikei \\(style\\)', 'itou ikuko \\(style\\)', 'kantoku \\(style\\)', 'komatsuzaki rui \\(style\\)', 'kubo tite \\(style\\)', 'mifune takashi \\(style\\)', 'oda eiichirou \\(style\\)', 'omocat \\(style\\)', 'riyo \\(style\\)', 'shibafu \\(style\\)', 'soejima shigenori \\(style\\)', 'sugimori ken \\(style\\)', 'takahashi kazuki \\(style\\)', 'takeuchi takashi \\(style\\)', 'tatsuki \\(style\\)', 'toriyama akira \\(style\\)', 'ueda masashi \\(style\\)', 'usui yoshito \\(style\\)', 'vanripper \\(style\\)', 'walfie \\(style\\)', 'zun \\(style\\)', ].map(noOverride),
}

export const imageCompositionViewAngle: TagGroup = {
  slug: 'image_composition_-_view_angle',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition',
  // prettier-ignore
  tags: [ 'dutch angle', 'from above', 'from behind', 'from below', 'from side', 'high up', 'multiple views', 'sideways', 'straight-on', 'upside-down', ].map(noOverride),
}

export const imageCompositionPerspectiveDepth: TagGroup = {
  slug: 'image_composition_-_perspective-depth',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition',
  // prettier-ignore
  tags: [ 'atmospheric perspective', 'fisheye', 'panorama', 'perspective', 'vanishing point', 'variations', 'depth of field', 'blurry background', 'blurry foreground', ].map(noOverride),
}

export const imageCompositionComposition: TagGroup = {
  slug: 'image_composition_-_composition',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition',
  // prettier-ignore
  tags: [ 'afterimage', 'border', 'fading border', 'inset border', 'ornate border', 'outside border', 'rounded corners', 'viewfinder', 'collage', 'column lineup', 'diorama', 'from outside', 'glitch', 'isometric', 'letterboxed', 'pillarboxed', 'lineup', 'mosaic art', 'photomosaic', 'negative space', 'omake', 'pov', 'social media composition', 'symmetry', 'rotational symmetry', 'tachi-e', 'zoom layer', 'projected inset', ].map(noOverride),
  fails: ['trim marks', 'polar opposites'].map(noOverride),
}

export const imageCompositionFormat: TagGroup = {
  slug: 'image_composition_-_format',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition',
  // prettier-ignore
  tags: [ '3d', 'anime screenshot', 'calendar \\(medium\\)', 'card \\(medium\\)', 'comic', '1koma', '3koma', '4koma', 'multiple 4koma', 'borderless panels', 'silent comic', 'album cover', 'cover page', 'doujin cover', 'dvd cover', 'fake cover', 'magazine cover', 'manga cover', 'video game cover', 'fake screenshot', 'fake phone screenshot', 'game cg', 'game screenshot', 'gyotaku \\(medium\\)', 'logo', 'kirigami', 'lineart', 'no lineart', 'outline', 'mosaic art', 'photomosaic', 'oekaki', 'official art', 'photo', 'papercraft', 'paper cutout', 'pixel art', 'postcard', 'poster', 'tegaki', 'thumbnail collage', 'vector trace', 'official wallpaper', ].map(noOverride),
  // prettier-ignore
  fails: [ '2koma', '5koma', 'character single', 'cover', 'icon', 'paper child', 'phonecard', 'scan', 'shitajiki', 'triptych \\(art\\)', 'tileable', 'wallpaper', 'wallpaper forced', ].map(noOverride),
}

export const imageCompositionFocus: TagGroup = {
  slug: 'image_composition_-_focus',
  prompt:
    '// NOTE: clothing/breast tags were removed in some images to allow focus tags to function correctly.\nmasterpiece, best quality, amazing quality, 1girl, solo, tank top, medium breasts,',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Afocus_tags',
  // prettier-ignore
  tags: focusTags,
}

export const imageCompositionColor: TagGroup = {
  slug: 'image_composition_-_color',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/colors',
  // prettier-ignore
  tags: [ 'aqua theme', 'black theme', 'blue theme', 'brown theme', 'green theme', 'grey theme', 'orange theme', 'pink theme', 'purple theme', 'red theme', 'white theme', 'yellow theme', 'monochrome', 'partially colored', 'greyscale with colored background', 'spot color', 'dark', 'muted color', 'pale color', 'sepia', 'high contrast', 'limited palette', 'pastel colors', 'double exposure', 'vignetting', 'inverted colors', 'neon palette', ].map(noOverride),
}

export const imageCompositionTechniques: TagGroup = {
  slug: 'image_composition_-_techniques',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition',
  // prettier-ignore
  tags: [ 'blending', 'bloom', 'bokeh', 'caustics', 'chiaroscuro', 'chromatic aberration', 'heavy chromatic aberration', 'diffraction spikes', 'depth of field', 'distortion', 'dithering', 'double exposure', 'drop shadow', 'emphasis lines', 'film grain', 'foreshortening', 'glitch', 'gradient', 'halftone', 'hatching \\(texture\\)', 'linear hatching', 'crosshatching', 'woven hatching', 'high contrast', 'jpeg artifacts on purpose', 'lens flare', 'heavy lens flare', 'motion blur', 'motion lines', 'multiple monochrome', 'optical illusion', 'anaglyph', 'stereogram', 'overexposure', 'pointillism', 'scanlines', 'screentones', 'ben-day dots', 'silhouette', 'speed lines', 'stippling \\(texture\\)', 'vignetting', ].map(noOverride),
}

export const imageCompositionTechniquesLighting: TagGroup = {
  slug: 'image_composition_-_techniques_-_lighting',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Alighting',
  // prettier-ignore
  tags: [ 'backlighting', 'sidelighting', 'underlighting', 'bloom', 'sunlight', 'sunbeam', 'dappled sunlight', 'moonlight', 'spotlight', 'stage lights', 'caustics', 'crack of light', 'refraction', 'light rays', 'dim lighting', 'morning', 'dawn', 'twilight', 'sunrise', 'day', 'evening', 'sunset', 'dusk', 'night', 'shade', 'tree shade', 'shadow', 'colored shadow', 'window shadow', 'dark', 'darkness', ].map(noOverride),
}

export const imageCompositionTraditionalJapanesePatterns: TagGroup = {
  slug: 'image_composition_-_traditional_japanese_patterns',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition',
  // prettier-ignore
  tags: [ 'asa no ha \\(pattern\\)', 'egasumi', 'igeta \\(pattern\\)', 'kagome \\(pattern\\)', 'kanoko \\(pattern\\)', 'karakusa \\(pattern\\)', 'kojitsunagi \\(pattern\\)', 'matsu symbol', 'seigaiha', 'shima \\(pattern\\)', 'shippou \\(pattern\\)', 'uchiwa', 'uroko \\(pattern\\)', 'yagasuri', ].map(noOverride),
  // prettier-ignore
  fails: [ 'genjiguruma', 'goshoguruma', 'kikkoumon', 'kikumon', 'sakuramon', 'sayagata', 'tatewaku', ].map(noOverride),
}

export const imageCompositionPrintsPatterns: TagGroup = {
  slug: 'image_composition_-_prints_-_patterns',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aprints',
  prompt:
    'masterpiece, best quality, amazing quality, 1girl, bob cut, black hair, medium breasts, print shirt, upper body,',
  // prettier-ignore
  tags: [ 'patterns', 'argyle', 'asa no ha', 'camouflage', 'checkered', 'honeycomb', 'houndstooth', 'pinstripe pattern', 'plaid', 'gingham', 'polka dot', 'sayagata', 'seigaiha', 'striped', 'diagonal stripes', 'horizontal stripes', 'vertical stripes', 'colored stripes', 'multicolored stripes', 'tiger stripes', 'double vertical stripe', 'invasion stripes', 'yagasuri', 'specific prints', 'animal print', 'bat print', 'bear print', 'bird print', 'cow print', 'leopard print', 'tiger print', 'snake print', 'zebra print', 'fireworks print', 'flag print', 'floral print', 'cherry blossom print', 'food print', 'game controller print', 'moon print', 'crescent print', 'handprint', 'leaf print', 'musical note print', 'piano print', 'watermelon print', ].map(noOverride),
}

export const imageCompositionFramingTheBody: TagGroup = {
  slug: 'image_composition_-_framing_the_body',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition',
  prompt:
    '// clothing tags were added on a case by case basis\nmasterpiece, best quality, amazing quality, 1girl,',
  // prettier-ignore
  tags: ['multiple views']
    .map(noOverride)
    .concat([
      {
        name: 'cropped',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, (cropped:1.1),'
      },
      {
        name: 'cropped head',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, (cropped head:1.1),'
      },
      {
        name: 'very wide shot',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, (very wide shot:1.1),'
      },
      {
        name: 'cropped arms',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, (cropped arms:1.1),'
      },
      {
        name: 'close-up',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, black hair, (close-up:1.1),'
      },
      {
        name: 'split crop',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, (split crop:1.1),'
      },
      {
        name: 'cropped shoulders',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, (cropped shoulders:1.1),'
      },
      {
        name: 'feet out of frame',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, (feet out of frame:1.1),'
      },
      {
        name: 'lower body',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, white shirt, black pants, (lower body:1.1),'
      },
      {
        name: 'cropped legs',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, (cropped legs:1.1),'
      },
      {
        name: 'upper body',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, white shirt, black hair, (upper body:1.1),'
      },
      {
        name: 'wide shot',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, (wide shot:1.1),'
      },
      {
        name: 'cropped torso',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, (cropped torso:1.1),'
      },
      {
        name: 'cowboy shot',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, red hoodie,  black pants, (cowboy shot:1.1),'
      },
      {
        name: 'full body',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, (full body:1.1),'
      },
      {
        name: 'portrait',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, (portrait:1.1),'
      }
    ]),
  fails: [
    {
      name: 'eyes out of frame',
      positivePromptOverride:
        'masterpiece, best quality, amazing quality, 1girl, white shirt, (eyes out of frame:1.1),',
    },
  ],
}

export const eyes: TagGroup = {
  slug: 'face_tags_-_eyes',
  prompt: facePrompt,
  portrait: true,
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aeyes_tags',
  // prettier-ignore
  tags: ['half-closed eyes', 'crazy eyes', 'jitome', 'squinting', 'dashed eyes', 'solid circle eyes', 'o o', 'solid oval eyes', 'tareme', 'tsurime', 'sanpaku', 'sparkling eyes', 'wince', 'bags under eyes', 'aegyo sal', 'bruised eye', 'flaming eyes', 'glowing eyes', 'button eyes', 'cephalopod eyes', 'compound eyes', 'horizontal pupils', 'lens eye', 'pixel eyes']
    .map(noOverride)
    // lots of unnecessary overrides here because I prompted them manually...
    // to be cleaned up someday
    .concat([
      {
        name: 'narrowed eyes',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on,  simple background, (narrowed eyes:1.1),'
      },
      {
        name: 'wall-eyed',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on,  simple background, (wall-eyed:1.1),'
      },
      {
        name: 'pleading eyes',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on,  simple background, (pleading eyes:1.1),'
      },
      {
        name: 'upturned eyes',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on,  simple background, (upturned eyes:1.1),'
      },
      {
        name: 'cross-eyed',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on,  simple background, (cross-eyed:1.1),'
      },
      {
        name: 'heart-shaped eyes',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on, looking at viewer, simple background, (heart-shaped eyes:1),'
      },
      {
        name: 'squiggle eyes',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on,  simple background, (squiggle eyes:1.1),'
      },
      {
        name: 'ringed eyes',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on,  simple background, (ringed eyes:1.1),'
      },
      {
        name: 'averting eyes',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on,  simple background, (averting eyes:1.1),'
      },
      {
        name: 'pac-man eyes',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on,  simple background, (pac-man eyes:1.1),'
      },
      {
        name: 'googly eyes',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on,  simple background, (googly eyes:1.1),'
      },
      {
        name: 'empty eyes',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on, looking at viewer, simple background, (empty eyess:1.1),'
      },
      {
        name: 'rolling eyes',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on,  simple background, (rolling eyes:1.1),'
      },
      {
        name: 'wide-eyed',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on,  simple background, (wide-eyed:1.1),'
      },
      {
        name: 'bulging eyes',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on, looking at viewer, simple background, (bulging eyes:1),'
      },
      {
        name: 'sideways glance',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on,  simple background, (sideways glance:1.1),'
      }
    ]),
  fails: ['pleading eyes'].map(noOverride).concat([
    {
      name: 'spiral-only eyes',
      positivePromptOverride:
        'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on, looking at viewer, simple background, (spiral-only eyes:1),',
    },
    {
      name: 'unusually open eyes',
      positivePromptOverride:
        'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, upper body, straight-on,  simple background, (unusually open eyes:1.1),',
    },
  ]),
}

export const eyesPupils: TagGroup = {
  slug: 'face_tags_-_eyes_-_pupils',
  prompt: facePrompt,
  portrait: true,
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aeyes_tags',
  // prettier-ignore
  tags: [ 'constricted pupils', 'dilated pupils', 'extra pupils', 'horizontal pupils', 'no pupils', 'slit pupils', 'symbol-shaped pupils', 'diamond-shaped pupils', 'flower-shaped pupils', 'heart-shaped pupils', 'star-shaped pupils', 'solid circle pupils', 'cross-shaped pupils', 'x-shaped pupils', 'snowflakes-shaped pupils', 'mismatched pupils', ].map(noOverride),
}

/*
 * POSTURE (WIP)
 */

const fullBodyPrompt =
  'masterpiece, best quality, amazing quality, official art, 1girl, solo, white shirt, bob cut, black hair, blue pants, simple background,'

const fullBody2girlsPrompt =
  'masterpiece, best quality, amazing quality, official art, 2girls, white shirt, bob cut, black hair, blue pants, simple background,'

const fullBodyNgirlsPrompt = (n: number) =>
  `masterpiece, best quality, amazing quality, official art, ${n}girls, white shirt, bob cut, black hair, blue pants, simple background,`

const withFullBody2girlsOverride = (tag: string) => ({
  name: tag,
  positivePromptOverride: `${fullBody2girlsPrompt} (${tag}:1.1),`,
})

const withFullBodyNgirlsOverride = (n: number, tag: string) => ({
  name: tag,
  positivePromptOverride: `${fullBodyNgirlsPrompt(n)} (${tag}:1.1),`,
})

const withFullBodyOverride = (tag: string) => ({
  name: tag,
  positivePromptOverride: `${fullBodyPrompt} (${tag}:1.1),`,
})

export const postureBasicPositionsTags: TagGroup = {
  slug: 'posture_-_basic_positions',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aposture',
  portrait: true,
  prompt: fullBodyPrompt,
  tags: [
    'kneeling',
    'on one knee',
    'lying',
    'crossed legs',
    'fetal position',
    'on back',
    'on side',
    'on stomach',
    'sitting',
    'butterfly sitting',
    'figure four sitting',
    'indian style',
    'lotus position',
    'hugging own legs',
    'reclining',
    'seiza',
    'wariza',
    'yokozuwari',
    'standing',
    'balancing',
    'legs apart',
    'standing on one leg',
  ]
    .map(noOverride)
    .concat(
      [
        'sitting on person',
        'sitting on head',
        'sitting on lap',
        'shoulder carry',
        'human chair',
        'straddling',
        'thigh straddling',
        'upright straddle',
      ].map(withFullBody2girlsOverride),
    ),
}

export const postureMovementOfTheBodyTags: TagGroup = {
  slug: 'posture_-_movement_of_the_body',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aposture',
  portrait: true,
  prompt: fullBodyPrompt,
  tags: [
    'balancing',
    'crawling',
    'midair',
    'falling',
    'floating',
    'flying',
    'jumping',
    'hopping',
    'pouncing',
    'running',
    'walking',
    'wallwalking',
  ].map(noOverride),
}

export const postureOtherPosturesWholeBodyTags: TagGroup = {
  slug: 'posture_-_other_postures_potentially_involving_the_whole_body',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aposture',
  portrait: true,
  prompt: fullBodyPrompt,
  tags: [
    'all fours',
    'top-down bottom-up',
    'prostration',
    'bear position',
    'bowlegged pose',
    'chest stand',
    'chest stand handstand',
    'cowering',
    'crucifixion',
    'fighting stance',
    'battoujutsu stance',
    'spread eagle position',
    'squatting',
    'stretching',
    'superhero landing',
    'upside-down',
    'handstand',
    'headstand',
    'yoga',
    'scorpion pose',
  ]
    .map(noOverride)
    .concat([
      {
        name: 'faceplant',
        positivePromptOverride: `${fullBodyPrompt} upside down, (faceplant:1.1),`,
      },
    ]),
  fails: ['ruppelbend', 'quadfold', 'full scorpion', 'triplefold'].map(noOverride),
}

export const postureTorsoInclinationTags: TagGroup = {
  slug: 'posture_-_torso_inclination',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aposture',
  portrait: true,
  prompt: fullBodyPrompt,
  tags: [
    'arched back',
    'bent back',
    'bent over',
    'leaning back',
    'leaning forward',
    'slouching',
    'sway back',
    'twisted torso',
  ].map(noOverride),
}

export const postureArmsTags: TagGroup = {
  slug: 'posture_-_arms',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aposture',
  portrait: true,
  prompt: facePrompt,
  tags: [
    'arm behind back',
    'arms behind back',
    'arm up',
    'arm behind head',
    'salute',
    'shushing',
    'v over eye',
    'waving',
    'victory pose',
    'arms up',
    '\\o/',
    'arms behind head',
    'heart hands',
    'finger frame',
    'horns pose',
    'outstretched arm',
    'outstretched arms',
    'spread arms',
    'arm at side',
    'arms at sides',
    'crossed arms',
    'flexing',
    'reaching',
    'shrugging',
    't-pose',
    'a-pose',
    'v arms',
    'w arms',
    'stroking own chin',
    'outstretched hand',
    'hand on own ear',
    'hand on own ass',
    'hand in pocket',
    'v',
    'interlocked fingers',
    'own hands clasped',
    'own hands together',
    'star hands',
  ].map(noOverride),
  fails: ['airplane arms', 'carry me', 'praise the sun', 'akanbe'].map(noOverride),
}

export const postureHipsTags: TagGroup = {
  slug: 'posture_-_hips',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aposture',
  portrait: true,
  prompt: fullBodyPrompt,
  tags: ['contrapposto', 'sway back'].map(noOverride),
}

export const postureLegsTags: TagGroup = {
  slug: 'posture_-_legs',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aposture',
  portrait: true,
  prompt: fullBodyPrompt,
  tags: [
    'crossed ankles',
    'leg up',
    'legs up',
    'knees to chest',
    'legs over head',
    'leg lift',
    'outstretched leg',
    'split',
    'pigeon pose',
    'standing split',
    'spread legs',
    'watson cross',
    'captain morgan pose',
    'knees apart feet together',
    'knees together feet apart',
    'knee up',
    'knees up',
    'pigeon-toed',
    'plantar flexion',
    'tiptoes',
  ]
    .map(noOverride)
    .concat([
      { name: 'tiptoe kiss', positivePromptOverride: `${fullBody2girlsPrompt} (tiptoe kiss:1.1),` },
    ]),
  fails: ['dorsiflexion', 'folded'].map(noOverride),
}

export const posturePostureOfTwoCharactersTags: TagGroup = {
  slug: 'posture_-_posture_of_at_least_two_characters',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aposture',
  portrait: true,
  prompt: fullBody2girlsPrompt,
  tags: [
    'ass-to-ass',
    'back-to-back',
    'belly-to-belly',
    'cheek-to-cheek',
    'eye contact',
    'face-to-face',
    'head on chest',
    'heads together',
    'holding hands',
    'leg lock',
    'locked arms',
    'over the knee',
    'noses touching',
    'shoulder-to-shoulder',
    'tail lock',
  ]
    .map(noOverride)
    .concat([
      {
        name: 'cheek-to-breast',
        positivePromptOverride:
          'masterpiece, best quality, amazing quality, official art, 2girls, white shirt, bob cut, black hair, blue pants, simple background, sitting, (cheek-to-breast:1.1),',
      },
      {
        name: 'forehead-to-forehead',
        positivePromptOverride:
          'masterpiece, best quality, amazing quality, official art, 2girls, white shirt, bob cut, black hair, blue pants, simple background, facing another, (forehead-to-forehead:1.1),',
      },
      {
        name: 'nipple-to-nipple',
        positivePromptOverride:
          'masterpiece, best quality, amazing quality, official art, 2girls, white shirt, bob cut, black hair, blue pants, simple background, censored nipples, (nipple-to-nipple:1.1),',
      },
    ]),
}

export const postureHuggingTags: TagGroup = {
  slug: 'posture_-_hugging',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aposture',
  portrait: true,
  prompt: fullBodyPrompt,
  tags: ['hugging own legs', 'hugging object', 'hugging tail', 'wing hug']
    .map(noOverride)
    .concat(['hug', 'arm hug', 'hug from behind', 'waist hug'].map(withFullBody2girlsOverride)),
}

export const postureCarryingSomeoneTags: TagGroup = {
  slug: 'posture_-_carrying_someone',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aposture',
  portrait: true,
  prompt: fullBody2girlsPrompt,
  tags: [
    'baby carry',
    'carrying',
    'carried breast rest',
    'carrying over shoulder',
    'carrying under arm',
    'child carry',
    "fireman's carry",
    'piggyback',
    'princess carry',
    'shoulder carry',
    'sitting on shoulder',
    'standing on shoulder',
  ].map(noOverride),
}

export const posturePosesTags: TagGroup = {
  slug: 'posture_-_poses',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Aposture',
  portrait: true,
  prompt: fullBodyPrompt,
  tags: [
    'rabbit pose',
    'horns pose',
    'paw pose',
    'claw pose',
    'archer pose',
    "bras d'honneur",
    'body bridge',
    'contrapposto',
    'dojikko pose',
    'ghost pose',
    'inugami-ke no ichizoku pose',
    'letter pose',
    'ojou-sama pose',
    'saboten pose',
    'symmetrical hand pose',
    'victory pose',
    'villain pose',
    'zombie pose',
    'gendou pose',
    'jojo pose',
    "dio brando's pose \\(jojo\\)",
    "giorno giovanna's pose \\(jojo\\)",
    'superman exposure',
    "jonathan joestar's pose \\(jojo\\)",
    "kujo jotaro's pose \\(jojo\\)",
    'kongou pose',
    'kujou karen pose',
  ].map(noOverride),
}

// gestures

//// Gestures encompassing at least two hands

// TODO: override needed because many gestures involve two or more characters
export const gesturesTwoHandsTags: TagGroup = {
  slug: 'gestures_-_gestures_encompassing_at_least_two_hands',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Agestures',
  portrait: true,
  prompt: facePrompt,
  tags: [
    'circle hands',
    'clenched hands',
    'cupping hands',
    'double finger gun',
    'double thumbs down',
    'double thumbs up',
    'double v',
    'fidgeting',
    'finger counting',
    'finger frame',
    'fist in hand',
    'groping motion',
    'heart hands',
    'horns pose',
    'own hands clasped',
    'palm-fist greeting',
    'palm-fist tap',
    'penetration gesture',
    'pinky swear',
    'rabbit pose',
    'shadow puppet',
    'steepled fingers',
    'x arms',
    'x fingers',
  ]
    .map(noOverride)
    .concat([
      withFullBody2girlsOverride('fist bump'),
      withFullBodyOverride('heart arms'),
      withFullBody2girlsOverride('heart hands duo'),
      withFullBodyNgirlsOverride(3, 'heart hands trio'),
      withFullBodyNgirlsOverride(4, 'heart hands quartet'),
      withFullBody2girlsOverride('high five'),
    ]),
  fails: [
    'air quotes',
    'carry me',
    'hand glasses',
    'kitsune no mado',
    'tsuki ni kawatte oshioki yo',
  ]
    .map(noOverride)
    .concat([withFullBody2girlsOverride('noogie')]),
}

// Gestures encompassing only one hand
export const gesturesOneHandTags: TagGroup = {
  slug: 'gestures_-_gestures_encompassing_only_one_hand',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Agestures',
  portrait: true,
  prompt: facePrompt,
  tags: [
    // One open finger
    'beckoning',
    'twirling hair',
    'index finger raised',
    'middle finger',
    'pinky out',
    'pointing',
    'pointing at self',
    'pointing at viewer',
    'pointing forward',
    'pointing up',
    'kamina pose',
    'shushing',
    'thumbs down',
    'thumbs up',
    // Two open fingers
    '\\n/',
    'crossed fingers',
    'finger gun',
    'finger heart',
    'fox shadow puppet',
    'shaka sign',
    'two-finger salute',
    'l hand',
    'v',
    'gyaru v',
    'v over eye',
    'v over mouth',
    // Three open fingers
    '\\m/',
    'middle w',
    'money gesture',
    'ok sign',
    'pinching gesture',
    'w',
    // Whole open hand
    'claw pose',
    'facepalm',
    'open hand',
    'reaching',
    'salute',
    'spread fingers',
    'stop \\(gesture\\)',
    'straight-arm salute',
    'vulcan salute',
    'waving',
    // Whole closed hand
    'clenched hand',
    'curled fingers',
    'dojikko pose',
    'paw pose',
    'power fist',
    'raised fist',
    // Variable number of open fingers of one hand
    'cunnilingus gesture',
    'fellatio gesture',
    'handjob gesture',
    'hat tip',
    'oral invitation',
    'oral simulation',
    'shocker \\(gesture\\)',
    'stroking own chin',
  ]
    .map(noOverride)
    .concat([
      withFullBody2girlsOverride('pointing at another'),
      withFullBody2girlsOverride('pointing spider-man \\(meme\\)'),
      withFullBodyOverride('pointing down'),
    ]),
  fails: [
    '\\||/',
    '\\|||/',
    'akanbe',
    'fig sign',
    'inward v',
    'number four \\(asl\\)',
    'ohikaenasutte',
    'saturday night fever',
  ].map(noOverride),
}

export const gesturesOtherTags: TagGroup = {
  slug: 'gestures_-_other_gestures',
  wikiPage: 'https://danbooru.donmai.us/wiki_pages/tag_group%3Agestures',
  portrait: true,
  prompt: fullBodyPrompt,
  tags: [
    'bowing',
    'curtsey',
    'distress hand signal',
    'heart tail',
    'holding with gesture',
    'orchid fingers',
    'shrugging',
    'toe-point',
    'victory pose',
  ]
    .map(noOverride)
    .concat([withFullBody2girlsOverride('heart tail duo')]),
  fails: ['air guitar', 'kuji-in'].map(noOverride),
}

export const gesturesTagGroups: TagGroup[] = [
  gesturesTwoHandsTags,
  gesturesOneHandTags,
  gesturesOtherTags,
]

export const postureTagGroups: TagGroup[] = [
  postureBasicPositionsTags,
  postureMovementOfTheBodyTags,
  postureOtherPosturesWholeBodyTags,
  postureTorsoInclinationTags,
  postureArmsTags,
  postureHipsTags,
  postureLegsTags,
  posturePostureOfTwoCharactersTags,
  postureHuggingTags,
  postureCarryingSomeoneTags,
  posturePosesTags,
]

export const faceTagGroups: TagGroup[] = [
  faceTags,
  faceTagsDrawingStyles,
  eyes,
  eyesPupils,
  faceTagsMulticoloredHair,
  faceTagsHairStyles,
  faceTagsHairBangsFrontOfHead,
  faceTagsHairTopOfHead,
]

export const styleTagGroups: TagGroup[] = [
  styleGeneralAesthetics,
  styleArtStyles,
  styleTraditionalMedia,
  styleParodies,
  styleArtistParodies,
]

export const compositionTagGroups: TagGroup[] = [
  imageCompositionComposition,
  imageCompositionPerspectiveDepth,
  imageCompositionViewAngle,
  imageCompositionFormat,
  imageCompositionFocus,
  imageCompositionColor,
  imageCompositionTechniques,
  imageCompositionTechniquesLighting,
  imageCompositionTraditionalJapanesePatterns,
  imageCompositionPrintsPatterns,
  imageCompositionFramingTheBody,
]
