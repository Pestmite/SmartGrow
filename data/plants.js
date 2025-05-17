const humidity = document.querySelector('.humidity-js');
const interval = document.querySelector('.interval-js');
const description = document.querySelector('.description');
const wikiLink = document.querySelector('.wiki-link-js');
const plantSelector = document.querySelector('#plants');

if (plantSelector) {
  plantSelector.addEventListener('change', updateData);
};

export function generateSelect() {
  let selectedPlant = JSON.parse(localStorage.getItem('selectedPlant')) || 'Tomato';
  plants.forEach((plant) => {
    if (plant.value == selectedPlant) {
      plantSelector.innerHTML += `<option value="${plant.value}" selected>${plant.value}</option>`;
    } else {
      plantSelector.innerHTML += `<option value="${plant.value}">${plant.value}</option>`;
    };
  });
};

export function updateData() {
  plants.forEach((plant) => {
    if (plantSelector.value === plant.value) {
      humidity.innerHTML = plant.humidity;
      if (description) {
        description.innerHTML = plant.description;
        wikiLink.href = plant.link;
        interval.innerHTML = plant.sampleInterval;
      }
    };
  });

  storePlant();
};

function storePlant() {
  const interval = document.querySelector('.interval-js');
  let plantMoisture = 0;
  if ((humidity.innerHTML).substring(1, 2) == '-') {
    plantMoisture = 10;
  } else {
    let lowMoisture = parseInt((humidity.innerHTML).substring(0, 2));
    let highMoisture = parseInt((humidity.innerHTML).substring(3, 5));
    plantMoisture = parseInt((lowMoisture + highMoisture) / 2);
  }

  if (interval) {
    let plantInterval = parseInt((interval.innerHTML).substring(0, 3)) * 60;
    localStorage.setItem('sampleInterval', JSON.stringify(parseInt(plantInterval)));
  }

  localStorage.setItem('plantMoisture', JSON.stringify(parseInt(plantMoisture)));
  localStorage.setItem('selectedPlant', JSON.stringify(plantSelector.value));
  generateSelect();
}

export const plants = [
  {
    value: 'Agave',
    humidity: '20-40%',
    sampleInterval: '360 min',
    description: 'Agave is a succulent plant native to arid regions of the Americas. Known for its rosette-shaped clusters of thick, fleshy leaves with sharp spines, agave species vary in size and appearance. Some produce tall flowering stalks, while others are cultivated for their sweet sap, used in making tequila and sweeteners.',
    link: 'https://en.wikipedia.org/wiki/Agave'
  },
  {
    value: 'Apple',
    humidity: '21-60%',
    sampleInterval: '120 min',
    description: 'Apples (Malus domestica) are deciduous fruit trees native to Central Asia, widely cultivated for their sweet, versatile fruit. They thrive in well-drained soil and temperate climates. Grown in many varieties, apples are consumed fresh, cooked, or processed. They require cross-pollination and careful care to prevent pests, diseases, and irregular fruit development.',
    link: 'https://en.wikipedia.org/wiki/Apple'
  },
  {
    value: 'Artichoke',
    humidity: '41-80%',
    sampleInterval: '120 min',
    description: 'Artichoke (Cynara cardunculus var. scolymus) is a thistle-like vegetable known for its large, spiky flower buds. The edible part of the plant is the fleshy base of the petals and the heart. Artichokes are rich in fiber, antioxidants, and vitamins C and K. They are often steamed, grilled, or used in dips and salads.',
    link: 'https://en.wikipedia.org/wiki/Artichoke'
  },
  {
    value: 'Aster',
    humidity: '20-40%',
    sampleInterval: '180 min',
    description: 'Aster is a genus of flowering plants known for their vibrant, star-shaped flowers that bloom in late summer to fall. These plants typically have daisy-like flowers in colors ranging from purple and pink to white and blue. Asters attract pollinators like bees and butterflies and are popular in gardens for their beauty and seasonal color.',
    link: 'https://en.wikipedia.org/wiki/Aster_(genus)'
  },
  {
    value: 'Barberry',
    humidity: '21-40%',
    sampleInterval: '240 min',
    description: 'Barberry (Berberis spp.) is a hardy, deciduous shrub known for its vibrant red, orange, or purple foliage and small, yellow flowers in spring. It produces small, oblong red or purple berries. Barberry is often used in landscaping for its colorful appearance and ability to tolerate various soil types. It can also have medicinal uses.',
    link: 'https://en.wikipedia.org/wiki/Berberis'
  },
  {
    value: 'Begonia',
    humidity: '20-40%',
    sampleInterval: '240 min',
    description: 'Begonias are a diverse group of flowering plants known for their ornamental appeal. With vibrant flowers in shades of red, pink, white, and orange, they feature fleshy, often colorful leaves. Begonias thrive in shaded environments and are commonly grown as houseplants or in gardens, appreciated for their easy care and aesthetic beauty.',
    link: 'https://en.wikipedia.org/wiki/Begonia'
  },
  {
    value: 'Bitter Gourd',
    humidity: '9-32%',
    sampleInterval: '15 min',
    description: 'Bitter gourd (Momordica charantia), also known as bitter melon, is a tropical fruit with a distinctive bumpy texture and a sharp, bitter taste. It is green when unripe and turns yellow or orange as it ripens. Often used in Asian and African cuisines, bitter gourd is believed to have medicinal properties, aiding in digestion and lowering blood sugar. It is rich in vitamins C and A, as well as antioxidants.',
    link: 'https://en.wikipedia.org/wiki/Momordica_charantia'
  },
  {
    value: 'Blackberry',
    humidity: '21-60%',
    sampleInterval: '120 min',
    description: 'Blackberries (Rubus fruticosus) are perennial shrubs native to Europe and North America. Known for their sweet, dark purple to black fruit, they thrive in well-drained, fertile soil and full sun. Blackberries are often grown in gardens or orchards, requiring support like trellises. They need regular watering, pruning, and protection from pests and diseases to ensure healthy growth.',
    link: 'https://en.wikipedia.org/wiki/Blackberry'
  },
  {
    value: 'Bleeding-Heart',
    humidity: '41-60%',
    sampleInterval: '120 min',
    description: 'Bleeding heart (Dicentra spectabilis) is a perennial plant known for its unique, heart-shaped pink or white flowers that dangle from arching stems. It blooms in spring to early summer and thrives in shaded, moist environments. With its striking appearance, bleeding heart is a popular ornamental plant in gardens.',
    link: 'https://en.wikipedia.org/wiki/Lamprocapnos'
  },
  {
    value: 'Blueberry',
    humidity: '41-60%',
    sampleInterval: '60 min',
    description: 'Blueberries (Vaccinium spp.) are perennial, fruit-bearing shrubs native to North America. They thrive in acidic, well-drained soil and full sun. Known for their sweet, nutrient-rich berries, they are consumed fresh, dried, or processed. Blueberries require regular watering and are vulnerable to pests, diseases, and frost during flowering or fruiting stages.',
    link: 'https://en.wikipedia.org/wiki/Blueberry'
  },
  {
    value: 'Birch',
    humidity: '41-60%',
    sampleInterval: '300 min',
    description: 'Birch trees (Betula spp.) are deciduous trees native to northern regions of North America, Europe, and Asia. Known for their distinctive white or silver bark, birches thrive in well-drained, slightly acidic soil and full sun. They grow quickly and are often used for timber, furniture, and ornamental purposes. Birches are susceptible to pests like the bronze birch borer and require protection from extreme cold or drought.',
    link: 'https://en.wikipedia.org/wiki/Birch'
  },
  {
    value: 'Butterfly Weed',
    humidity: '21-40%',
    sampleInterval: '240 min',
    description: 'Butterfly weed (Asclepias tuberosa) is a perennial plant known for its bright orange, star-shaped flowers that attract butterflies, especially monarchs. Native to North America, it thrives in well-drained soils and full sun. Butterfly weed is drought-tolerant, grows in clumps, and is valued for its beauty and ability to support pollinators.',
    link: 'https://en.wikipedia.org/wiki/Asclepias_tuberosa'
  },
  {
    value: 'Cabbage',
    humidity: '41-80%',
    sampleInterval: '60 min',
    description: 'Cabbage (Brassica oleracea) is a leafy green, purple, or white vegetable known for its tightly packed leaves. It grows in cool climates and is often used in salads, soups, and fermented foods like sauerkraut. Cabbage is rich in vitamins C and K and is a good source of fiber and antioxidants.',
    link: 'https://en.wikipedia.org/wiki/Cabbage'
  },
  {
    value: 'Cacti',
    humidity: '5-10%',
    sampleInterval: '360 min',
    description: 'Cacti (Cactaceae family) are succulent plants native to arid regions of the Americas. They are characterized by thick, fleshy stems that store water, spines instead of leaves, and often colorful flowers. Cacti thrive in well-drained soil, full sun, and dry conditions. They are low-maintenance, drought-tolerant, and commonly grown as ornamental plants, though some species also produce edible fruit.   ',
    link: 'https://en.wikipedia.org/wiki/Cactus'
  },
  {
    value: 'Christmas Fern',
    humidity: '21-40%',
    sampleInterval: '240 min',
    description: 'Christmas fern (Polystichum acrostichoides) is an evergreen fern native to North America. It thrives in shaded, moist environments and is often found in woodland areas. Known for its leathery, dark green fronds, it is a hardy plant that remains vibrant through the winter months. Christmas ferns are commonly used in landscaping and as decorative plants in gardens. They prefer well-drained, acidic soil and are low-maintenance.',
    link: 'https://en.wikipedia.org/wiki/Polystichum_acrostichoides'
  },
  {
    value: 'Crab Apple',
    humidity: '21-60%',
    sampleInterval: '180 min',
    description: 'Crab apples (Malus spp.) are small, deciduous trees closely related to domestic apple trees. Native to North America and Asia, they thrive in well-drained soil and full sun. Known for their ornamental value, crab apples produce small, tart fruits often used in jellies, sauces, or as decoration. They attract pollinators but require care to prevent pests, diseases, and fruit drop.',
    link: 'https://en.wikipedia.org/wiki/Malus'
  },
  {
    value: 'Cranberry',
    humidity: '61-80%',
    sampleInterval: '90 min',
    description: 'Cranberries (Vaccinium macrocarpon) are low-growing, perennial shrubs native to North America, thriving in acidic, sandy, and well-drained soils. Known for their tart, nutrient-rich berries, they are used fresh, dried, or processed into juices and sauces. Cranberries grow in bogs and require ample water but are vulnerable to frost, pests, and fungal diseases.',
    link: 'https://en.wikipedia.org/wiki/Cranberry'
  },
  {
    value: 'Currant',
    humidity: '21-40%',
    sampleInterval: '120 min',
    description: 'Alpine currant (Ribes alpinum) is a deciduous shrub native to Europe and Asia. It features dark green, toothed leaves and produces small, yellow-green flowers in early spring. This plant is known for its hardiness in cold climates and is often used in hedges or as ornamental landscaping. It also bears small, red berries.',
    link: 'https://en.wikipedia.org/wiki/Ribes_alpinum'
  },
  {
    value: 'Daffodil',
    humidity: '21-60%',
    sampleInterval: '180 min',
    description: 'Daffodils (Narcissus spp.) are spring-blooming perennial flowers native to Europe and North Africa. Known for their bright yellow, white, or orange trumpet-shaped blooms, daffodils thrive in well-drained soil and full to partial sun. They are often planted in the fall and are popular in gardens for their cheerful appearance. Daffodils are low-maintenance, deer-resistant, and come in a variety of shapes and sizes.',
    link: 'https://en.wikipedia.org/wiki/Narcissus_(plant)'
  },
  {
    value: 'Dahlia',
    humidity: '21-60%',
    sampleInterval: '180 min',
    description: 'Dahlias (Dahlia spp.) are vibrant, flowering perennials native to Mexico. Known for their large, colorful blooms in a variety of shapes and sizes, they thrive in well-drained, fertile soil and full sun. Dahlias are popular in gardens and floral arrangements. They require regular watering, deadheading, and protection from frost, as they are not frost-tolerant.',
    link: 'https://en.wikipedia.org/wiki/Dahlia'
  },
  {
    value: 'Daisies',
    humidity: '25-65%',
    sampleInterval: '180 min',
    description: 'Daisies (Bellis perennis or Leucanthemum vulgare) are flowering plants known for their bright, white petals and yellow centers. Native to Europe and Asia, they thrive in well-drained soil and full sun. Daisies are commonly grown in gardens as ornamental flowers. They are hardy, easy to care for, and attract pollinators.',
    link: 'https://en.wikipedia.org/wiki/Bellis_perennis'
  },
  {
    value: 'Eggplant',
    humidity: '60-90%',
    sampleInterval: '15 min',
    description: 'Eggplant (Solanum melongena) is a versatile, edible fruit commonly used as a vegetable in cooking. It has glossy purple skin and soft, spongy flesh. Eggplants thrive in warm climates and require full sunlight. They are rich in fiber and antioxidants and are used in a variety of dishes, from stir-fries to curries.',
    link: 'https://en.wikipedia.org/wiki/Eggplant'
  },
  {
    value: 'Elm',
    humidity: '21-60%',
    sampleInterval: '300 min',
    description: 'Elm trees (Ulmus spp.) are deciduous trees native to temperate regions of the Northern Hemisphere. Known for their broad, serrated leaves and graceful, spreading canopy, elms thrive in well-drained, fertile soil and full sun to partial shade. They are commonly used as shade trees in landscapes. However, elms are susceptible to Dutch elm disease and require proper care to prevent pests and disease.',
    link: 'https://en.wikipedia.org/wiki/Elm'
  },
  {
    value: 'Fern',
    humidity: '30-40%',
    sampleInterval: '240 min',
    description: 'Ferns are non-flowering, vascular plants that thrive in shady, moist environments. With delicate, feathery fronds, they reproduce through spores rather than seeds. Found in a variety of habitats, ferns are commonly used in landscaping for their lush, green foliage. They can range from small ground covers to large tree ferns.',
    link: 'https://en.wikipedia.org/wiki/Fern'
  },
  {
    value: 'Fig',
    humidity: '21-60%',
    sampleInterval: '300 min',
    description: 'Figs (Ficus carica) are deciduous trees or large shrubs native to the Mediterranean and Western Asia. They thrive in well-drained, fertile soil and warm, dry climates. Figs are known for their sweet, nutrient-rich fruit, consumed fresh, dried, or processed. The trees require regular watering and protection from frost, pests, and diseases.',
    link: 'https://en.wikipedia.org/wiki/Fig'
  },
  {
    value: 'Grass',
    humidity: '35-45%',
    sampleInterval: '300 min',
    description: 'Grass (Poaceae family) is a widespread group of plants found in diverse environments worldwide. They are characterized by narrow leaves and hollow stems. Grasses thrive in well-drained soil and can grow in full sun or partial shade. Key varieties include turf grasses, food crops like wheat and rice, and wild grasses.',
    link: 'https://en.wikipedia.org/wiki/Poaceae'
  },
  {
    value: 'Green Beans',
    humidity: '41-80%',
    sampleInterval: '30 min',
    description: 'Green beans (Phaseolus vulgaris) are tender, edible legumes harvested before the seeds fully develop. They are typically bright green, though there are also yellow and purple varieties. Green beans are rich in fiber, vitamins A, C, and K, and minerals like iron. They are commonly steamed, sautéed, or used in casseroles and salads.',
    link: 'https://en.wikipedia.org/wiki/Green_bean'
  },
  {
    value: 'Grapes',
    humidity: '21-60%',
    sampleInterval: '120 min',
    description: 'Grapes (Vitis vinifera) are deciduous climbing vines native to the Mediterranean region. They thrive in well-drained soil and warm, sunny climates. Grapes are grown for fresh consumption, as raisins, or for wine production. The vines require proper pruning, support, and regular watering but are susceptible to pests, diseases, and frost.',
    link: 'https://en.wikipedia.org/wiki/Grape'
  },
  {
    value: 'Heather',
    humidity: '21-40%',
    sampleInterval: '360 min',
    description: 'Heather (Calluna vulgaris) is a low-growing, evergreen shrub known for its small, bell-shaped flowers that bloom in shades of pink, purple, white, or red. It thrives in acidic, well-drained soils and full sun, often found in heathlands and rocky areas. Heather is popular in landscaping for its hardiness, compact size, and ability to attract pollinators.',
    link: 'https://en.wikipedia.org/wiki/Calluna'
  },
  {
    value: 'Hydrangea',
    humidity: '41-60%',
    sampleInterval: '90 min',
    description: 'Hydrangeas (Hydrangea spp.) are deciduous shrubs known for their large, colorful flower clusters. Native to Asia and the Americas, they thrive in well-drained, moist soil and partial to full sun. Hydrangeas are popular in gardens for their showy blooms, which can range from blue to pink, depending on soil pH. They require regular watering and care to avoid pests and diseases.',
    link: 'https://en.wikipedia.org/wiki/Hydrangea'
  },
  {
    value: 'Iris',
    humidity: '21-60%',
    sampleInterval: '180 min',
    description: 'Iris is a genus of flowering plants known for their striking, showy flowers that come in various colors, including purple, blue, yellow, and white. The flowers have a unique shape, with three upright petals and three drooping ones. Irises thrive in well-drained soil and are popular in gardens and landscapes for their beauty and variety.',
    link: 'https://en.wikipedia.org/wiki/Iris_(plant)'
  },
  {
    value: 'Kale',
    humidity: '41-80%',
    sampleInterval: '15 min',
    description: 'Kale (Brassica oleracea) is a nutrient-dense, dark green leafy vegetable known for its hearty, curly or flat leaves. It thrives in cool climates and is rich in vitamins A, C, K, and minerals like calcium. Kale is commonly used in salads, smoothies, soups, and as a sautéed side dish.',
    link: 'https://en.wikipedia.org/wiki/Kale'
  },
  {
    value: 'Lavender',
    humidity: '21-40%',
    sampleInterval: '360 min',
    description: 'Lavender (Lavandula) is a fragrant, woody shrub known for its spikes of purple, blue, or white flowers. It thrives in sunny, well-drained soils and is prized for its calming aroma, often used in essential oils, perfumes, and aromatherapy. Lavender is also a popular choice for gardens and attracts pollinators like bees and butterflies.',
    link: 'https://en.wikipedia.org/wiki/Lavandula'
  },
  {
    value: 'Lobelia',
    humidity: '41-80%',
    sampleInterval: '180 min',
    description: 'Lobelia is a genus of flowering plants known for its vibrant, trumpet-shaped flowers, often in shades of blue, purple, red, or white. It is a popular annual or perennial in gardens, thriving in full sun to partial shade. Lobelia is commonly used in hanging baskets, window boxes, and as ground cover, attracting pollinators like bees and butterflies.',
    link: 'https://en.wikipedia.org/wiki/Lobelia'
  },
  {
    value: 'Okra',
    humidity: '50-70%',
    sampleInterval: '15 min',
    description: 'Okra (Abelmoschus esculentus) is a warm-season vegetable known for its edible green pods and vibrant flowers. The pods contain a mucilaginous (slimy) substance, making them ideal for thickening soups and stews, like gumbo. Okra is rich in vitamins C and K, fiber, and antioxidants, and thrives in hot, sunny climates.',
    link: 'https://en.wikipedia.org/wiki/Okra'
  },
  {
    value: 'Peaches',
    humidity: '21-60%',
    sampleInterval: '90 min',
    description: 'Peaches (Prunus persica) are deciduous fruit trees native to China. They thrive in well-drained, fertile soil and warm, temperate climates. Known for their sweet, juicy fruit, peaches are consumed fresh, canned, or in desserts. The trees require regular pruning, care to prevent pests and diseases, and protection from late frosts.',
    link: 'https://en.wikipedia.org/wiki/Peony'
  },
  {
    value: 'Pear',
    humidity: '21-60%',
    sampleInterval: '90 min',
    description: 'Pears (Pyrus spp.) are deciduous fruit trees native to Europe and Asia. They thrive in well-drained, fertile soil and temperate climates. Pears are known for their sweet, juicy fruit, consumed fresh, canned, or in cooking. The trees require cross-pollination and care to prevent pests, diseases, and fruit drop.',
    link: 'https://en.wikipedia.org/wiki/Pear'
  },
  {
    value: 'Potato',
    humidity: '60-80%',
    sampleInterval: '30 min',
    description: 'Potatoes (Solanum tuberosum) are starchy tubers that grow underground. Native to the Andes, they are a staple food crop worldwide. Potatoes come in various types, including russet, red, and sweet potatoes, and are rich in carbohydrates, vitamins C and B6, and potassium. They are versatile in cooking, used in dishes like mashed potatoes, fries, and stews.',
    link: 'https://en.wikipedia.org/wiki/Potato'
  },
  {
    value: 'Potentilla',
    humidity: '10-40%',
    sampleInterval: '240 min',
    description: 'Potentilla (Potentilla spp.) is a genus of flowering plants in the rose family, known for their bright, five-petaled flowers in colors like yellow, white, red, and orange. Native to temperate regions, they thrive in well-drained soil and full sun to partial shade. Potentillas are low-maintenance, drought-tolerant shrubs or groundcovers, often used in landscaping for their vibrant blooms and resilience. They prefer moderate watering and can tolerate a variety of soil types.',
    link: 'https://en.wikipedia.org/wiki/Potentilla'
  },
  {
    value: 'Raspberry',
    humidity: '21-60%',
    sampleInterval: '60 min',
    description: 'Raspberries (Rubus idaeus) are perennial shrubs native to Europe and Asia. Known for their sweet, red, or black fruit, they thrive in well-drained, fertile soil and full sun. Raspberries are commonly grown in gardens or orchards, with some varieties requiring trellising for support. They need regular watering, pruning, and care to prevent pests and diseases.',
    link: 'https://en.wikipedia.org/wiki/Raspberry'
  },
  {
    value: 'Rose',
    humidity: '21-40%',
    sampleInterval: '180 min',
    description: 'Roses are woody, perennial plants known for their fragrant, colorful flowers, which come in shades of red, pink, white, yellow, and orange. They have thorny stems and are prized for their beauty and symbolism, often used in bouquets and gardens. Roses thrive in well-drained soil and full sunlight.',
    link: 'https://en.wikipedia.org/wiki/Rose'
  },
  {
    value: 'Spinach',
    humidity: '65-75%',
    sampleInterval: '15 min',
    description: 'Spinach (Spinacia oleracea) is a leafy green vegetable known for its rich nutritional value, including vitamins A, C, and K, as well as iron and folate. It grows best in cool climates and can be harvested early for tender leaves. Spinach is commonly used in salads, smoothies, and cooked dishes.',
    link: 'https://en.wikipedia.org/wiki/Spinach'
  },
  {
    value: 'Snake plant',
    humidity: '30-50%',
    sampleInterval: '360 min',
    description: 'Snake plant (Dracaena trifasciata) is an evergreen plant with stiff vertical growing leaves. Leaves are dark green when fully grown. It uses a special kind of photosynthesis to withstand draught and conserve water. They\'re tolerance to low light levels and irregular watering makes them perfect housplants.',
    link: 'https://en.wikipedia.org/wiki/Dracaena_trifasciata'
  },
  {
    value: 'Strawberry',
    humidity: '21-60%',
    sampleInterval: '60 min',
    description: 'Strawberries (Fragaria × ananassa) are low-growing, perennial plants native to temperate regions. Known for their sweet, red fruit, strawberries thrive in well-drained, fertile soil and full sun. They are commonly grown in gardens or containers and produce fruit in early summer. Strawberries require regular watering and care to prevent pests, diseases, and soil erosion.',
    link: 'https://en.wikipedia.org/wiki/Strawberry'
  },
  {
    value: 'Sugar Maple',
    humidity: '21-40%',
    sampleInterval: '300 min',
    description: 'Sugar maples (Acer saccharum) are large deciduous trees native to North America, valued for their brilliant fall foliage and sap used in maple syrup production. They thrive in well-drained, slightly acidic soil and cool climates. Sugar maples are often planted as shade trees but are sensitive to pollution and soil compaction.',
    link: 'https://en.wikipedia.org/wiki/Acer_saccharum'
  },
  {
    value: 'Succulents',
    humidity: '5-10%',
    sampleInterval: '360 min',
    description: 'Succulents are a diverse group of plants known for their thick, fleshy tissues that store water, enabling them to thrive in dry, arid environments. Common types include aloe, cactus, and jade plants. They come in various shapes, sizes, and colors, making them popular as low-maintenance houseplants and garden decorations.',
    link: 'https://en.wikipedia.org/wiki/Succulent_plant'
  },
  {
    value: 'Tomato',
    humidity: '60-80%',
    sampleInterval: '15 min',
    description: 'Tomato plants (Solanum lycopersicum) are sun-loving, warm-season crops grown for their nutritious fruit. They thrive in well-drained, slightly acidic soil and need consistent care. Available in determinate (bush) and indeterminate (vine) varieties, they are used fresh, cooked, or processed but are vulnerable to pests, diseases, and irregular watering.',
    link: 'https://en.wikipedia.org/wiki/Tomato'
  },
  {
    value: 'Tulip',
    humidity: '21-60%',
    sampleInterval: '180 min',
    description: 'Tulips (Tulipa spp.) are spring-blooming, perennial flowers native to Central Asia. They thrive in well-drained soil with full sun and a cold winter. Grown from bulbs, they come in various colors and shapes. Popular for gardens and cut flowers, tulips are vulnerable to pests, fungal diseases, and improper watering.',
    link: 'https://en.wikipedia.org/wiki/Tulip'
  },
  {
    value: 'Zinnia',
    humidity: '21-40%',
    sampleInterval: '180 min',
    description: 'Zinnia is a vibrant flowering plant from the Asteraceae family, known for its bright, daisy-like flowers in various colors, including pink, orange, red, yellow, and white. Zinnias are easy to grow, thrive in full sun, and attract pollinators like butterflies. They are commonly used in gardens and as cut flowers in bouquets.',
    link: 'https://en.wikipedia.org/wiki/Zinnia'
  },
  {
    value: 'Zucchini',
    humidity: '60-70%',
    sampleInterval: '15 min',
    description: 'Zucchini (Cucurbita pepo) is a summer squash with tender, edible green skin and soft, mild-flavored flesh. It grows on trailing vines and is commonly harvested while still immature. Zucchini is low in calories and high in vitamins A and C. It can be used in a variety of dishes, including stir-fries, salads, and baked goods.',
    link: 'https://en.wikipedia.org/wiki/Zucchini'
  },
];