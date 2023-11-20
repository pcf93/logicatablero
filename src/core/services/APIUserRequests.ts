import { RegisterUser, User } from '@/type'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '../definitions/http/axiosinstance'

const getUser = async (id: number) => {
  return axiosInstance.get<User>(`/users/${id}`)
}

const getIdByName = async (name: string) => {
  return axiosInstance.get<number>(`/users/userName/${name}`)
}

const getUserInfo = async (email: string) => {
  return axiosInstance.get<User>(`/users/email`)
}

const loginUser = async (
  name: string,
  password: string
): Promise<AxiosResponse<string>> => {
  return axiosInstance.post<string>('/login', {
    userName: name,
    userPassword: password,
  })
}

const registerUser = async (user: RegisterUser) => {
  return axiosInstance.post<User>('/register', {
    userName: user.userName,
    userPassword: user.userPassword,
    userEmail: user.userEmail,
    userPhone: user.userPhone,
    userBirthDate: user.userBirthDate,
    userCity: user.userCity,
  })
}

export { getIdByName, getUser, loginUser, getUserInfo, registerUser }
