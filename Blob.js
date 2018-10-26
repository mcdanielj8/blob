var sample = [[0,0,0,0,0,0,0,0,0,0],
                  [0,0,1,1,1,0,0,0,0,0],
                  [0,0,1,1,1,1,1,0,0,0],
                  [0,0,1,0,0,0,1,0,0,0],
                  [0,0,1,1,1,1,1,0,0,0],
                  [0,0,0,0,1,0,1,0,0,0],
                  [0,0,0,0,1,0,1,0,0,0],
                  [0,0,0,0,1,1,1,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0]];

function findFirstBlobCell(sample) {
  for (var i = 0; i < sample.length; i++) {
    //we're causing On^2 time here, so not great... could probably be optimized
    for(var j = 0; j <= sample[i].length; j++) {
      if (sample[i][j] === 1) {
        return { i: i, j: j}
      }
    }
  }
}

function cellFound(foundCells, cell) {
  for ( var k = 0; k < foundCells.length; k++){
        if (foundCells[k].i === cell.i && foundCells[k].j === cell.j) {
          return true;
        }
      }
    return false;
}

//getting the neighbors of the cells will help calculate boundaries
function findBlobCellNeighbors(sample, blobTop, foundCells, cell) {

  var neighbors = [];
  if ( cell.i != blobTop && cell.i > 0 &&
    !cellFound(foundCells, {i: cell.i-1, j :cell.j})){
    if ( sample[cell.i - 1][cell.j] === 1 ){
      neighbors.push({i: cell.i - 1, j: cell.j});
    }
  }
  if ( cell.j > 0 &&
    !cellFound(foundCells, {i: cell.i, j :cell.j-1})) {
    if ( sample[cell.i][cell.j - 1] === 1 ){
      neighbors.push({i: cell.i, j: cell.j - 1});
    }
  }
  if ( cell.j < sample[cell.i].length - 1 &&
    !cellFound(foundCells, {i: cell.i, j :cell.j + 1})) {
    if ( sample[cell.i][cell.j + 1] === 1 ){
      neighbors.push({i: cell.i, j: cell.j + 1});
    }
  }
  if ( cell.i < sample.length - 1 &&
    !cellFound(foundCells, {i: cell.i+1, j :cell.j})){
    if ( sample[cell.i + 1][cell.j] === 1) {
      neighbors.push({i: cell.i + 1, j: cell.j});
    }
  }
  return neighbors;
}

function findBlobCells(sample) {
  var firstCell = findFirstBlobCell(sample);
  if (firstCell == null) { //null check for empty map
    return null;
  }
  var top = firstCell.i;
  var blobCells = [firstCell];
  for (var i = 0; i < blobCells.length; i++) {
    var neighbors = findBlobCellNeighbors(sample, top, blobCells, blobCells[i]);
    //we're causing On^2 time here, so not great... could probably be optimized
    for (var j = 0; j < neighbors.length; j++) {
      blobCells.push(neighbors[j]);
    }
  }

  return blobCells;
}

function findBlobBoundaries(sample) {
  var blobCells = findBlobCells(sample);
  if (blobCells == null) {
    return null;
  }
  var top = blobCells[0].i;
  var left = blobCells[0].j;
  var bottom = blobCells[0].i;
  var right = blobCells[0].j;
  for (var i = 0; i < blobCells.length; i++) {
    left    =  ( blobCells[i].j <= left   ? blobCells[i].j : left   );
    bottom  =  ( blobCells[i].i >= bottom ? blobCells[i].i : bottom );
    right   =  ( blobCells[i].j >= right  ? blobCells[i].j : right  );
  }
  return {
    top   : top,
    left  : left,
    bottom: bottom,
    right : right
  }
}

console.log(findBlobBoundaries(sample));