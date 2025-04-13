import { ref } from "vue";
import { toDayMonthYear, fromDateTimeToDate } from '@/utilities/convertDateFormat';
import type { UserData } from "@/utilities/models/userModel";
import { User } from "@/utilities/models/userModel";

const user = ref<User|null>(null);
const userData = ref<UserData|null>(null);

type Success = {
  message: string,
  success: boolean,
}

async function initializeUser () {
  const response = await fetch(import.meta.env.VITE_API_USER_GET, {
    method: "GET",
    credentials: 'include'
  });
  const responseData = await response.json();
    // If response is success and contains user data set user composable, else set user to null
  if (responseData.success && responseData.data && Object.keys(responseData.data).length !== 0) { 
    console.log(responseData.data);
    // On frontend I use date format in 'date time string format' YYYY-MM-DD. However backend API use DD-MM-YYYY format
    const dateOfBirth = fromDateTimeToDate(responseData.data.dateOfBirth);
    user.value = {...responseData.data, dateOfBirth: dateOfBirth};
  } else {
    user.value = null;
  }
}

async function getUser () {
  const response = await fetch(import.meta.env.VITE_API_USER_GET, {
    method: "GET",
    credentials: 'include'
  });
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  // If response contains user data set user composable
  if (responseData.data && Object.keys(responseData.data).length !== 0) {
    // On frontend I use date format in 'date time string format' YYYY-MM-DD. However backend API use DD-MM-YYYY format
    const dateOfBirth = fromDateTimeToDate(responseData.data.dateOfBirth);
    user.value = {...responseData.data, dateOfBirth: dateOfBirth};
  } else {
    throw new Error('Nie udało się pobrać danych użytkownika.');
  }
  return {success: responseData.success, message: responseData.message} as Success;
}

async function signInNewUser (username: string, email: string, password: string) {
  const response = await fetch(import.meta.env.VITE_API_USER_SIGNIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username, 
      email: email, 
      password: password
    }),
    credentials: 'include'
  });
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as Success;
}

async function logInUser (email: string, password: string) {
  const response = await fetch(import.meta.env.VITE_API_USER_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email, 
      password: password
    }),
    credentials: 'include'
  });
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  // If response contains user data set user composable
  if (responseData.data && Object.keys(responseData.data).length !== 0) {
    // On frontend I use date format in 'date time string format' YYYY-MM-DD. However backend API use DD-MM-YYYY format
    const dateOfBirth = fromDateTimeToDate(responseData.data.dateOfBirth);
    user.value = {...responseData.data, dateOfBirth: dateOfBirth};
  } else {
    throw new Error('Nie udało się pobrać danych użytkownika.');
  }
  return {success: responseData.success, message: responseData.message} as Success;
}

async function logOutUser () {
  const response = await fetch(import.meta.env.VITE_API_USER_DELETE, {
    method: "DELETE",
    credentials: 'include'
  });
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  // If response is success set user to null
  user.value = null;
  return responseData as Success;
}

async function updateUser (firstName: string, surname: string, phoneNumber: string, dateOfBirth: string, gender: string) {
  if(user.value) {
    // On frontend I use date format in 'date time string format' YYYY-MM-DD. However backend API use DD-MM-YYYY format
    const dayMonthYearOfBirth = toDayMonthYear(dateOfBirth);
    if(!dayMonthYearOfBirth) throw new Error('Nieprawidłowa data urodzin.');
  
    const response = await fetch(import.meta.env.VITE_API_USER_UPDATE, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstName, 
        surname: surname,
        phoneNumber: phoneNumber,
        dateOfBirth: dayMonthYearOfBirth,
        gender: gender
      }),
      credentials: 'include'
    });
    const responseData = await response.json();
    console.log(responseData);
    if (!responseData.success) {
      throw new Error(responseData.error);
    }
    // If user data updated successfuly by API set new user data
    user.value.firstName = firstName;
    user.value.surname = surname;
    user.value.phoneNumber = phoneNumber;
    user.value.dateOfBirth = dateOfBirth;
    user.value.gender = gender;

    return responseData as Success;
  } else {
    throw new Error('Użytkownik nie istnieje.');
  }
}

function fetchUserData (userId: string) {
  console.log('Fetching User Data.');
}

export default function useUser() {
  return {
    user,
    userData,
    initializeUser,
    getUser,
    signInNewUser,
    logInUser,
    logOutUser,
    updateUser,
    fetchUserData
  };
}