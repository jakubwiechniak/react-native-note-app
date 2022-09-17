import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as SecureStore from 'expo-secure-store';

export class Note extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            id: this.props.id
        }
        console.log(this.props.id)
    }

    deleteFunc = async () => {
        this.props.delete(this.props.id)
    }

    moveToBigNote = () => {
        this.props.moveToBigNote(this.props.id, this.props.date, this.props.title, this.props.content, this.props.category, this.props.color)
    }

    render() {
        return (
            <TouchableWithoutFeedback onLongPress={this.deleteFunc} onPress={this.moveToBigNote}>
                <View style={{ backgroundColor: this.props.color, width: this.state.width / 2 - 20, margin: 10, padding: 10, height: this.state.width / 2 - 20, borderRadius: 20 }}>
                    {this.props.category != "" ? <View style={{ padding: 5, borderRadius: 3, backgroundColor: "#212121", alignSelf: "flex-start" }}><Text style={{ color: this.props.color, fontWeight: "bold" }}>{this.props.category}</Text></View> : null}
                    <Text style={{ color: 'white', fontSize: 20, alignSelf: "flex-end" }}>{this.props.date.toUpperCase()}</Text>
                    <Text style={{ color: 'white', fontSize: 30 }}>{this.props.title}</Text>
                    <Text style={{ color: 'white', fontSize: 20 }}>{this.props.content}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default Note
