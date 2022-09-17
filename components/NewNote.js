import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, ToastAndroid } from 'react-native';
import MyButton from './MyButton';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';

const months = ["STY", "LUT", "MAR", "KWI", "MAJ", "CZE", "LIP", "SIE", "WRZ", "PAŹ", "LIS", "GRU"]
class NewNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            title: "",
            content: "",
            category: "",
            categories: []
        };
        this.props.navigation.addListener('focus', () => {
            this.getCategories()
        })

    }

    updateTexts = (what, text) => {
        if (what == "title") {
            this.setState({
                title: text
            })
        } else if (what == "content") {
            this.setState({
                content: text
            })
        }
    }

    changeCategory = (cat) => {
        this.setState({
            category: cat
        })
    }

    getCategories = async () => {
        let cats = await SecureStore.getItemAsync("categories")
        let newCats
        if (cats == null) {
            newCats = ["brak"]
        } else {
            cats = JSON.parse(cats)
            newCats = [...cats]
        }

        this.setState({
            categories: newCats
        })
    }

    getRandomColor = () => {
        let color = '#'
        let contents = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
        for (let i = 0; i < 6; i++) {
            color += contents[Math.floor(Math.random() * 16)]
        }

        return color
    }

    addNote = async () => {
        let date = new Date()
        let noteDate = String(date.getDate()) + " " + months[date.getMonth()]
        let items = await SecureStore.getItemAsync("all")
        let newItems
        let noteId
        if (items == null) {
            noteId = 1
            newItems = [1]
        } else {
            items = JSON.parse(items)
            newItems = [...items]
            noteId = items[items.length - 1] + 1
            newItems.push(noteId)

        }
        await SecureStore.setItemAsync("all", JSON.stringify(newItems));
        await SecureStore.setItemAsync(JSON.stringify(noteId), JSON.stringify({ title: this.state.title, category: this.state.category, content: this.state.content, color: this.getRandomColor(), date: noteDate }))
        ToastAndroid.showWithGravity(
            'Dodano notatkę',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
        this.props.navigation.navigate("notes")
    }

    render() {
        return (
            <View style={{ width: this.state.width, height: this.state.height, backgroundColor: "#212121", padding: 20 }}>
                <TextInput
                    id="title"
                    style={{ color: '#aaa', padding: 20, fontSize: 20 }}
                    underlineColorAndroid="#aaa"
                    placeholderTextColor="#aaa"
                    placeholder="Title"
                    onChangeText={(text) => this.updateTexts("title", text)}
                />
                <TextInput
                    id="content"
                    style={{ color: '#aaa', padding: 20, fontSize: 20 }}
                    underlineColorAndroid="#aaa"
                    placeholderTextColor="#aaa"
                    placeholder="Content"
                    onChangeText={(text) => this.updateTexts("content", text)}
                />
                <View style={{ padding: 20 }}>
                    <Text style={{ color: "#aaa", fontSize: 20 }}>Kategoria:</Text>
                    <Picker
                        style={{ color: "#aaa", fontSize: 30 }}
                        dropdownIconColor="#aaa"
                        selectedValue={this.state.category}
                        onValueChange={(cat) => {
                            this.changeCategory(cat)
                        }}>

                        {this.state.categories.map((cat, i) => (
                            <Picker.Item key={i} label={cat} value={cat} />
                        ))}

                    </Picker>
                </View>
                <MyButton text="dodaj" color="#FFC107" pressFunc={this.addNote} />
            </View>
        );
    }
}

export default NewNote;
