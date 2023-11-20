import { Message, NewMessage } from '@/type'
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

const getReceivedMessages = async (
  id: number
): Promise<AxiosResponse<Array<Message>>> => {
  const response = await axiosInstance.get<Array<Message>>(
    `/Message/received/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getCookie('JWT')}`,
      },
    }
  )
  return response
}

const getSentMessages = async (
  id: number
): Promise<AxiosResponse<Array<Message>>> => {
  const response = await axiosInstance.get<Array<Message>>(
    `/Message/sent/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getCookie('JWT')}`,
      },
    }
  )
  return response
}

const sendMessage = async (message: NewMessage) => {
  return axiosInstance.post<Message>('/Message/add', {
    messageSenderId: message.messageSenderId,
    messageReceiverId: message.messageReceiverId,
    messageContent: message.messageContent,
    messageSubject: message.messageSubject,
  },
  {
    headers: {
      Authorization: `Bearer ${getCookie('JWT')}`,
    },
  })
}

const changeStatus = async (messageId: number) => {
  return axiosInstance.put<Message>(`/Message/changeStatus/${messageId}`,
  {},
  {
    headers: {
      Authorization: `Bearer ${getCookie('JWT')}`,
    },
  })
}

const deleteMessage = async (messageId: number) => {
  return axiosInstance.delete<Message>(`/Message/delete/${messageId}`,
  {
    headers: {
      Authorization: `Bearer ${getCookie('JWT')}`,
    },
  })
}

export {
  changeStatus,
  deleteMessage,
  getReceivedMessages,
  getSentMessages,
  sendMessage,
}
