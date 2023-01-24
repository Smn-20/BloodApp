import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    ScrollView,
    TextInputMask,
    KeyboardAvoidingView,


} from "react-native";
import Icon from '@expo/vector-icons/Entypo';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage'


const SendRequest = ({ navigation }) => {

    const [myID, setMyID] = useState('')
    const [quantity, setQuantity] = useState(null)
    const [Btype, setBtype] = useState(null)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        async function setInfo() {

            const id = await AsyncStorage.getItem('user_id')
            setMyID(id)
            console.log("logged in", id)
        }

        setInfo()

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const postObj = JSON.stringify({
            'user': myID,
            'Btype': Btype,
            'quantity': quantity,      
    
          })

        // let my_token = localStorage.getItem('token');

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            // Authorization: `Token ${my_token}`,
        };

        axios.post('https://687d-41-186-143-119.eu.ngrok.io/CreateRequest/', postObj).then((res) => {
            console.log(res.status)
            alert("Succesfully")
            navigation.navigate('RecRequests')
        })
            .then((res) => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

        setTimeout(() => {
            setLoading(false)
        }, 5000)

    }



    return (
        // onPress={() => navigation.goBack()}
        <>


            <StatusBar barStyle='dark-content' backgroundColor="#000000" hidden={false} translucent={true} />

            <View style={{ marginTop: 20, alignItems: "center", flexDirection: "row", backgroundColor: 'red', paddingBottom: 20 }}>
                <TouchableOpacity style={{ width: "20%", alignItems: "flex-end", marginTop: 10, marginLeft: -20 }}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

                <View style={{ width: "80%", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20, color: 'white' }}>Request Blood</Text>
                </View>
            </View>

            <ScrollView>
                <View >
                    <Picker
                        mode='dropdown'
                        style={{
                            marginTop: 10,
                            width: '85%',
                            alignSelf: 'center'
                        }}
                        selectedValue={Btype}
                        onValueChange={(val) => { setBtype(val) }}>
                        <Picker.Item value="A+" label="A+" />
                        <Picker.Item value="A-" label="A-" />
                        <Picker.Item value="B+" label="B+" />
                        <Picker.Item value="B-" label="B-" />
                        <Picker.Item value="AB+" label="AB+" />
                        <Picker.Item value="AB-" label="AB-" />
                        <Picker.Item value="O+" label="O+" />
                        <Picker.Item value="O-" label="O-" />
                    </Picker>
                </View>
                <View style={styles.Formcontainer}>
                    <TextInput
                        placeholder="Quantity"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        keyboardType='number-pad'
                        onChangeText={(val) => setQuantity(val)}
                    />
                </View>
                <View style={{ marginTop: 30, marginBottom: 90 }}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={(e) => {
                            handleSubmit(e)
                        }}>
                        <View
                            style={{ backgroundColor: "red", width: "115%", height: "100%", alignItems: "center", borderRadius: 10 }}
                        >
                            {loading ? (
                                <ActivityIndicator size='large' color='white' style={{ marginTop: 10 }} />
                            ) :
                                (
                                    <Text style={{ color: "white", marginTop: 10, fontSize: 20, fontWeight: "bold" }}>Send</Text>
                                )}

                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </>
    );
};


export default SendRequest;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    forgotpass: {
        color: "#0096C7",
        fontSize: 14,

        marginLeft: 20,
        marginTop: 15
    },
    Formcontainer: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 5,
        height: 50,
        borderWidth: 1,
        borderColor: "#05375a",
        borderRadius: 10,
        marginHorizontal: 20
    },
    icon: {
        marginTop: 10,
        marginBottom: 20,
        color: '#0096C7',

    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        marginLeft: 20,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingLeft: 40,
        paddingRight: 40
    },
    footer: {
        marginTop: 30,
        height: "45%",
        width: "100%",
        alignContent: "center",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    footerImage: {
        height: "120%",
        flex: 1,
        resizeMode: "contain"
    }
})