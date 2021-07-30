import React, { Component } from 'react';
import { StyleSheet,  Text,  ImageBackground,  View } from 'react-native';

class BackgroundImage extends Component {

    render() {
        return (
            <ImageBackground source={require('../images/3bg.jpg')} style={styles.backgroundImage}>

                    {this.props.children}

            </ImageBackground>
        )
    }
}


export default BackgroundImage;


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    }
});
