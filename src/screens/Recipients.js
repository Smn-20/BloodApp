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


const Recipients
 = ({ navigation }) => {

    const [securetext, setsecuretext] = useState(true)
    const [loading, setloading] = useState('')
    const updateSecureTextEntry = () => {
        setsecuretext(!securetext)
    }
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [MName, setMName] = useState('')
    const [FName, setFName] = useState('')
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('')
    const [Weight, setWeight] = useState('')
    const [Height, setHeight] = useState('')
    const [Password, setPassword] = useState(null)
    const [year, setYear] = useState(JSON.stringify(new Date().getFullYear()))
    const [month, setMonth] = useState('01')
    const [days, setdays] = useState('01')



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
        else if (LastName.length < 2) {
            alert('Please Enter Last Name');
        }
        else if (phone.length < 10) {
            alert('Please Enter phone');
        }
        else {
            e.preventDefault()
            const postObj = new FormData();
            postObj.append('FirstName', FirstName)
            postObj.append('LastName', LastName)
            postObj.append('MName', MName)
            postObj.append('FName', FName)
            postObj.append('phone', phone)
            postObj.append('DOB', year + '-' + month + '-' + days)
            postObj.append('email', email)
            postObj.append('Weight', Weight)
            postObj.append('Height', Height)
            postObj.append('password', Password)
            console.log(postObj)


            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.headers = {
                "Content-Type": "multipart/form-data",
            };

            axios.post('https://8e78-41-186-143-119.eu.ngrok.io/register/', postObj).then((res) => {
                if (res.data.code == 200) {
                    alert('Your are succesfully register Please login with you credentials')
                    navigation.navigate('Login')
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

                <View style={{ marginTop: 20, alignItems: "center", flexDirection: "row",backgroundColor:'red',paddingBottom:20 }}>
                    <TouchableOpacity style={{ width: "15%", alignItems: "flex-end", marginTop: 10, marginLeft: -20 }}
                        onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                    
                    <View style={{ width: "75%",alignItems:"center"}}>
                        <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20,color:'white' }}>Recipients
                        </Text>
                    </View>

                    <TouchableOpacity style={{ width: "10%", justifyContent: "flex-start", marginTop: 10 }}
                        onPress={() => navigation.navigate('RecRegister')}>
                            <Icon name="plus" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>

                <ScrollView>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <View  style={{flexDirection:'row',width:'80%', height: 130, backgroundColor: '#E0E0E0',  position: 'relative', margin: 10,  borderRadius: 8 }}>
                    <View style={{padding:20,width:'52%'}}>
                        <Text>Urbain Mutangana</Text>
                        <Text style={{marginTop:8,fontSize:18,fontWeight: "bold"}}>Blood type: A+</Text>
                        <Text style={{marginTop:8,fontSize:16}}>Address: Kigali</Text>
                    </View>
                    <View style={{padding:20,width:'48%',}}>
                    <Text>Age:30</Text>
                    <Text style={{marginTop:8,}}><Icon
                        name="phone"
                        color="red"
                        size={20}
                        style={[styles.icon, { marginLeft: 10 }]}
                    /> 0781269507</Text>
                    </View>
                </View>
                </View>
                </ScrollView>

        </>
    );
};


export default Recipients
;

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