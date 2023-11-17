import { Message, NewMessage } from '@/type'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '../definitions/http/axiosinstance'

const getReceivedMessages = async (
  id: number
): Promise<AxiosResponse<Array<Message>>> => {
  const response = await axiosInstance.get<Array<Message>>(
    `/Message/received/${id}`
  )
  return response
}

const getSentMessages = async (
  id: number
): Promise<AxiosResponse<Array<Message>>> => {
  const response = await axiosInstance.get<Array<Message>>(
    `/Message/sent/${id}`
  )
  return response
}

const sendMessage = async (message: NewMessage) => {
  return axiosInstance.post<Message>('/Message/add', {
    messageSenderId: message.messageSenderId,
    messageReceiverId: message.messageReceiverId,
    messageContent: message.messageContent,
    messageSubject: message.messageSubject,
  })
}

const changeStatus = async (messageId: number) => {
  return axiosInstance.put<Message>(`/Message/changeStatus/${messageId}`)
}

const deleteMessage = async (messageId: number) => {
  return axiosInstance.delete<Message>(`/Message/delete/${messageId}`)
}

export {
  changeStatus,
  deleteMessage,
  getReceivedMessages,
  getSentMessages,
  sendMessage,
}
