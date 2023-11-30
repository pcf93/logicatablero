import { ChangeUser, RegisterUser, User } from '@/type'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '../definitions/http/axiosinstance'

function getCookie(cname: string) {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

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

const updateUser = async (user: ChangeUser, id: number) => {
  return axiosInstance.put<User>(`/update/${id}`, {
    userName: user.userNickname,
    userOldPassword: user.userOldPassword,
    userNewPassword: user.userNewPassword,
    userEmail: user.userEmail,
    userPhone: user.userPhone,
    userBirthDate: user.userBirthDate,
    userCity: user.userCity,
  },
  {
    headers: {
      Authorization: `Bearer ${getCookie('JWT')}`,
    },
  }
  )
}

const deleteUser = async (id: number) => {
  return axiosInstance.delete<User>(`/delete/${id}`,
  {
    headers: {
      Authorization: `Bearer ${getCookie('JWT')}`,
    },
  })
}

export { getIdByName, getUser, loginUser, getUserInfo, registerUser, updateUser, deleteUser }
