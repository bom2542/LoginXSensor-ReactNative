/* Basic Library */
import React, { useState, useEffect} from "react";
import Constants from 'expo-constants';

/* UI Library */
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';

/* External Node */
import axios from 'axios';
import firebase from 'firebase';

/* Internal File */
import firestore from '../Firebase';

export default function SignUp({ navigation }){

    /* Local Constant */
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /* Sign-up Function */
    async function SignUpFunction(){

        /* Register user to Firebase */
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        /* Local Constant */
        const {uid} = firebase.auth().currentUser;
        const user = { name: name };

        /* Add user(Name) to Firestore */
        await firebase.firestore().collection('users').doc(uid).set(user)
            .then(function (){
                alert("Register your: " + name + " Successful, Welcome!! ^^");
                navigation.reset({ index: 0, routes: [{ name: 'Login'}] });
            }).catch(function (){
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }

    return(
        <View style={styles.container}>
            <Text style={{fontSize: 24, fontWeight: "bold", textAlign: 'center' }}>Register</Text><Text></Text>
            <TextInput style={{borderWidth: 1, padding: 10, margin: 10}} placeholder="Profile name" onChangeText={setName} />
            <TextInput style={{borderWidth: 1, padding: 10, margin: 10}} placeholder="Email" onChangeText={setEmail} />
            <TextInput secureTextEntry={true} style={{borderWidth: 1, padding: 10, margin: 10}} placeholder="Password" onChangeText={setPassword} /><Text></Text>
            <Button title="register" onPress={SignUpFunction} /><Text></Text>
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
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})