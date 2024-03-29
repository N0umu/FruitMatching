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
    for (let i = 0; i < 8; i++) {
      tiles[i] = [];
      for (let j = 0; j < 8; j++) {
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
        this.setState({ tiles: newTiles, selected: null });
      } else {
        this.setState({ selected: { row, col } });
      }
    }
  };

  areAdjacent(row1, col1, row2, col2) {
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  }

  render() {
    const cellSize = Math.floor(Dimensions.get('window').width / this.props.boardSize);
    return (
        <View style={styles.board}>
          {this.state.tiles.map((rows, rowIndex) => (
              <View key={`row-${rowIndex}`} style={{ flexDirection: 'row' }}>
                {rows.map((fruitIndex, colIndex) => {
                  const fruitImage = fruits[fruitIndex - 1]; // -1 to adjust for zero-based index
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
    paddingTop: 30,
    paddingBottom: 30,
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
