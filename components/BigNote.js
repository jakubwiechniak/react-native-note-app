import React, { Component } from 'react'
import { Text, View, Dimensions, TextInput, ToastAndroid } from 'react-native'
import MyButton from './MyButton';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';

export class BigNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            title: this.props.route.params.title,
            content: this.props.route.params.content,
            category: this.props.route.params.category,
            categories: []
        }
        console.log(this.props.route.params.content)
    }

    componentDidMount = () => {
        this.getCategories()
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

    modifyNote = async () => {
        console.log(await SecureStore.getItemAsync("all"))
        console.log(await SecureStore.getItemAsync(JSON.stringify(this.props.route.params.id)))
        console.log(JSON.stringify(this.props.route.params.id), JSON.stringify({ title: this.state.title, category: this.state.category, content: this.state.content, color: this.props.route.params.color, date: this.props.route.params.date }))
        await SecureStore.setItemAsync(JSON.stringify(this.props.route.params.id), JSON.stringify({ title: this.state.title, category: this.state.category, content: this.state.content, color: this.props.route.params.color, date: this.props.route.params.date }))
        ToastAndroid.showWithGravity(
            'Zmodyfikowano notatkę',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
        this.props.navigation.navigate("drawer")
    }

    render() {
        return (
            <View style={{ width: this.state.width, height: this.state.height, padding: 10, backgroundColor: "#212121" }}>
                <Text style={{ alignSelf: "flex-end", color: "white", fontSize: 30 }}>{this.props.route.params.date.toUpperCase()}</Text>
                <TextInput
                    id="title"
                    style={{ color: '#aaa', padding: 20, fontSize: 20 }}
                    underlineColorAndroid="#aaa"
                    placeholderTextColor="#aaa"
                    placeholder="Title"
                    value={this.state.title}
                    onChangeText={(text) => this.updateTexts("title", text)}
                />
                <TextInput
                    id="content"
                    style={{ color: '#aaa', padding: 20, fontSize: 20 }}
                    underlineColorAndroid="#aaa"
                    placeholderTextColor="#aaa"
                    placeholder="Content"
                    value={this.state.content}
                    multiline={true}
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
                <MyButton text="zmień" color="#FFC107" pressFunc={this.modifyNote} />
            </View>
        )
    }
}

export default BigNote
