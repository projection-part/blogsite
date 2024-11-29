import React from 'react';
import Profilecmp from '../components/profile';


const isLoggedIn = !!localStorage.getItem('token');

const Profile = () => {
  return (
    <>
      <Profilecmp />
    </>
    
  )
}

export default Profile;