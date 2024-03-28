import {StyleSheet,View,TouchableOpacity,Dimensions,Image} from 'react-native';
import React from 'react';
import Tile from './tile.js';
import Utils from './utils.js';
const colorCount = 5;

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
    backgroundColor: 'black',
  },
  tile:{
    margin:2,
    width:(Math.floor(Dimensions.get('window').width-30)/ 8),
    height:(Math.floor(Dimensions.get('window').width-30)/ 8),
    borderRadius:5,
    backgroundColor: '#000000'
  }
})

export default Board;
