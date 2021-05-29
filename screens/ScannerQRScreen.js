/* Basic Library */
import React, { useState, useEffect } from 'react';

/* UI Library */
import { Text, View, Modal, TouchableHighlight, Image } from 'react-native';

/* External Library */
import { WebView } from 'react-native-webview';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ScannerQRScreen({ navigation }){

    /* Local Constant */
    const [scanned, setScanned] = useState(true);
    const [modalVisible, setModalVisible] = useState(true);
    const [uri, setUri] = useState('');

    useEffect(() => {
        (async () => {
            await BarCodeScanner.requestPermissionsAsync();
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setModalVisible(true);
        setUri({ uri: data })
    };

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>

            {/* Webview Show */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setScanned(false);
                }}>
                <View style={{ flex: 1 }}>
                    <WebView style={{ flex: 1 }} source={{uri: uri['uri']}} />

                    <TouchableHighlight
                        style={{
                            backgroundColor:'black',
                            padding: 15,
                            alignItems: 'center'
                        }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            setScanned(false);
                        }}
                        underlayColor='slategray' >
                        <Text style={{ color:'white', fontSize: 20 }}>Scan QR Code</Text>
                    </TouchableHighlight>
                </View>
            </Modal>

            {/* Barcode Scan */}
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={{ marginBottom: 100 }}>
                    <View style={{ alignItems: 'center', marginBottom: 5 }}>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain',
                                marginBottom: 20,
                            }}
                            source={{ uri: 'https://domain.biz/img/logo_dark.png' }}
                        />
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', paddingBottom: 10}}>
                            Scan QR Code
                        </Text>
                    </View>
                    <View
                        style={{
                            borderColor: 'white',
                            borderTopWidth: 5,
                            borderBottomWidth: 5,
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            paddingVertical: 80,
                            paddingHorizontal: 100,
                        }}
                    />

                    <View style={{ alignItems: 'center', marginTop: 5 }}>
                        <Text style={{ color: 'white', fontSize: 15}}>
                            Set your camera on the QR.
                        </Text>
                    </View>
                </View>
            </BarCodeScanner>
        </View>
    );
}