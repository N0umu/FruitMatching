import { StyleSheet, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import React from 'react';

const fruits = [
  require('../assets/apple.png'),
  require('../assets/banana.png'),
  require('../assets/cherry.png'),
  require('../assets/grapes.png'),
  require('../assets/lemon.png'),
  require('../assets/orange.png'),
  require('../assets/pear.png'),
  require('../assets/strawberry.png'),
];

class Board extends React.Component {
  constructor(props) {
    super(props);
    const boardSize = this.props.boardSize;
    this.state = {
      selected: null,
      tiles: this.initializeTiles(boardSize),
    };
  }

  initializeTiles(size) {
    let tiles = [];
    for (let i = 0; i < size; i++) {
      tiles[i] = [];
      for (let j = 0; j < size; j++) {
        tiles[i][j] = Math.ceil(Math.random() * size);
      }
    }
    return tiles;
  }

  handleTilePress = (row, col) => {
    const { selected, tiles } = this.state;
    if (selected === null) {
      this.setState({ selected: { row, col } });
    } else {
      const { row: prevRow, col: prevCol } = selected;
      if (this.areAdjacent(row, col, prevRow, prevCol)) {
        const newTiles = [...tiles];
        const temp = newTiles[row][col];
        newTiles[row][col] = newTiles[prevRow][prevCol];
        newTiles[prevRow][prevCol] = temp;

        const alignedPositions = this.checkAlignments(newTiles);
        this.removeAlignedTiles(newTiles, alignedPositions);

        this.setState({ tiles: newTiles, selected: null });
      } else {
        this.setState({ selected: { row, col } });
      }
    }
  };

  areAdjacent(row1, col1, row2, col2) {
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  }

  checkAlignments(tiles) {
    const alignments = [];

    for (let row = 0; row < tiles.length; row++) {
      for (let col = 0; col < tiles[row].length; col++) {
        if (tiles[row][col] !== null) {
          const horizontalAlignment = this.checkHorizontalAlignment(tiles, row, col);
          const verticalAlignment = this.checkVerticalAlignment(tiles, row, col);

          if (horizontalAlignment.length >= 3) {
            alignments.push(...horizontalAlignment);
          }
          if (verticalAlignment.length >= 3) {
            alignments.push(...verticalAlignment);
          }
        }
      }
    }

    return alignments;
  }

  checkHorizontalAlignment(tiles, row, col) {
    const alignment = [];
    let currentFruit = tiles[row][col];

    for (let i = col; i >= 0 && currentFruit === tiles[row][i]; i--) {
      alignment.unshift({ row, col: i });
    }

    for (let i = col + 1; i < tiles[row].length && currentFruit === tiles[row][i]; i++) {
      alignment.push({ row, col: i });
    }

    return alignment;
  }

  checkVerticalAlignment(tiles, row, col) {
    const alignment = [];
    let currentFruit = tiles[row][col];

    for (let i = row; i >= 0 && currentFruit === tiles[i][col]; i--) {
      alignment.unshift({ row: i, col });
    }

    for (let i = row + 1; i < tiles.length && currentFruit === tiles[i][col]; i++) {
      alignment.push({ row: i, col });
    }

    return alignment;
  }

  removeAlignedTiles(tiles, alignedPositions) {
    alignedPositions.forEach(({ row, col }) => {
      tiles[row][col] = null;
    });

    for (let col = 0; col < tiles[0].length; col++) {
      let topNullIndex = null;

      for (let row = tiles.length - 1; row >= 0; row--) {
        if (tiles[row][col] === null && topNullIndex === null) {
          topNullIndex = row;
        } else if (tiles[row][col] !== null && topNullIndex !== null) {
          tiles[topNullIndex][col] = tiles[row][col];
          tiles[row][col] = null;
          topNullIndex--;
        }
      }
    }

    for (let col = 0; col < tiles[0].length; col++) {
      for (let row = 0; row < tiles.length; row++) {
        if (tiles[row][col] === null) {
          tiles[row][col] = Math.ceil(Math.random() * tiles.length);
        }
      }
    }


    const newAlignedPositions = this.checkAlignments(tiles);
    if (newAlignedPositions.length > 0) {
      this.removeAlignedTiles(tiles, newAlignedPositions);
    } else {
      this.setState({ tiles });
    }
  }


  render() {
    const cellSize = Math.floor(Dimensions.get('window').width / this.props.boardSize);
    return (
        <View style={styles.board}>
          {this.state.tiles.map((rows, rowIndex) => (
              <View key={`row-${rowIndex}`} style={{ flexDirection: 'row' }}>
                {rows.map((fruitIndex, colIndex) => {
                  const fruitImage = fruits[fruitIndex - 1];
                  if (fruitIndex !== null) {
                    return (
                        <TouchableOpacity
                            key={`col-${colIndex}`}
                            onPress={() => this.handleTilePress(rowIndex, colIndex)}
                        >
                          <View style={styles.tile}>
                            <Image style={[styles.tile, styles.fruit]} source={fruitImage} />
                          </View>
                        </TouchableOpacity>
                    );
                  } else {
                    return null;
                  }
                })}
              </View>
          ))}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  board: {
    top: -50,
    flex: 0.8,
    paddingTop: 100,
    paddingBottom: 100,
    width: Dimensions.get('window').width,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  tile: {
    margin: 2,
    width: Math.floor((Dimensions.get('window').width - 30) / 8),
    height: Math.floor((Dimensions.get('window').width - 30) / 8),
    borderRadius: 5,
    backgroundColor: 'rgba(240, 205, 223, 0.6)',
  },
  fruit: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Board;
