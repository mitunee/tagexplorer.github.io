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
        name: 'eyes out of frame',
        positivePromptOverride: 'masterpiece, best quality, amazing quality, 1girl, white shirt, (eyes out of frame:1.1),'
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
      }
    ]),
  fails: ['eyes out of frame'].map(noOverride),
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

// POSES
