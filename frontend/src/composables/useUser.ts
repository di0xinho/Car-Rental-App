import { ref } from "vue";
import type { UserData } from "@/utilities/userModel";
import { User } from "@/utilities/userModel";

const user = ref<User|null>(null);
const userData = ref<UserData|null>(null);

function fetchUser () {
  // fetch user from backend if user is authenticated returns User else 401 Unauthorized
  console.log('Trying to Fetch User');
}

function loginUser (
  email: string,
  password: string,
  rememberMe = false
) {
  console.log('Loging User');
  // Here we request backend with user credentials, in return we get User or 404 Not Found
  if (email === 'admin@admin.com' && password === 'admin') {
    user.value = {
      _id: "1klhr45nbd6tfd",
      name: "Janek1988",
      email: "kowalski@gmail.com",
      firstName: "Jan",
      surname: "Kowalski",
      phoneNumber: "111-222-333",
      dateOfBirth: "1988-04-24",
      gender: "male",
      favorites: [],
      avatar: "default_user.webp"
    };
  } else {
    user.value = null;
  }
}

function signinNewUser (
  name: string,
  firstName: string, 
  surname: string,
  email: string,
  password: string,
  confirmPassword: string 
) {
  // Here we request backend with user credentials, in return we get User or 404 Not Found
  console.log('Signing In New User');
}

function logoutUser () {
  // Send logout request to backend API
  user.value = null;
  userData.value = null;
}

function fetchUserData (userId: string) {
  console.log('Fetching User Data.');
}

export default function useUser() {
  return {
    user,
    userData,
    fetchUser,
    loginUser,
    signinNewUser,
    logoutUser,
    fetchUserData
  };
}