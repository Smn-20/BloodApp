import React, { useState,useEffect } from 'react'
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


const Donate = ({ navigation }) => {

    const [Quantity, setQuantity] = useState(null)
    const [myID, setMyID] = useState('')
    const [Donor, setDonor] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        async function setInfo() {

            const id = await AsyncStorage.getItem('user_id')
            setMyID(id)
            axios.get(`https://ecf6-154-68-126-67.eu.ngrok.io/GetDonorbyId/${id}`).then((res) => {
                setbreeder(res.data[0])
            })
              .catch(err => {
                console.log(err)
            })

        }

        setInfo()

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const postObj = new FormData();
        postObj.append('user', myID)
        postObj.append('Quantity', Quantity)
        postObj.append('Donor', Donor)
        console.log(postObj)

        // let my_token = localStorage.getItem('token');

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            // Authorization: `Token ${my_token}`,
        };

        axios.post('https://ecf6-154-68-126-67.eu.ngrok.io/CreateCase/', postObj).then((res) => {
            console.log(res.status)
            alert("Succesfully")
            navigation.navigate('Requests')
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

                <View style={{ marginTop: 20, alignItems: "center", flexDirection: "row",backgroundColor:'red',paddingBottom:20 }}>
                    <TouchableOpacity style={{ width: "20%", alignItems: "flex-end", marginTop: 10, marginLeft: -20 }}
                        onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                    
                    <View style={{ width: "80%",alignItems:"center"}}>
                        <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20,color:'white' }}>CHUK Requests</Text>
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
                                selectedValue={Donor}
                                onValueChange={(val) => { setDonor(val) }}>
                                <Picker.Item label="Simon Rusekeza" value="id" />
                                <Picker.Item label="Donor 2" value="id" />
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


export default Donate;

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