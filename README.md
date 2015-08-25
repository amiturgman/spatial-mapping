# spatial-mapping

This module divides an area to buckets and maps 2d coordinates to a unique key.
This key can then be used to store users in a hash or a rational database that doesn't have a spatial-query support.

Indexing this column will enable us to query for users in a specific bucket.
Also- this module exposes an api to get all the buckets around a specific coordinates, so that we could query for
all users in a bucket-size area that doesn't necessarily falls in one whole bucket. Filtering the users that actually falls in the required area will be done by the callback of the requesting function.

An example of using this module can be found in the [nodemmo](https://github.com/amiturgman/nodemmo) project.

# usage

```javascript

var options = {
  gridUnit: {
    width: 2000,
    height: 500
  }
};

var spatialMapper = require('spatial-mapping')(options);
var x = 10000, y = 4000;
var gridKey = spatialMapper.getKey(x, y);
console.log('gridKey', gridKey); // gridKey [5,8]

var neighbors = spatialMapper.getNeighbors(x, y);
console.log('neighbors', neighbors); // neighbors [ '[4,7]','[5,7]','[6,7]','[4,8]','[5,8]','[6,8]','[4,9]','[5,9]','[6,9]' ]

```

# License
[MIT](LICENSE)




