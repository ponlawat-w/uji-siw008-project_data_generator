const domains = require('./domains.js');
const randInt = require('./randInt');
const randFloat = require('./randBoxMuller');
const fs = require('fs');

const randArray = array => array[randInt(0, array.length - 1)];

const N = 500;

const features = [];
// 40.018371, -0.079131 -> 39.938345, -0.001673
for (let i = 0; i < N; i++) {
  const type = randArray(domains.incidentType);
  const description = type === 'UndesiredAnimal' ? randArray(domains.undesiredAnimals) : null;
  const date = new Date(2019, 0, randInt(1, 365 + 17), randInt(0, 23), randInt(0, 59), randInt(0, 59));

  features.push({
    type: 'Feature',
    id: i,
    geometry: {
      type: 'Point',
      coordinates: [randFloat(-0.0792, -0.0016), randFloat(39.9383, 40.0184)]
    },
    properties: {
      CreatedDate: date,
      Type: type,
      Description: description,
      Level: randArray(domains.incidentLevel),
      Status: randArray(domains.incidentStatus)
    }
  });
}

const featureCollection = {
  type: 'FeatureCollection',
  features: features
};

fs.writeFileSync('out.geojson', JSON.stringify(featureCollection));
console.log('OK');
