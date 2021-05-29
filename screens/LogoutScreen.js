/* Basic Library */
import React, { useState, useEffect } from "react";
import Constants from 'expo-constants';

/* Ui Library */
import {View, Text, Button, StyleSheet, SafeAreaView} from 'react-native';

/* External Node */
import firebase from 'firebase';

/* Internal File */
import firestore from '../Firebase';

export default function ProductFeed({ navigation }) {

    /* Local Constant */
    const {uid} = firebase.auth().currentUser;
    const [user, setUser] = useState([]);

    /* Get user name function */
    async function GetUser() {
        const cityRef = firestore.collection('users').doc(uid);
        const doc = await cityRef.get();
        if (!doc.exists) {
        } else {
            setUser(doc.data().name);
        }
    }

    useEffect(() => {
        GetUser();
    }, []);

    /* Logout Function */
    async function Logout(){
        await firebase.auth().signOut();
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.username}> Welcome : {user}</Text>
                <Button title={"Logout"} onPress={Logout} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#FFF4E6',
    },
    username: {
        fontSize: 20,
        paddingBottom: 20,
    },
});