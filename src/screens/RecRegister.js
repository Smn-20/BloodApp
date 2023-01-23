import React, { useState } from 'react'
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


const RecRegister = ({ navigation }) => {

    const [securetext, setsecuretext] = useState(true)
    const [loading, setloading] = useState('')
    const updateSecureTextEntry = () => {
        setsecuretext(!securetext)
    }
    const [FirstName, setFirstName] = useState('')
    const [Place, setPlace] = useState('')
    const [typee, settypee] = useState('Recipient')
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('')
    const [Password, setPassword] = useState(null)


    const addDigit = (num) => {
        if (JSON.stringify(num).length > 1) {
            return JSON.stringify(num)
        }
        else {
            return '0' + num
        }
    }

    const handleSubmit = (e) => {
        setloading(true)
        if (FirstName.length < 2) {
            alert('Please Enter first Name');
        }
        else if (phone.length < 10) {
            alert('Please Enter phone');
        }
        else {
            e.preventDefault()
            const postObj = new FormData();
            postObj.append('FirstName', FirstName)
            postObj.append('Place', Place)
            postObj.append('typee', typee)
            postObj.append('email', email)
            postObj.append('phone', phone)
            postObj.append('password', Password)
            console.log(postObj)


            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.headers = {
                "Content-Type": "multipart/form-data",
            };

            axios.post('https://1de6-41-186-143-119.eu.ngrok.io/register/', postObj).then((res) => {
                if (res.data.code == 200) {
                    alert('Registered succesfully')
                    navigation.navigate('Home')
                }
                else {
                    alert('Phone Number or email already taken')
                }

            }).catch(err => {
                console.log(err)
            })

            setTimeout(() => {
                setloading(false)
            }, 5000)
        }
    }


    return (
        // onPress={() => navigation.goBack()}
        <>


            <StatusBar barStyle='dark-content' backgroundColor="#000000" hidden={false} translucent={true} />
            <KeyboardAvoidingView style={styles.container} behavior='position'>

                <View style={{ marginTop: 20, alignItems: "center", flexDirection: "row",backgroundColor:'red',paddingBottom:20 }}>
                    <TouchableOpacity style={{ width: "20%", alignItems: "flex-end", marginTop: 10, marginLeft: -20 }}
                        onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                    
                    <View style={{ width: "80%",alignItems:"center"}}>
                        <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20,color:'white' }}>Register Recipient</Text>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.Formcontainer}>
                        <TextInput
                            placeholder="Receipt Name"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={text => setFirstName(text)}
                        />
                    </View>
                    <View style={styles.Formcontainer}>
                        <TextInput
                            placeholder="Address"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setPlace(val)}
                        />
                    </View>
                    <View style={styles.Formcontainer}>
                        <TextInput
                            placeholder="Phone"
                            placeholderTextColor="#666666"
                            keyboardType='number-pad'
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setphone(val)}
                        />
                    </View>
                    <View style={styles.Formcontainer}>
                        <TextInput
                            placeholder="email"
                            placeholderTextColor="#666666"
                            keyboardType='email-address'
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setemail(val)}
                        />
                    </View>

                    <View style={styles.Formcontainer}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#666666"
                            secureTextEntry={securetext ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setPassword(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}>
                            {securetext ?

                                <Icon
                                    name="eye-with-line"
                                    color="grey"
                                    size={20}
                                    style={[styles.icon, { marginRight: 10, color: "#05375a" }]}
                                />
                                :
                                <Icon
                                    name="eye"
                                    color="black"
                                    size={20}
                                    style={[styles.icon, { marginRight: 10, color: "#05375a" }]}
                                />
                            }
                        </TouchableOpacity>
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
                                        <Text style={{ color: "white", marginTop: 10, fontSize: 20, fontWeight: "bold" }}>Register</Text>
                                    )}

                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </>
    );
};


export default RecRegister;

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