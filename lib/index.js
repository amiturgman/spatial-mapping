
var
  // default value for the view/area/bucket width
  GRID_UNIT_WIDTH_DEFAULT = 2500,
  // default value for the view/area/bucket height
  GRID_UNIT_HEIGHT_DEFAULT = 1000;


// provides mapping functions to split a world into buckets (gridIds).
// input: {
//    // the size of the view/bucket/area, default values: GRID_UNIT_WIDTH_DEFAULT, GRID_UNIT_HEIGHT_DEFAULT
//    gridUnit: { width: [number], height: [number]}
// }
module.exports = function(options) {

  options = options || {};
  options.gridUnit = options.gridUnit || {};

  var gridUnitWidth = options.gridUnit.width || GRID_UNIT_WIDTH_DEFAULT;
  var gridUnitHeight = options.gridUnit.height || GRID_UNIT_HEIGHT_DEFAULT;

  var deltaX = gridUnitWidth / 2;
  var deltaY = gridUnitHeight / 2;

  function formatKey(a, b) {
    return '[' + a + ',' + b + ']';
  }

  function getKeyX(x) {
    return Math.floor( x / gridUnitWidth);
  }

  function getKeyY(y) {
    return Math.floor( y / gridUnitHeight);
  }

  function getKey(x, y) {
    var keyX = getKeyX(x);
    var keyY = getKeyY(y);
    var gridKey = formatKey(keyX, keyY);
    return gridKey;
  }

  function getViewGrids(x, y) {

    var keys = [];

    keys.push(getKey(x - deltaX, y - deltaY));
    keys.push(getKey(x - deltaX, y + deltaY));
    keys.push(getKey(x + deltaX, y - deltaY));
    keys.push(getKey(x + deltaX, y + deltaY));

    return keys;
  }

  return {
    // gets a grid Id for a specific coordinates
    // input: numbers: x, y
    // returns: string: the grid Id
    getKey : getKey,

    // gets a list of grid Ids that participate in a specific coordinates' view
    // input: numbers: x, y
    // returns: an array of strings: the grid Ids
    getViewGrids: getViewGrids
  };
}