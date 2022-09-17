import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, ToastAndroid } from 'react-native';
import MyButton from './MyButton';
import * as SecureStore from 'expo-secure-store';

class NewNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            category: "",
            categories: []
        };
        this.props.navigation.addListener('focus', () => {
            this.getCategories()
        })
    }

    updateCategory = (text) => {
        this.setState({
            category: text
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

    addCategory = async () => {
        if (!this.state.categories.includes(this.state.category.toUpperCase())) {
            let items = await SecureStore.getItemAsync("categories")
            let newItems
            if (items == null) {
                newItems = [this.state.category.toUpperCase()]
            } else {
                items = JSON.parse(items)
                newItems = [...items]
                newItems.push(this.state.category.toUpperCase())
            }
            await SecureStore.setItemAsync("categories", JSON.stringify(newItems));
            ToastAndroid.showWithGravity(
                'Dodano kategorię',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        } else {
            ToastAndroid.showWithGravity(
                'Kategoria istnieje',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
    }

    render() {
        return (
            <View style={{ width: this.state.width, height: this.state.height, backgroundColor: "#212121", padding: 20 }}>
                <TextInput
                    id="category"
                    style={{ color: '#aaa', padding: 20, fontSize: 20 }}
                    underlineColorAndroid="#aaa"
                    placeholderTextColor="#aaa"
                    placeholder="Category"
                    onChangeText={(text) => this.updateCategory(text)}
                />
                <MyButton text="dodaj" color="#FFC107" pressFunc={this.addCategory} />
            </View>
        );
    }
}

export default NewNote;
