import { RegisterUser, User } from '@/type'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '../definitions/http/axiosinstance'

const getUser = async (id: number) => {
  return axiosInstance.get<User>(`/Login/users/${id}`)
}

const getIdByEmail = async (email: string) => {
  return axiosInstance.get<number>(`/Login/users/email/${email}`)
}

const loginUser = async (
  name: string,
  password: string
): Promise<AxiosResponse<User>> => {
  return axiosInstance.post<User>('/Login/login', {
    userName: name,
    userPassword: password,
  })
}

const registerUser = async (user: RegisterUser) => {
  return axiosInstance.post<User>('/Login/register', {
    userNickname: user.userNickname,
    userPassword: user.userPassword,
    userName: user.userName,
    userLastName: user.userLastName,
    userEmail: user.userEmail,
    userPhone: user.userPhone,
    userBirthDate: user.userBirthDate,
    userCity: user.userCity,
    darkMode: user.darkMode,
    userLanguageId: user.userLanguageID,
    userTypeId: user.userTypeID,
  })
}

export { getIdByEmail, getUser, loginUser, registerUser }
