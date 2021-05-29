/* Basic Library */
import React, {useState, useRef} from 'react';

/* UI Library */
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity, Share } from 'react-native';

/* Internal Import */
import QRCode from 'react-native-qrcode-svg';

export default function GenerateQRScreen({ navigation }){

    /* Local Constant */
    const [inputText, setInputText] = useState('');
    const [qrvalue, setQrvalue] = useState('');
    let myQRCode = useRef();
    const shareQRCode = () => {
        myQRCode.toDataURL((dataURL) => {
            console.log(dataURL);
            let shareImageBase64 = {
                title: 'React Native',
                url: `data:image/png;base64,${dataURL}`,
                subject: 'Share Link',
            };
            Share.share(shareImageBase64).catch();
        });
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.titleStyle}>Generation of QR Code</Text>

                {/* QR Return */}
                <QRCode
                    getRef={(ref) => (myQRCode = ref)}
                    value={qrvalue ? qrvalue : 'NA'}
                    size={250}
                    color="black"
                    backgroundColor="white"
                    logoSize={30}
                    logoMargin={2}
                    logoBorderRadius={15}
                    logoBackgroundColor="yellow"
                />

                <Text style={styles.textStyle}>Please insert any value to generate QR code</Text>

                {/* Input for generate code */}
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(inputText) => setInputText(inputText)}
                    placeholder="Enter Any Value"
                    value={inputText}
                />

                {/* Button generate qr code */}
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => setQrvalue(inputText)}>
                    <Text style={styles.buttonTextStyle}>Generate QR Code</Text>
                </TouchableOpacity>

                {/* Button share qr code */}
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={shareQRCode}>
                    <Text style={styles.buttonTextStyle}>Share QR Code</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    titleStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    textStyle: {
        textAlign: 'center',
        margin: 10,
    },
    textInputStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#51D8C7',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#51D8C7',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 30,
        padding: 10,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
});