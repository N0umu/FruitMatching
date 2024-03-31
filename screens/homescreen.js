import { StyleSheet, View, ImageBackground, Alert } from 'react-native';
import React from 'react';
import { Button, TextInput, Text } from 'react-native-paper';
import {emailValidator, nameValidator} from '../utils/Utils';
import { connect } from 'react-redux';


class Homescreen extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            nom: "",
            prenom: "",
            email: "",
        }

    }

    onLoginPressed () {
        const formData = new FormData();

        const nameError = nameValidator(this.state.nom)
        const emailError = emailValidator(this.state.email)

        if (nameError || emailError) {
            Alert.alert('Erreur !', 'Un des champs est invalide', [
                {text: 'OK', onPress: () => console.log("ok pressed")},
            ])
            return;
        } else {
            formData.append("nom",this.state.nom)
            formData.append("prenom",this.state.prenom)
            formData.append("email",this.state.email)
            fetch('http://jdevalik.fr/api/FruitMatching/insertuser.php', {
                method: 'post',
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }).then((response) => response.json())
                .then((json) =>  {
                    console.log(json)
                    if(json == false) {
                        Alert.alert('Erreur !', 'L\'email saisi existe deja', [
                            {text: 'OK', onPress: () => console.log("ok pressed")},
                        ])
                    } else {
                        const action = {type: "CURRENT_USER", value:{id: json["id"], nom: json["nom"], prenom: json["prenom"], email: json["email"], score: 0}}
                        this.props.dispatch(action)
                        this.props.navigation.navigate('Game');
                    }
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
                <View style= {styles.container}>

                <Text style= {styles.title} variant="headlineLarge">FruitMatching</Text>

                    <TextInput
                        label="Nom"
                        onChangeText={text => this.setState({nom: text})}
                        value={this.state.nom}
                        returnKeyType='next'
                        style={styles.input}
                        mode='outlined'
                        />

                    <TextInput
                        label="Prenom"
                        onChangeText={text => this.setState({prenom: text})}
                        value={this.state.prenom}
                        returnKeyType='next'
                        style={styles.input}
                        mode='outlined'
                        />

                    <TextInput
                        label="Email"
                        onChangeText={text => this.setState({email: text})}
                        value={this.state.email}
                        returnKeyType='next'
                        style={styles.input}
                        mode='outlined'
                        />

                    <Button style={styles.button} icon="controller-classic" mode="contained" onPress={() => this.onLoginPressed()}><Text style= {styles.buttonText}>Jouer</Text></Button>
                </View>     
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

    input: {
        width: 200,
        margin: 10
    },

    button:{
        fontSize:30,
        padding:20
    },

    buttonText:{
        fontSize: 20,
        color:'#fff',
        textShadowColor: "#000",
        textShadowOffset: {
            width: 0,
            height: 0,
        },
        textShadowRadius: 15,
    },

    title: {
        color:'#fff',
        textShadowColor: "#000",
        textShadowOffset: {
            width: 0,
            height: 0,
        },
        textShadowRadius: 15,
        marginBottom: 40
    }

});

const mapStateProps = (state) => {
    return state
}

export default connect(mapStateProps) (Homescreen)