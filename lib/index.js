

var
  // default value for the world's width
  WORLD_WIDTH_DEFAULT = 10000000,
  // default value for the world's height
  WORLD_HEIGHT_DEFAULT = 5000000,
  // default value for the view/area/bucket width
  GRID_UNIT_WIDTH_DEFAULT = 2500,
  // default value for the view/area/bucket height
  GRID_UNIT_HEIGHT_DEFAULT = 1000;


// provides mapping functions to split a world into buckets (gridIds).
// input: {
//    // the size of the world, default values: WORLD_WIDTH_DEFAULT, WORLD_HEIGHT_DEFAULT
//    world: { width: [number], height: [number]},
//    // the size of the view/bucket/area, default values: GRID_UNIT_WIDTH_DEFAULT, GRID_UNIT_HEIGHT_DEFAULT
//    gridUnit: { width: [number], height: [number]}
// }
module.exports = function(options) {

  options = options || {};
  options.world = options.world || {};
  options.gridUnit = options.gridUnit || {};

  var worldWidth = options.world.width || WORLD_WIDTH_DEFAULT;
  var worldHeight = options.world.height || WORLD_HEIGHT_DEFAULT;
  var gridUnitWidth = options.gridUnit.width || GRID_UNIT_WIDTH_DEFAULT;
  var gridUnitHeight = options.gridUnit.height || GRID_UNIT_HEIGHT_DEFAULT;

  // calculates how many digits the key is composed of
  var digitsX = ((Math.ceil(worldWidth / gridUnitWidth)) +'').length;
  var digitsY = ((Math.ceil(worldHeight / gridUnitHeight)) +'').length;

  // pad the key with leading zeros
  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  function formatKey(a,b) {
    return zeroPad(a, digitsX) + ',' + zeroPad(b, digitsY);
  }

  function getKeyX(x) {
    return Math.floor(x/gridUnitWidth);
  }

  function getKeyY(y) {
    return Math.floor(y/gridUnitHeight);
  }

  function getKey(x, y) {
    var keyX = getKeyX(x);
    var keyY = getKeyY(y);
    var gridKey = formatKey(keyX, keyY);
    return gridKey;
  }

  function getNeighbors(x, y) {
    var keyX = getKeyX(x);
    var keyY = getKeyY(y);

    var keys = [];

    if(keyX > 0 &&  keyY > 0)  keys.push(formatKey(keyX - 1, keyY - 1));
    if(             keyY > 0)  keys.push(formatKey(keyX,     keyY - 1));
    if(             keyY > 0)  keys.push(formatKey(keyX + 1, keyY - 1));

    if(keyX > 0             )  keys.push(formatKey(keyX - 1, keyY));
                               keys.push(formatKey(keyX,     keyY));
                               keys.push(formatKey(keyX + 1, keyY));

    if(keyX > 0             )  keys.push(formatKey(keyX - 1, keyY + 1));
                               keys.push(formatKey(keyX,     keyY + 1));
                               keys.push(formatKey(keyX + 1, keyY + 1));

    return keys;
  }

  return {
    // gets a grid Id for a specific coordinates
    // input: numbers: x, y
    // returns: string: the grid Id
    getKey : getKey,

    // gets the grid Ids of the grids around a specific coordinates
    // input: numbers: x, y
    // returns: an array of strings: the grind Ids
    getNeighbors: getNeighbors
  };
}