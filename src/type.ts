export type Message = {
  messageId: number
  messageSenderId: number
  messageReceiverId: number
  username: string
  messageSubject: string
  messageDate: string
  isRead: boolean
  messageContent: string
}

export type NewMessage = {
  messageSenderId: number
  messageReceiverId: number
  messageSubject: string
  messageContent: string
}

export type Appointment = {
  id: number
  title: string
  summary: string
  day: string
  month: string
  year: string
  hour: string
  description: string
}

export type User = {
  userId: number
  userNickname: string
  userName: string
  userLastName: string
  userPassword: string
  userEmail: string
  userPhone: string
  userCity: string
  userBirthDate: string
  userPhoto: string
  darkMode: boolean
  userTypeID: number
  userLanguageID: number
}

export type RegisterUser = {
  userNickname: string
  userName: string
  userLastName: string
  userPassword: string
  userEmail: string
  userPhone: string
  userCity: string
  userBirthDate: string
  userPhoto: string
  darkMode: boolean
  userTypeID: number
  userLanguageID: number
}
