import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, TextInput, ToastAndroid } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Note from './Note';

class notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            notes: [],
            ids: [],
            pattern: "",
        };
        this.props.navigation.addListener('focus', async () => {
            this.refresh()
        })
    }

    refresh = async () => {
        let allNotesIds = await SecureStore.getItemAsync("all")
        let notes = []
        if (allNotesIds != null) {
            allNotesIds = JSON.parse(allNotesIds)
            if (allNotesIds.length == 0) {
                this.setState({
                    notes: [], ids: []
                })
            } else {
                allNotesIds.forEach(async (note) => {
                    notes.push(JSON.parse(await SecureStore.getItemAsync(String(note))))
                    if (notes.length == allNotesIds.length) {
                        this.setState({
                            ids: allNotesIds,
                            notes: notes,
                        })
                    }
                })
            }
        } else {
            this.setState({
                notes: [],
                ids: []
            })
        }
    }

    deleteNote = async (index) => {
        let allNotesIds = this.state.ids
        let allNotes = this.state.notes
        let idx = this.state.ids.indexOf(index)
        let noteToDelete = String(index)
        allNotesIds.splice(idx, 1)
        allNotes.splice(idx, 1)
        if (allNotesIds.length == 0) {
            await SecureStore.deleteItemAsync("all")
        } else {
            await SecureStore.setItemAsync("all", JSON.stringify(allNotesIds))
        }
        await SecureStore.deleteItemAsync(noteToDelete)

        this.setState({
            ids: allNotesIds,
            notes: allNotes
        })
        ToastAndroid.showWithGravity(
            'Usunięto notatkę',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
    }

    moveToBigNote = (id, date, title, content, category, color) => {
        this.props.navigation.navigate("bignote", { id: id, date: date, title: title, content: content, category: category, color: color })
    }

    searchNotes = (text) => {
        this.setState({
            pattern: text
        })
    }

    filterNotes = (note) => {
        if (note.title.toLowerCase().includes(this.state.pattern.toLowerCase()) || note.content.toLowerCase().includes(this.state.pattern.toLowerCase()) || note.category.toLowerCase().includes(this.state.pattern.toLowerCase())) {
            return note
        }
    }

    render() {
        return (
            <ScrollView style={{ width: this.state.width, height: this.state.height, backgroundColor: "#212121" }}>
                <TextInput
                    id="title"
                    style={{ color: '#aaa', paddingHorizontal: 10, paddingVertical: 5, fontSize: 20, margin: 10, borderRadius: 20 }}
                    backgroundColor="#aaa3"
                    placeholderTextColor="#aaa"
                    placeholder="Search"
                    onChangeText={(text) => this.searchNotes(text)}
                />
                <Text style={{ color: "white", fontSize: 20 }}>Jakub Wiechniak 4Ia2</Text>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: this.state.width }}>
                    {this.state.notes.filter(this.filterNotes).map((note, i) => (
                        <Note key={i} id={this.state.ids[i]} title={note.title} category={note.category} content={note.content} color={note.color} date={note.date} delete={(index) => this.deleteNote(index)} moveToBigNote={(id, date, title, content, category, color) => this.moveToBigNote(id, date, title, content, category, color)} />
                    ))}
                </View>
            </ScrollView>
        );
    }
}

export default notes;
