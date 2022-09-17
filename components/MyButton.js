import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types'


class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.text.toUpperCase(),
        };
    }
    render() {
        return (

            <TouchableOpacity style={[styles.button, { backgroundColor: this.props.color }]} onPress={this.props.pressFunc}>
                <Text style={{ color: '#fff', fontSize: 20 }}>{this.state.title}</Text>
            </TouchableOpacity>
        );
    }
}

MyButton.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    pressFunc: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 3,
        color: '#fff',
        margin: 5
    }
})

export default MyButton;
