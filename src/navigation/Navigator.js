import React, { useState, useEffect, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    ActivityIndicator,
    View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../screens/Login';
import Register from '../screens/Register';
import RecRegister from '../screens/RecRegister';
import { AuthContext } from '../context/Context';
import axios from 'axios';
import  {Dashboard}  from '../screens/Dashboard';
import Donors from '../screens/Donors';
import Recipients from '../screens/Recipients';
import  {RecDashboard}  from '../screens/RecDashboard';
import Requests from '../screens/Requests';
import Donate from '../screens/Donate';
import { Donor } from '../screens/Donor';
import Settings from '../screens/Settings';
//SCREENS



const Stack = createStackNavigator();
const screenOptionStyle = {
    headerShown: false
}

const HomeStackNavigator = (props) => {
    const initialState = {
        isLoading: true,
        userToken: null,
        redirect_page: '',

    }

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    redirect_page: action.redirect_page,
                    isLoading: false
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userToken: action.token,
                    redirect_page: action.redirect_page,
                    isLoading: false
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userToken: null,
                    redirect_page: null,
                    isLoading: false
                };
        }
    }

    const [loginState, dispatch] = React.useReducer(loginReducer, initialState)

    const authContext = useMemo(() => ({
        signIn: async (userName, password) => {
            // setUserToken('kdjf');
            // setIsLoading(false)

            const postObj = {
                phone: userName,
                password: password
            }




            await axios.post("https://0315-41-186-143-119.eu.ngrok.io/user_login/", postObj)
                .then(res => {

                    if (res.data.status === 'success') {
                        console.log(res.data)

                        const items = [['userToken', res.data.token],
                        ['redirect_page', res.data.user_type],
                        ]
                        AsyncStorage.multiSet(items, () => {
                            console.log('asyncstorage set successfully')
                        });
                        dispatch({
                            type: 'LOGIN',
                            token: res.data.token,
                            redirect_page: res.data.user_type,
                        })

                    }
                    else {
                        alert('Wrong credentials')
                    }
                }).catch((error) => {

                    if (error.response) {
                        console.log(error.response.data);
                        alert('Invalid email or password!')
                    }
                })


        },
        signOut: async () => {

            try {
                await AsyncStorage.multiRemove(["userToken", "redirect_page"]);
            } catch (error) {
                console.log(error)
            }
            dispatch({ type: 'LOGOUT' })
        }
    }), [])

    useEffect(() => {
        setTimeout(async () => {
            // setIsLoading(false);
            let userToken;
            let redirect_page;

            userToken = null;
            redirect_page = null;


            try {
                //  await   AsyncStorage.multiRemove(["userToken", "userName", "email", "redirect_page","properties","tenant_info"]);
                const data = await AsyncStorage.multiGet(["userToken", "redirect_page"]);
                const new_data = data.map(entry => entry[1]);
                userToken = new_data[0]
                redirect_page = new_data[1]

                dispatch({
                    type: 'RETRIEVE_TOKEN',
                    token: userToken,
                    redirect_page: redirect_page,
                })
            } catch (error) {
                console.log(error)
            }

        }, 2000)
    }, [])

    if (loginState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='#000' />
            </View>
        )
    }



    else {
        if (loginState.userToken !== null) {
            if (loginState.redirect_page === 'Admin') {
                return (
                    <AuthContext.Provider value={authContext}>
                        <Stack.Navigator screenOptions={screenOptionStyle} >

                            <Stack.Screen name="Dashboard" component={Dashboard} />
                            <Stack.Screen name="Donors" component={Donors} />
                            <Stack.Screen name="Recipients" component={Recipients} />
                            <Stack.Screen name="RecRegister" component={RecRegister} />
                            <Stack.Screen name="Requests" component={Requests} />
                            <Stack.Screen name="Donate" component={Donate} />
                            <Stack.Screen name="Donor" component={Donor} />
                            <Stack.Screen name="Settings" component={Settings} />

                        </Stack.Navigator>
                    </AuthContext.Provider>

                );
            }
            else if (loginState.redirect_page === 'Recipient') {
                return (
                    <AuthContext.Provider value={authContext}>
                        <Stack.Navigator screenOptions={screenOptionStyle} >

                            <Stack.Screen name="RecDashboard" component={RecDashboard} />
                            <Stack.Screen name="Settings" component={Settings} />
                            {/* <Stack.Screen name="Donors" component={Donors} />
                            <Stack.Screen name="Recipients" component={Recipients} />
                            <Stack.Screen name="RecRegister" component={RecRegister} />
                            <Stack.Screen name="Requests" component={Requests} />
                            <Stack.Screen name="Donate" component={Donate} />
                            <Stack.Screen name="Donor" component={Donor} /> */}
                            {/* MANAGER */}




                        </Stack.Navigator>
                    </AuthContext.Provider>

                );
            }

        }
        else {
            return (
                <AuthContext.Provider value={authContext}>
                    <Stack.Navigator screenOptions={screenOptionStyle} >
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </Stack.Navigator>
                </AuthContext.Provider>
            )
        }
    }
}

export default HomeStackNavigator;