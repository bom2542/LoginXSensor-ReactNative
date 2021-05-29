/* Basic library */
import React, { useState, useEffect } from "react";
import Constants from 'expo-constants';

/* Ui Library */
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';

/* external node.js */
import axios from 'axios';
import firebase from 'firebase';

/* internal import */
import firestore from '../Firebase';

export default function Reset({ navigation }){

    /* Local Constant */
    const [email, setEmail] = useState('');

    /* Reset password Function */
    async function ResetFunction(){
        await firebase.auth().sendPasswordResetEmail(email).then(function (){
            alert("Send link reset password to Email "+ email +" Sucessfully!!");
            navigation.reset({ index: 0, routes: [{ name: 'Login'}] });
        }).catch(function (){
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }

    return(
        <View style={styles.container}>
            <Text style={{fontSize: 24, fontWeight: "bold", textAlign: 'center' }}>Reset Password</Text><Text></Text>
            <TextInput style={{borderWidth: 1, padding: 10, margin: 0}} placeholder="Email" onChangeText={setEmail} /><Text></Text>
            <Button title="reset" onPress={ResetFunction} /><Text></Text>
            <Button title="back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 20,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})