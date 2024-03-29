import {StyleSheet,View,TouchableOpacity,Dimensions,Image} from 'react-native';
import React from 'react';
import Tile from './tile.js';
import Utils from './utils.js';
const colorCount = 5;


const fruits = [
  require('../assets/apple.png'),
  require('../assets/banana.png'),
  require('../assets/cherry.png'),
  require('../assets/grapes.png'),
  require('../assets/lemon.png'),
  require('../assets/orange.png'),
  require('../assets/pear.png'),
  require('../assets/strawberry.png'),
]

class Board extends React.Component {
  constructor(props) {
    super(props);
    const boardSize = this.props.boardSize;
    this.state = {
      selected: null,
      tiles: this.initializeTiles(boardSize),
    }
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


  render() {
    const cellSize = Math.floor(Dimensions.get('window').width / this.props.boardSize)
    console.log(this.state.tiles[0])
    return (
    <View style={styles.board}>
        {this.state.tiles.map((rows, index) => (
            <View key={`row-${index}`} style={{flexDirection: "row"}} >
                {rows.map((nb, i) => {
                  let tile = <Image style={styles.tile} source={require('../assets/Fruit_bg.jpg')} />;

                  if (nb === 1) {
                    tile = <Image style={[styles.tile, styles.fruit]} source={fruits[0]} />;
                  } else if (nb === 2) {
                    tile = <Image style={[styles.tile, styles.fruit]} source={fruits[1]} />;
                  } else if (nb === 3) {
                    tile = <Image style={[styles.tile, styles.fruit]} source={fruits[2]} />;
                  } else if (nb === 4) {
                    tile = <Image style={[styles.tile, styles.fruit]} source={fruits[3]} />;
                  } else if (nb === 5) {
                    tile = <Image style={[styles.tile, styles.fruit]} source={fruits[4]} />;
                  } else if (nb === 6) {
                    tile = <Image style={[styles.tile, styles.fruit]} source={fruits[5]} />;
                  } else if (nb === 7) {
                    tile = <Image style={[styles.tile, styles.fruit]} source={fruits[6]} />;
                  } else if (nb === 8) {
                    tile = <Image style={[styles.tile, styles.fruit]} source={fruits[7]} />;
                  }

                    return (
                      <TouchableOpacity key={`col-${i}`}>
                        <View key={`col-${i}`} >
                          {tile}
                        </View>
                      </TouchableOpacity>
                    );
                })}
            </View>
        ))}
    </View>
    )
  }
}

const styles = StyleSheet.create({
  board : {
    top:-50,
    flex:0.8,
    paddingTop:30,
    paddingBottom:30,
    width: Dimensions.get('window').width,
    alignContent:"center",
    justifyContent:"center",
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  tile:{
    margin:2,
    width:(Math.floor(Dimensions.get('window').width-30)/ 8),
    height:(Math.floor(Dimensions.get('window').width-30)/ 8),
    borderRadius:5,
    backgroundColor: 'rgba(240, 205, 223, 0.6)'
  }
})

export default Board;
