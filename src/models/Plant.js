import Layout from './Layout';

const plantObjects = [];

export default class Plant {
  constructor(resource) {
    this.id = resource.id;
    this.name = resource.name;
    this.namePlural = resource.name_plural;
    this.scientificName = resource.scientific_name;
    this.layoutIds = resource.layouts;
    this.goodNeighborIds = resource.good_neighbors;
    this.badNeighborIds = resource.bad_neighbors;
    this.className = resource.name.toLowerCase().replace(/ /g, '-');
    this.imageName = resource.name.toLowerCase().replace(/ /g, '-');
    this.defaultLayout = this.defaultLayout.bind(this);
  }

  static getObject(id) {
    return plantObjects.find((plant) => plant.id === id);
  }

  static allObjects() {
    return plantObjects;
  }

  static loadObjectsFromApi() {
    const data = [
      {
        id: 7,
        name: 'Beet',
        name_plural: 'Beets',
        scientific_name: 'Beta vulgaris',
        created_at: '2019-09-25T18:36:10.703000Z',
        layouts: [4],
        good_neighbors: [7, 9, 13, 10, 2],
        bad_neighbors: [],
      },
      {
        id: 1,
        name: 'Carrot',
        name_plural: 'Carrots',
        scientific_name: 'Daucus carota subsp. sativus',
        created_at: '2019-09-25T01:06:03.393000Z',
        layouts: [1],
        good_neighbors: [1, 9, 13, 10, 4, 2, 14],
        bad_neighbors: [],
      },
      {
        id: 11,
        name: 'Garlic',
        name_plural: 'Garlic',
        scientific_name: 'Allium sativum',
        created_at: '2019-09-25T18:38:22.343000Z',
        layouts: [4],
        good_neighbors: [13, 14],
        bad_neighbors: [14],
      },
      {
        id: 9,
        name: 'Leek',
        name_plural: 'Leeks',
        scientific_name: 'Allium ampeloprasum',
        created_at: '2019-09-25T18:37:25.677000Z',
        layouts: [4],
        good_neighbors: [7, 1, 13, 3, 14],
        bad_neighbors: [4],
      },
      {
        id: 13,
        name: 'Lettuce',
        name_plural: 'Lettuce',
        scientific_name: 'Lactuca sativa',
        created_at: '2019-09-25T18:39:14.598000Z',
        layouts: [4],
        good_neighbors: [7, 1, 11, 9, 13, 10, 2, 3],
        bad_neighbors: [],
      },
      {
        id: 10,
        name: 'Onion',
        name_plural: 'Onions',
        scientific_name: 'Allium cepa',
        created_at: '2019-09-25T18:38:02.548000Z',
        layouts: [4],
        good_neighbors: [7, 1, 13, 10, 6, 3, 14],
        bad_neighbors: [4],
      },
      {
        id: 4,
        name: 'Pea',
        name_plural: 'Peas',
        scientific_name: 'Pisum sativum',
        created_at: '2019-09-25T14:27:57.970000Z',
        layouts: [2, 3],
        good_neighbors: [1, 2, 6, 3],
        bad_neighbors: [9, 10],
      },
      {
        id: 2,
        name: 'Radish',
        name_plural: 'Radishes',
        scientific_name: 'Raphanus raphanistrum subsp. sativus',
        created_at: '2019-09-25T01:06:27.587000Z',
        layouts: [1],
        good_neighbors: [7, 1, 13, 4, 2, 6, 3],
        bad_neighbors: [],
      },
      {
        id: 6,
        name: 'Spinach',
        name_plural: 'Spinach',
        scientific_name: 'Spinacia oleracea',
        created_at: '2019-09-25T18:35:05.424000Z',
        layouts: [4],
        good_neighbors: [10, 4, 2, 6, 3],
        bad_neighbors: [],
      },
      {
        id: 3,
        name: 'Strawberry',
        name_plural: 'Strawberries',
        scientific_name: 'Fragaria × ananassa',
        created_at: '2019-09-25T14:27:27.235000Z',
        layouts: [5],
        good_neighbors: [9, 13, 10, 4, 2, 6],
        bad_neighbors: [],
      },
      {
        id: 14,
        name: 'Tomato',
        name_plural: 'Tomatoes',
        scientific_name: 'Solanum lycopersicum',
        created_at: '2019-09-25T18:39:45.291000Z',
        layouts: [5],
        good_neighbors: [1, 11, 9, 10],
        bad_neighbors: [11],
      },
    ];
    // fetch('/backend/plants/')
    //   .then(response => {
    //     return (response.status === 200) ? response.json() : null;
    //   })
    //   .then(data => {
    //     if (data) {
    const translation = {
      Beets: '甜菜',
      Carrots: '胡萝卜',
      Garlic: '大蒜',
      Leeks: '韭菜',
      Lettuce: '生菜',
      Onions: '洋葱',
      Peas: '豌豆',
      Radishes: '樱桃萝卜',
      Spinach: '菠菜',
      Strawberries: '草莓',
      Tomatoes: '番茄',
    };
    data.forEach((resource) =>
      plantObjects.push(
        new Plant({
          ...resource,
          name_plural:
            translation[resource.name_plural] ?? resource.name_plural,
        }),
      ),
    );

    // data.forEach(resource => plantObjects.push(new Plant(resource)));
    // }
    // });
  }

  defaultLayout() {
    return Layout.getObject(this.layoutIds[0]);
  }
}
