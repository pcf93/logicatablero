import { MatchMessage, NewMatchMessage } from '@/type'
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

const getMatchMessages = async (
  id: number
): Promise<AxiosResponse<Array<MatchMessage>>> => {
  const response = await axiosInstance.get<Array<MatchMessage>>(
    `/MatchMessage/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getCookie('JWT')}`,
      },
    }
  )
  return response
}

const getLastReceivedMatchMessage = async (
    matchId: number,
    userId: number
  ): Promise<AxiosResponse<MatchMessage>> => {
    const response = await axiosInstance.get<MatchMessage>(
      `/MatchMessage/${matchId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${getCookie('JWT')}`,
        },
      }
    )
    return response
  }

const sendMatchMessage = async (message: NewMatchMessage) => {
  return axiosInstance.post<MatchMessage>('/MatchMessage/add', {
    messageSenderId: message.messageSenderId,
    matchId: message.matchId,
    matchMessageContent: message.content
  },
  {
    headers: {
      Authorization: `Bearer ${getCookie('JWT')}`,
    },
  })
}

export {
  getMatchMessages,
  getLastReceivedMatchMessage,
  sendMatchMessage
}