import { StyleSheet, View, ImageBackground } from 'react-native';
import React from 'react';
import {Text, Button, Modal, Portal } from 'react-native-paper';
import { connect } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Board from '../components/board';



class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            utilisateur: this.props.user,
            leaderboard: this.props.leaderboard,
            leaderboardVisible:false
        }

    }
    
    componentDidUpdate(){
        this.props.leaderboard != this.state.leaderboard ? this.setState({leaderboard: this.props.leaderboard}) : ""
    }

    componentDidMount(){
        if(this.state.leaderboard.length < 1){
            fetch('http://jdevalik.fr/api/FruitMatching/getleaderboard.php').then((response) => response.json())
            .then((json) =>  {
                json.map(element =>{
                    const action = {type: "LEADERBOARD", value:element}
                    this.props.dispatch(action)
                })
            })
            .catch((error) => {
                console.error(error);
            });
        }
        
    }


    render () {
        const image = require('../assets/Fruit_bg.jpg');
        return (
            <ImageBackground style= {styles.container} source={image} resizeMode="cover">
                <View style= {styles.containerRow}>
                    <Button style= {styles.button} icon="controller-classic" mode="contained" onPress={() => console.log("new game")}>New game</Button>
                    <Button style= {styles.button} icon="trophy" mode="contained" onPress={() => this.setState({leaderboardVisible : true})}>High scores</Button>
                </View>
                <View style= {styles.containerRow}>
                    <Text style= {styles.title} variant="titleLarge">Tries left: 0</Text>
                    <Text style= {styles.title} variant="titleLarge">Score: {this.state.utilisateur.score}</Text>
                </View>
                {/**/}
                <View style={styles.container}>
                    <GestureHandlerRootView style={flex=1}>
                    <Board boardSize={8}></Board>
                    </GestureHandlerRootView>
                </View>

                <Portal>
                    <Modal visible={this.state.leaderboardVisible} onDismiss={() => this.setState({leaderboardVisible : false})} contentContainerStyle={styles.modal}>
                    <Text style={styles.test} variant="titleLarge">MEILLEUR SCORES</Text>
                        
                        {this.state.leaderboard.map((d,i) => (
                            <Text variant="titleMedium" key={i}> {d.nom} {d.prenom}: {d.score} points</Text>
                        ))
                        }
                    
                    </Modal> 
                </Portal>
            </ImageBackground> 
        )   
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },

      containerRow: {
        margin:20,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
      },
  
      button:{
        marginHorizontal:10,
      },

      input: {
          height: 50,
          width: 200,
          margin: 10
      },
  
      title: {
          marginHorizontal: 50,
          color:'#fff',
          textShadowColor: "#000",
          textShadowOffset: {
              width: 0,
              height: 0,
          },
          textShadowRadius: 15,
          marginBottom: 40
      },
      modal:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding:20
      },

      test:{
        textDecorationLine: "underline"
      }

});

const mapStateProps = (state) => {
    return {
        user: state.userReducer.currentU,
        leaderboard : state.leaderboardReducer.leaderboard
        }
}

export default connect(mapStateProps) (Game)