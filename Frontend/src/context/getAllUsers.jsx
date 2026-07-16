import React from 'react'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios'


const getAllUsers = () => {


    const [getUsers, setGetUsers] = useState([]);
    const [loading , setLoading] = useState(false);

    useEffect(()=> {

        const getUsers = async () => {
            setLoading(true);
            try {
                const token = Cookies.get('jwt');
                const response = await axios.get('/api/user/getUserProfile', {
                    withCredentials: 'true',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setGetUsers(response.data.users);  
                setLoading(false);  
                
            } catch (error) {
                console.log("Error = ", error);            
            }     
        }
        getUsers();

    
    }, []) 

  return [getUsers, loading];
}

export default getAllUsers
