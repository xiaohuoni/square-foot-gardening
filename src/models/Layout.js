const layoutObjects = [];

export default class Layout {
  constructor(resource) {
    this.id = resource.id;
    this.rows = resource.rows;
    this.cols = resource.cols;
    this.fill = resource.fill;
    this.styles = {
      display: 'grid',
      gridTemplateRows: `repeat(${resource.rows}, 1fr)`,
      gridTemplateColumns: `repeat(${resource.cols}, 1fr)`,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    };
  }

  static getObject(id) {
    return layoutObjects.find((layout) => layout.id === id);
  }

  static allObjects() {
    return layoutObjects;
  }

  static loadObjectsFromApi() {
    const data = [
      {
        id: 1,
        fill: [
          [0, 0],
          [0, 1],
          [0, 2],
          [0, 3],
          [1, 0],
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 0],
          [2, 1],
          [2, 2],
          [2, 3],
          [3, 0],
          [3, 1],
          [3, 2],
          [3, 3],
        ],
        rows: 4,
        cols: 4,
      },
      {
        id: 2,
        fill: [
          [1, 0],
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 0],
          [2, 1],
          [2, 2],
          [2, 3],
        ],
        rows: 4,
        cols: 4,
      },
      {
        id: 3,
        fill: [
          [0, 1],
          [0, 2],
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2],
          [3, 1],
          [3, 2],
        ],
        rows: 4,
        cols: 4,
      },
      {
        id: 4,
        fill: [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 0],
          [1, 1],
          [1, 2],
          [2, 0],
          [2, 1],
          [2, 2],
        ],
        rows: 3,
        cols: 3,
      },
      {
        id: 5,
        fill: [[0, 0]],
        rows: 1,
        cols: 1,
      },
    ];
    // fetch('/backend/layouts/')
    //   .then(response => {
    //     return (response.status === 200) ? response.json() : null;
    //   })
    //   .then(data => {
    //     if (data) {
    data.forEach((resource) => layoutObjects.push(new Layout(resource)));
    //   }
    // });
  }
}
