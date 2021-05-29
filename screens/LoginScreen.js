/* Basic library */
import React, { useState } from "react";
import Constants from 'expo-constants';

/* UI Library */
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';

/* External Node */
import firebase from 'firebase';

export default function Login({ navigation }){

    /* Local Constant */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /* Login Function */
    async function LoginFunction(){
        const res = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                userCredential.user;
                alert("Login Success, Welcome!!");
                navigation.navigate('Sensor');
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }

    return(
        <View style={styles.container}>
            <Text style={{fontSize: 30, fontWeight: "bold", textAlign: 'center'}}>Login</Text><Text></Text>
            <TextInput style={{borderWidth: 1, padding: 10, margin: 10}} placeholder="Email" onChangeText={setEmail} />
            <TextInput secureTextEntry={true} style={{borderWidth: 1, padding: 10, margin: 10}} placeholder="Password" onChangeText={setPassword} /><Text></Text>
            <Button title="login" onPress={LoginFunction} /><Text></Text>
            <Button title="Register" onPress={() => navigation.navigate('SignUp')} /><Text></Text>
            <Button title="Forgot Password" onPress={() => navigation.navigate('Reset')} />
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