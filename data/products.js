var PRODUCTS = [
  {
    "id": "prod-004",
    "name": "3 in 1 Puzzle",
    "categories": ["Puzzle & Games"],
    "mrp": 180,
    "fundooPrice": 160,
    "offerPrice": 150,
    "description": "3-in-1 Wooden Puzzle Toy | Brain Development & Skill Building Puzzle | Multicolour",
    "images": [
      "11xXUW-dPYnDCzKmYOsCs3Yo-qGBpBmAg"
    ],
    "stock": 14
  },
  {
    "id": "prod-005",
    "name": "3D Pencil Pouch",
    "categories": ["Stationery Sets"],
    "mrp": 160,
    "fundooPrice": 150,
    "offerPrice": 120,
    "description": "Eye-catching 3D pencil pouch with a fun pop-out design. Spacious enough for pens, pencils, erasers and more — a practical gift kids actually use every day.",
    "images": [
      "1KC5p07nO2UHrPK7K1AwryZPcwq2qiVmw"
    ],
    "stock": 20
  },
  {
    "id": "prod-006",
    "name": "Harry Potter Key Chain",
    "categories": ["Keychains", "Harry Potter Collection"],
    "mrp": 80,
    "fundooPrice": 75,
    "offerPrice": 60,
    "description": "Magical Harry Potter themed keychain for young Potterheads. Sturdy metal build with detailed character design — clip it to bags, pencil cases, or zipper pulls.",
    "images": [
      "13eXnjYVKUGmGXtoKXBFp44OuJ6L8BQ6Y"
    ],
    "stock": 10
  },
  {
    "id": "prod-007",
    "name": "Kuromi Key Chain",
    "categories": ["Keychains"],
    "mrp": 80,
    "fundooPrice": 75,
    "offerPrice": 60,
    "description": "Adorable Kuromi character keychain that Sanrio fans will love. Lightweight and durable with vibrant colours — a cute collectible return gift.",
    "images": [
      "16qWStHMH2RSiTJyEXA0jkQVNn5L5l-3Q"
    ],
    "stock": 10
  },
  {
    "id": "prod-008",
    "name": "Camer Projector Key Chain",
    "categories": ["Keychains"],
    "mrp": 100,
    "fundooPrice": 80,
    "offerPrice": 60,
    "description": "Mini camera-shaped keychain that projects fun images when you look through the viewfinder. A quirky, interactive gift that kids can't stop showing off.",
    "images": [
      "1CbVxStofiW_WXm-ofbLWHeMb-mvMrJ0x",
      "1h_vpY9gjEvrvuHCs0EZVNAImSxrNjNy-",
      "1AV_1larXWec_pVUFnHdaZdzgDAiQmQLK"
    ],
    "stock": 12
  },
  {
    "id": "prod-009",
    "name": "Scratch Book",
    "categories": ["Art & Craft"],
    "mrp": 50,
    "fundooPrice": 45,
    "offerPrice": 35,
    "description": "Rainbow scratch art book with wooden stylus included. Kids scratch away the black coating to reveal vibrant colours underneath — hours of creative fun.",
    "images": [
      "1fW3n70KubtaT13d2s1F7uQUDdYqk5u7q",
      "1z7plaG1Xpl4JQNsrY-FyhaWwnHZqOXrS"
    ],
    "stock": 20
  },
  {
    "id": "prod-010",
    "name": "Tattoo Book",
    "categories": ["Art & Craft"],
    "mrp": 50,
    "fundooPrice": 25,
    "offerPrice": 0,
    "description": "Temporary tattoo book with colourful, kid-safe designs. Easy to apply with water and washes off cleanly — perfect party fun at an unbeatable price.",
    "images": [
      "1ttjTUV6CqNIQ5z-fbwBnpNUXSqa78xli"
    ],
    "stock": 40
  },
  {
    "id": "prod-011",
    "name": "Character Pencil Pouch",
    "categories": ["Stationery Sets"],
    "mrp": 50,
    "fundooPrice": 35,
    "offerPrice": 30,
    "description": "Fun character-themed pencil pouch with zippered closure. Compact enough for school bags and roomy enough for essentials — a practical gift kids love.",
    "images": [
      "1GetwgZU0gaiBQA2I5m80kjgtcQdCNWPx",
      "1zgAd6I-2ddEThioxeC3rZWopdPU3pzkb"
    ],
    "stock": 12
  },
  {
    "id": "prod-012",
    "name": "Acrylic Marker set of 12",
    "categories": ["Stationery Sets"],
    "mrp": 200,
    "fundooPrice": 120,
    "offerPrice": 99,
    "description": "Set of 12 vibrant acrylic markers that work on paper, canvas, rocks, and more. Quick-drying and water-resistant — great for budding young artists.",
    "images": [
      "1t7ulf0pP7GrbL5Yz4-QuJIfghru8FnAg",
      "1R7H-JpFV_PeRPzsB0mncZp1eYQ1V8wco"
    ],
    "stock": 24
  },
  {
    "id": "prod-013",
    "name": "Bottle shaped Highlighter",
    "categories": ["Art & Craft"],
    "mrp": 140,
    "fundooPrice": 99,
    "offerPrice": 70,
    "description": "Cute bottle-shaped highlighter set with multiple bright colours. The novelty design makes studying and crafting more fun — a unique gift that stands out.",
    "images": [
      "190Y6fLrOUQkk4K9KszEqbhfJiXsABX3-",
      "18Z1g379Uw2_3zKtdcz9O1yxsh1mYvv6D"
    ],
    "stock": 12
  },
  {
    "id": "prod-014",
    "name": "Character Pencil",
    "categories": ["Stationery Sets"],
    "mrp": 30,
    "fundooPrice": 20,
    "offerPrice": 15,
    "description": "Pencil topped with a fun cartoon character figure. Available in assorted designs — an affordable return gift that kids will actually use at school.",
    "images": [
      "1ZkBkvloinI8jFr3TfCocYebEBAd46KFB",
      "1g5zEx-B_t_FDYPF4DPQbxKjEXpAibQ3S"
    ],
    "stock": 48
  },
  {
    "id": "prod-015",
    "name": "Diary with Lock",
    "categories": ["Stationery Sets"],
    "mrp": 99,
    "fundooPrice": 80,
    "offerPrice": 70,
    "description": "Personal diary with a built-in lock and key for keeping secrets safe. Colourful cover with lined pages inside — every kid's favourite gift to receive.",
    "images": [
      "1a3wo-OPP_zhX8grDwPmrd0FScPOSYJOV"
    ],
    "stock": 24
  },
  {
    "id": "prod-016",
    "name": "Diary with Pen",
    "categories": ["Stationery Sets"],
    "mrp": 125,
    "fundooPrice": 99,
    "offerPrice": 75,
    "description": "Stylish mini diary that comes paired with a matching pen. Compact size fits perfectly in school bags — ideal for notes, doodles, and creative writing.",
    "images": [
      "14CGlL-dhII3-jRbQP_CNI_b8p7cf3prF"
    ],
    "stock": 16
  },
  {
    "id": "prod-017",
    "name": "Dual side Markers",
    "categories": ["Art & Craft"],
    "mrp": 200,
    "fundooPrice": 150,
    "offerPrice": 110,
    "description": "Set of 12 dual-tip markers with a fine point on one end and a broad tip on the other. Rich, blendable colours for drawing, colouring, and craft projects.",
    "images": [
      "1SSWdI1pVj2xcX6AHmeAyJuamjYcMC96t"
    ],
    "stock": 12
  },
  {
    "id": "prod-018",
    "name": "Fur Diary",
    "categories": ["Stationery Sets"],
    "mrp": 225,
    "fundooPrice": 190,
    "offerPrice": 150,
    "description": "Soft, fluffy fur-covered diary that feels as good as it looks. Premium quality pages with a satisfying tactile cover — a gift that feels special to open.",
    "images": [
      "1UkrZAI4Ebpw1JTZvMn6zIvv5WHCtoFJm"
    ],
    "stock": 12
  },
  {
    "id": "prod-019",
    "name": "Keyboard Keychain",
    "categories": ["Keychains"],
    "mrp": 200,
    "fundooPrice": 180,
    "offerPrice": 120,
    "description": "Mini keyboard-shaped keychain with tiny clickable keys. A fun fidget-friendly accessory that tech-loving kids will absolutely adore.",
    "images": [
      "1nSxsIc6ay4s4mlxL4o6BWKQNApKUZk2B"
    ],
    "stock": 12
  },
  {
    "id": "prod-020",
    "name": "Magic Water Book",
    "categories": ["Art & Craft"],
    "mrp": 70,
    "fundooPrice": 60,
    "offerPrice": 50,
    "description": "Reusable colouring book that reveals hidden pictures when painted with water. Colours disappear as the page dries so kids can use it again and again.",
    "images": [
      "1_Z7QQzmrejk9JhslY0_XBdKIVZBUX2Mx"
    ],
    "stock": 24
  },
  {
    "id": "prod-021",
    "name": "Mini Stationery set",
    "categories": ["Stationery Sets"],
    "mrp": 110,
    "fundooPrice": 99,
    "offerPrice": 85,
    "description": "Compact stationery set with pencils, eraser, sharpener, ruler and mini notepad all in one pack. Everything a kid needs, neatly bundled as a ready-to-gift set.",
    "images": [
      "1EhqWlZ46ch2lsJQSlBZHdvl2gv535jP9"
    ],
    "stock": 20
  },
  {
    "id": "prod-022",
    "name": "PopIT Diary",
    "categories": ["Stationery Sets"],
    "mrp": 300,
    "fundooPrice": 199,
    "offerPrice": 150,
    "description": "Diary with a built-in Pop-It fidget cover — write notes and pop bubbles in between. A satisfying sensory experience combined with everyday utility.",
    "images": [
      "19NdXIYDGWV0SEQuC6iJDmPPeqS20_P-x",
      "1lHyEWuUN5ebEPYf2jeT7UsZFM8Hzswac"
    ],
    "stock": 12
  },
  {
    "id": "prod-023",
    "name": "Rope Game",
    "categories": ["Puzzle & Games"],
    "mrp": 180,
    "fundooPrice": 140,
    "offerPrice": 120,
    "description": "Classic rope puzzle that challenges kids to untangle and solve. Builds problem-solving skills and patience — a screen-free activity the whole family can enjoy.",
    "images": [
      "1NPp2XFJFnfUO8-2NWnD3asOREyuMR5FX"
    ],
    "stock": 14
  },
  {
    "id": "prod-024",
    "name": "Snowy 2-in-1 Writing Board",
    "categories": ["Stationery Sets"],
    "mrp": 200,
    "fundooPrice": 150,
    "offerPrice": 110,
    "description": "Two-in-one writing board with a whiteboard on one side and a chalkboard on the other. Comes with marker and chalk — perfect for learning, doodling, and play.",
    "images": [
      "15Adp39uHrdLlSJO6N8Jc9PDrRCtQV50V"
    ],
    "stock": 12
  },
  {
    "id": "prod-025",
    "name": "Fundoo Stamps",
    "categories": ["Art & Craft"],
    "mrp": 110,
    "fundooPrice": 99,
    "offerPrice": 80,
    "description": "Collection of fun-shaped stamps with a built-in ink pad. Kids can stamp colourful patterns on paper, cards and crafts — an easy creative activity for any age.",
    "images": [
      "1HStvnLFZMX1J8WlJ0zqhUX1s5IB4yem3",
      "159xbansbg0rjnMVJ1sVhWNLsVpnAUlsA"
    ],
    "stock": 24
  },
  {
    "id": "prod-026",
    "name": "Choo Choo Train",
    "categories": ["Toy Bundles"],
    "mrp": 199,
    "fundooPrice": 0,
    "offerPrice": 0,
    "description": "Colourful pull-along toy train with detachable carriages. Sturdy build for little hands — a timeless toy that sparks imaginative play.",
    "images": [
      "1dqhdd4meDoaAxugRGSXrn4qy6gOWycNn"
    ],
    "stock": 0
  },
  {
    "id": "prod-027",
    "name": "Silky Crayons - Pack of Six",
    "categories": ["Art & Craft"],
    "mrp": 120,
    "fundooPrice": 100,
    "offerPrice": 80,
    "description": "Set of 6 silky crayons offers a vibrant and unique coloring experience for both kids and adults alike.\n\nThis set features six high-quality crayons, each designed with a smooth, silky texture that glides effortlessly on paper.\n\nThe bold neon shades and shimmering metallic finishes bring your artwork to life, adding depth and a touch of sparkle to every creation. Whether you're drawing, shading, or creating intricate designs, these crayons provide rich, bright colors that are perfect for various art projects.",
    "images": [
      "1z9-gC7VM_pc50kbDjJDL5LFtMHuUkVvq",
      "1usqkl6dpvhyUJuUwlz7NqqyhI5qXnOc2"
    ],
    "stock": 20
  },
  {
    "id": "prod-028",
    "name": "Projection Flashlight",
    "categories": ["Toy Bundles"],
    "mrp": 150,
    "fundooPrice": 120,
    "offerPrice": 99,
    "description": "Transform any room into a world of imagination with our Magical Kids Projection Flashlight! This exciting 2-in-1 toy works as both a flashlight and an image projector, displaying over 24 colorful and captivating scenes that come alive on walls and ceilings. Ideal for bedtime storytelling, creative playtime, or as a unique return gift for children's birthday parties, this fun-filled toy inspires curiosity, creativity, and endless wonder through the magic of light and projection.",
    "images": [
      "1GfveVM4nmmoHTzlY0ToOrTZ6Z1SbJMqy",
      "1bHcjIwdPM5GOHA2QRXDM7hnaPwniLMm_"
    ],
    "stock": 15
  },
  {
    "id": "prod-029",
    "name": "Kluster Magnetic Game",
    "categories": ["Puzzle & Games"],
    "mrp": 280,
    "fundooPrice": 150,
    "offerPrice": 130,
    "description": "Magnetic Kluster Board Game | Magnet Game Fun Table Top Strategy Game Magnetic STEM, Magnetic Board Game for Kids & Adults with 24 Magnets",
    "images": [
      "1H3FTJTeE672MKVANQPB7xXwZu0cr0A0b",
      "1y1FXWqTgAyYztysrorIxukNYWXphzXDE"
    ],
    "stock": 15
  },
  {
    "id": "prod-030",
    "name": "Habit Tracker",
    "categories": ["Toy Bundles"],
    "mrp": 270,
    "fundooPrice": 230,
    "offerPrice": 210,
    "description": "🌟 Build Positive Habits with Ease: Stay focused, organized, and motivated every day with this Daily Habit Tracker Board. Perfect for managing routines, goals, chores, and tasks for both children and adults.\n\n✅ Fun & Interactive Task Tracking: Equipped with 10 customizable task slots and simple flip buttons (✔/✘), making it easy to mark activities as completed or pending while adding a fun element to productivity.\n\n♻️ Reusable & Eco-Friendly: Includes 15 durable reusable planning cards that can be swapped and reused daily, helping reduce paper waste while keeping your schedule organized.\n\n📈 Track Progress & Stay Motivated: Features a dedicated motivational quote section and a weekly progress card to help build consistency, celebrate achievements, and maintain momentum.\n\n🏠 Flexible Display Options: Designed with both a fold-out stand and wall-mount slots, allowing convenient use on desks, study tables, office workspaces, or classroom walls.\n\n📏 Product Details: Crafted from premium-quality durable plastic with a smooth finish. Compact and lightweight design measuring 22 × 13.5 cm (8.6 × 5.3 inches). Available in attractive Blue and Pink colors.\n\n📦 What's Included: 1 Habit Tracker Board, 15 Reusable Planning Cards, 1 Weekly Progress Card, and 1 Motivational Quote Sheet.",
    "images": [
      "15Rd5E3yghSxzYMJ3bVZz2vJpyIFg34PK",
      "1bLxAjExmqmpqiKq-S7x31UcdkLgyVl44",
      "13G1xSMrUBZqZIK-EsrgGnP7KAH_kU2pA"
    ],
    "stock": 15
  },
  {
    "id": "prod-031",
    "name": "Huntrix Long Diary",
    "categories": ["Stationery Sets", "K-Pop Collection"],
    "mrp": 250,
    "fundooPrice": 180,
    "offerPrice": 150,
    "description": "🎒 Portable & Travel-Friendly: Featuring a compact and lightweight design, this diary slips easily into school bags, backpacks, or handbags, making it a great companion for school, travel, and everyday note-taking.\n\n🎁 Wonderful Gift for Young Girls & Boys: A stylish and charming diary that's perfect for girls who enjoy pop culture, K-pop, music, creativity, and fashionable stationery.\n\n📝 Versatile Blank Pages: Filled with plain pages that provide the freedom to write journals, draw sketches, create doodles, record memories, or capture personal thoughts and ideas.",
    "images": [
      "1oob2qRDDzuWWb1uP8Hvt-6U1KYjkEtz0",
      "154nfTYOH3la5Xnr7gLqm8Qx1PHNXZGiZ"
    ],
    "stock": 10
  },
  {
    "id": "prod-032",
    "name": "Huntrix Spiral Journal Small",
    "categories": ["Art & Craft", "K-Pop Collection"],
    "mrp": 150,
    "fundooPrice": 100,
    "offerPrice": 90,
    "description": "✨ Capture Your Thoughts in Style with the K-Pop Demon Hunters Spiral Journal! Designed for K-pop enthusiasts and kawaii stationery lovers, this anime-inspired journal features eye-catching demon hunter artwork with vibrant Korean pop culture aesthetics, making it a fun and stylish companion for everyday creativity.\n\n📝 Perfect for Writing, Planning & Creativity: Whether you're journaling, taking notes, sketching, brainstorming ideas, setting goals, or organizing your day, this versatile journal provides plenty of space to express yourself.\n\n📚 Durable Spiral-Bound Design: Built with sturdy spiral binding and smooth-quality pages, allowing the journal to open flat for comfortable writing and easy page turning.\n\n🎒 Compact & Travel-Friendly: The convenient A5 size fits easily into backpacks, handbags, and tote bags, making it ideal for school, college, work, travel, or daily use.\n\n💜 Made for K-Pop & Anime Fans: Combining trendy Korean-inspired style with adorable anime artwork, this journal adds personality and aesthetic charm to any workspace, study desk, or stationery collection.\n\n🎁 Thoughtful Gift Idea: A perfect single-piece gift for birthdays, return gifts, special occasions, or anyone who loves K-pop, anime, journaling, and unique stationery.",
    "images": [
      "1vVsn7bLqsolS7aqs1ShU0jlvBjfHm5yg"
    ],
    "stock": 15
  },
  {
    "id": "prod-033",
    "name": "DIY Coloring Backpack",
    "categories": ["Art & Craft"],
    "mrp": 99,
    "fundooPrice": 0,
    "offerPrice": 0,
    "description": "🎨 Fun DIY Colouring Backpack Activity – Let kids unleash their creativity by decorating and personalizing their own drawstring bags using crayons, coloured pencils, sketch pens, or markers. A fun art-and-craft activity for all ages. (Colouring materials not included.)\n\n\n🌈 Encourages Creativity & Learning – Inspires imagination, artistic expression, concentration, and fine motor skill development while providing hours of engaging, screen-free fun.\n\n♻️ Reusable & Environment-Friendly – Crafted from durable cotton fabric that can be used again and again, offering a sustainable alternative to disposable plastic bags.\n\n🎁 Ideal for Gifts & Events – Great for birthday return gifts, classroom activities, art workshops, summer camps, festive celebrations, party favors, and creative group events.",
    "images": [
      "12Bs1LVKjQfei1yLJJvO0EIgf7zSFCCFV",
      "1C7-cXvr4Fgn8t9xf3BOCWwKGBG9ZKTEb"
    ],
    "stock": 15
  },
  {
    "id": "prod-034",
    "name": "DIY coloring Apron",
    "categories": ["Art & Craft"],
    "mrp": 100,
    "fundooPrice": 80,
    "offerPrice": 60,
    "description": "🎨 Create, Color & Wear Your Artwork – Turn an ordinary apron into a personalized masterpiece! Kids can decorate the apron with crayons, fabric markers, sketch pens, or paints, making every design unique and special. (Coloring supplies not included.)\n\n👩‍🎨 Fun Creative Activity for Children – Encourages imagination, artistic expression, and hands-on learning while keeping kids engaged in a screen-free activity they can proudly wear.\n\n🧵 Comfortable & Durable Design – Made from lightweight, breathable fabric that is comfortable for children to wear during art projects, cooking activities, school events, and playtime.\n\n🌟 Boosts Creativity & Confidence – Helps develop fine motor skills, focus, and creativity while giving children a sense of accomplishment through their own custom-designed apron.\n\n♻️ Reusable & Eco-Friendly – Designed for repeated use, allowing kids to enjoy their personalized apron for art, crafts, baking, gardening, and other fun activities.\n\n🎁 Perfect for Gifts & Group Activities – Ideal for birthday return gifts, school projects, art and craft workshops, summer camps, festive events, party activities, and creative classroom sessions.",
    "images": [
      "1Lxak0t1XIWki_cKbI3vLqp4cG4zUQwgF"
    ],
    "stock": 15
  },
  {
    "id": "prod-035",
    "name": "Mario Sketch Pen Color Box - Pack of 2",
    "categories": ["Art & Craft"],
    "mrp": 250,
    "fundooPrice": 200,
    "offerPrice": 180,
    "description": "🎨 Pack of 2 Cartoon Sketch Pen Sets – Each set includes 12 vibrant fluorescent sketch pens neatly packed inside an adorable cartoon-themed storage case, making coloring fun and exciting for kids.\n\n🌈 Bright Fluorescent Colors – Features eye-catching fluorescent shades that create colorful artwork with a unique glow-like appearance. Please note that these are light fluorescent colors and not traditional dark sketch pen shades.\n\n✏️ Comfortable Pencil-Style Grip – Designed with a slim, easy-to-hold shape that provides better control and comfort for little hands while drawing, coloring, and writing.\n\n🧰 Cute & Reusable Storage Case – Comes in an attractive cartoon-themed plastic case that is lightweight, durable, and easy to carry. The secure opening and closing mechanism helps keep pens organized.\n\n♻️ Multi-Purpose Case – Once the sketch pens are used, the sturdy case can be reused as a pencil box or for storing small stationery items and accessories.\n\n🎁 Perfect Gift for Kids – An excellent choice for birthday return gifts, goodie bags, gift hampers, classroom rewards, party favors, and festive gifting. The pack of 2 makes it easy to share or gift.",
    "images": [
      "1HnQUiPq0rnAmRNzk3fTODubalD7AejwG",
      "16ym-TgklVt5GkJsSdqEjCTmiVwnSWeYu",
      "1u1Vs_Dg4myFo1kZttWbMjJD-VAqipfVi",
      "16AoR1cu-SZn5LnvE-CEqiB13wthAgSdj"
    ],
    "stock": 15
  },
  {
    "id": "prod-036",
    "name": "Fur Doll Key Chain",
    "categories": ["Keychains"],
    "mrp": 100,
    "fundooPrice": 80,
    "offerPrice": 60,
    "description": "🧸 Adorable Fur Doll Keychains – Soft, fluffy, and irresistibly cute, these fur doll keychains are the perfect accessory to add charm to backpacks, handbags, school bags, purses, and keyrings.\n\n✨ Unique & Assorted Designs – Available in a variety of delightful styles, including dolls with or without legs, with or without woollen caps, and with or without headphones. Each design has its own unique personality and appeal.\n\n🎀 Soft & Premium Fur Finish – Crafted with plush, high-quality fur material that feels soft to the touch while maintaining its fluffy appearance for long-lasting enjoyment.\n\n🔑 Lightweight & Easy to Carry – Designed with a sturdy keyring attachment, making it easy to clip onto keys, bags, zipper pulls, pencil pouches, and other accessories.\n\n🌈 Cute Fashion Accessory – A fun way to personalize everyday items while adding a touch of color, style, and cuteness to your daily essentials.\n\n🎁 Perfect for Gifting – Ideal for birthday return gifts, goodie bags, party favors, stocking fillers, festive gifts, and collectible accessories for kids, teens, and anyone who loves cute plush charms.\n\n📦 Please Note: Designs are assorted and may vary. Dolls may be supplied with or without legs, woollen caps, or headphones depending on availability.",
    "images": [
      "1YIRs9MYZa_gokcx8BEoytR_gZ4a3rqAR",
      "1qPy6Fs3E2XTRBw7EOUQfXJqnZ5xWNooJ",
      "1rfuLcA0pC9pz8JvG4ROuLOaY9Y6aIQ5F",
      "1-s_qanJZMF8mtw_jbPuIPMq0h4icr0Ja"
    ],
    "stock": 72
  },
  {
    "id": "prod-037",
    "name": "Police Car Keychains",
    "categories": ["Keychains"],
    "mrp": 30,
    "fundooPrice": 25,
    "offerPrice": 20,
    "description": "🚓 Fun Police Push Car Keychain – A playful miniature police car keychain that doubles as a push-and-go toy, bringing excitement and entertainment wherever you go.\n\n✨ 2-in-1 Toy & Keychain – Functions as both a stylish keyring accessory and a fun toy car, making it perfect for attaching to keys, backpacks, school bags, pencil cases, and more.\n\n🏎️ Push & Roll Action – Simply push the car forward and watch it glide smoothly, providing endless fun for kids and car enthusiasts alike.\n\n💪 Durable & Lightweight Design – Made from sturdy, high-quality materials that are built to withstand everyday use while remaining easy to carry.\n\n🎒 Portable & Travel-Friendly – Compact size makes it convenient to carry in pockets, bags, or attach to accessories for on-the-go fun.\n\n🎁 Perfect Gift & Return Favor – An excellent choice for birthday return gifts, party favors, classroom rewards, goodie bags, festive gifting, and toy collections.\n\n🌟 Attractive Police Car Design – Features a detailed police vehicle look that appeals to children who love cars, emergency vehicles, and imaginative play.",
    "images": [
      "1P7ASBrsX12c8pKQ9sv0hr81ysIEcc3_9"
    ],
    "stock": 24
  },
  {
    "id": "prod-038",
    "name": "Coloring Book Set",
    "categories": ["Art & Craft"],
    "mrp": 270,
    "fundooPrice": 150,
    "offerPrice": 130,
    "description": "🚀 Creative 2-in-1 Coloring & Scratch Art Set – This fun-filled activity kit includes a 30-page coloring book featuring exciting unicorn and space-themed illustrations, along with a scratch art pad for endless creative exploration.\n\n🎨 Learn Through Creative Play – Packed with engaging images such as astronauts, rockets, planets, unicorns, and more, the coloring book encourages imagination while helping develop fine motor skills and hand-eye coordination.\n\n✨ Exciting Scratch Art Experience – The included scratch art pad lets children reveal colorful hidden designs by scratching the surface, adding an extra layer of fun and discovery to their artwork.\n\n🖍️ 8 Dual-Colored Pencils Included – Comes complete with 8 dual-color pencils, providing a variety of shades for coloring, sketching, shading, and creative expression right out of the box.\n\n🌈 Encourages Creativity & Self-Expression – Offers multiple ways for kids to create, whether they prefer coloring detailed illustrations or uncovering vibrant scratch art patterns.\n\n🎁 Perfect Gift for Kids – An excellent choice for birthdays, return gifts, travel activities, holiday surprises, classroom rewards, and rainy-day entertainment.\n\n⏰ Hours of Screen-Free Fun – Designed to keep children engaged and entertained with creative activities that inspire learning, imagination, and artistic confidence.",
    "images": [
      "1ByIrLk-aQdy6CF6_750tW0P-HILj4m2f",
      "1ToWA2THndX518-JMuqi89SIM3yOZPE7g",
      "106Ze2oyqSg0s7r6nlcVC0Kk6AeMk3DDx"
    ],
    "stock": 24
  },
  {
    "id": "prod-039",
    "name": "K-Pop Cross Body Double Zip Bag",
    "categories": ["Backpacks", "K-Pop Collection"],
    "mrp": 275,
    "fundooPrice": 200,
    "offerPrice": 150,
    "description": "💜 Trendy K-Pop Cross Body Double Zip Bag – A stylish and practical accessory inspired by Korean fashion trends, perfect for K-pop fans and anyone who loves cute, aesthetic accessories.\n\n👜 Spacious Double-Zip Design – Features two separate zippered compartments to help organize essentials such as a phone, wallet, keys, stationery, cosmetics, and other daily necessities.\n\n✨ Fashionable K-Pop-Inspired Style – Designed with eye-catching details and trendy aesthetics that add a fun and modern touch to any outfit.\n\n🎒 Comfortable Crossbody Carry – Comes with an adjustable shoulder strap for convenient hands-free use, making it ideal for shopping, travel, outings, school, and everyday wear.\n\n💪 Durable & Lightweight Construction – Made from quality materials that are sturdy enough for daily use while remaining lightweight and comfortable to carry.\n\n🌈 Versatile for Everyday Use – Perfect for carrying personal belongings while keeping them secure, organized, and easily accessible throughout the day.\n\n🎁 Great Gift for K-Pop Lovers – An ideal gift for birthdays, return gifts, festive occasions, party favors, or anyone who enjoys Korean-inspired fashion and accessories.",
    "images": [
      "1-e7yTY-o537vNJ6v7CjfFNWm-WQxD3wQ",
      "18gxbSdfucnLinoFCuPJzWR3SjzfJrkIr"
    ],
    "stock": 15
  }
];
var SITE_CONFIG = {
  "productOfTheMonth": "prod-030",
  "whatsHot": [
    "prod-006",
    "prod-019",
    "prod-031",
    "prod-032",
    "prod-039"
  ]
};
