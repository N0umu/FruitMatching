export default class Utils {
  static findRanges(tiles, size) {
    function findRangesByKey(tiles, size, key) {
      let findedRanges = [];
      for (let lineIndex = 0; lineIndex < size; lineIndex++) {
        let line = tiles.filter(
          (item) => item[key] == lineIndex
        ).sort(
          (item1, item2) => key === 'top' ? item1.left - item2.left : item1.top - item2.top
        );

        for(let i = 0; i < line.length;) {
          if(i < line.length - 1) {
            if (line[i].type !== line[i+1].type) {
              i++;
            } else {
              let rangeCount = 2;
              for(let rangeIndex = i+1; rangeIndex < line.length - 1; rangeIndex++) {
                if (line[rangeIndex].type !== line[rangeIndex+1].type) {
                  break;
                } else {
                  rangeCount++;
                }
              }
              if (rangeCount > 2) {
                console.log(`delete ${key}: pos ${lineIndex} ${i} range ${rangeCount}`);
                findedRanges.push({
                  line: lineIndex,
                  position: i,
                  count: rangeCount,
                  direction: key,
                });
              }
              i += rangeCount;
            }
          } else {
            i++;
          }
        }
      }
      return findedRanges;
    }
    const horisonalRanges = findRangesByKey(tiles, size, 'top');
    const verticalRanges = findRangesByKey(tiles, size, 'left');
    return [...horisonalRanges, ...verticalRanges];
  }

  static deleteRanges(tiles, ranges) {
    function getItemIndexByPos(items, x, y) {
      let item = items.find((item) => (
        item.left === x && item.top === y
      ));
      return items.indexOf(item);
    }

    for(let i=0; i<ranges.length; i++) {
      for(let j=0; j<ranges[i].count; j++) {
        let deletedIndex;
        if (ranges[i].direction === 'top') {
          deletedIndex = getItemIndexByPos(tiles, j + ranges[i].position, ranges[i].line);
        } else {
          deletedIndex = getItemIndexByPos(tiles, ranges[i].line, j + ranges[i].position);
        }
        console.log('deleted item id:' + tiles[deletedIndex].id)
        tiles.splice(deletedIndex,1);
      }
    }
  }

  static getRandom(size) {
     return Math.round(Math.random() * 10 % size);
  }

  static getItemById(items, id) {
    return items.find((item) => (
      item.id === id
    ))
  }

  static areNeighbors(source, dest) {
    return (
      (Math.abs(source.left-dest.left) == 1
        && source.top === dest.top)
      ||
      (Math.abs(source.top-dest.top) == 1
      && source.left === dest.left)
    );
  }

  static swapPosition(source, dest) {
    const { left, top } = source;
    source.left = dest.left;
    source.top = dest.top;
    dest.left = left;
    dest.top = top;
  }
}
