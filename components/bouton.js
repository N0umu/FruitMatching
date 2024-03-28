import React from "react";
import { StyleSheet, Text, View, Pressable } from 'react-native';


export default class Bouton extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {

        var {theme} = this.props
        var {text} = this.props

        return (
            <View>
                <Pressable  onPress={this.props.nav} style={theme === "white" ? styles.bWhite : theme === "violet" ? styles.bViolet : "" } >
                    <Text style={theme === "white" ? styles.tViolet : theme === "violet" ? styles.tWhite : "" }>{text}</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bViolet: {
        paddingHorizontal: 60,
        paddingVertical: 10,
        borderRadius:5,
        borderColor: "#048B9A",
        borderWidth: 2, 
        margin: 10,
        backgroundColor: "#048B9A",
    },

    bWhite: {
        paddingHorizontal: 60,
        paddingVertical: 10,
        borderRadius:5, 
        borderColor: "#048B9A",
        borderWidth: 1, 
        margin: 10,
        backgroundColor: "white",
        textAlign:"center"
    },

    tWhite: {
        color: "white",
        fontWeight: "bold"
    },

    tViolet: {
        color: "#048B9A",
        fontWeight: "bold"
    }


});