import { User, FriendRequest, NewRequest } from '@/type'
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

const getContacts = async (
    id: number
  ): Promise<AxiosResponse<Array<FriendRequest>>> => {
    const response = await axiosInstance.get<Array<FriendRequest>>(
      `/FriendRequest/friends/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getCookie('JWT')}`,
        },
      }
    )
    return response
  }

  const getContactRequests = async (id: number): Promise<AxiosResponse<Array<FriendRequest>>> => {
    const response = await axiosInstance.get<Array<FriendRequest>>(`/FriendRequest/friendRequests/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getCookie('JWT')}`,
      },
    }
    )
    return response
  }

  const sendContactRequest = async (request: NewRequest) => {
    return axiosInstance.post<FriendRequest>('/FriendRequest/addFriendRequest', {
      friendRequestReceiverId: request.friendRequestReceiverId,
      friendRequestSenderId: request.friendRequestSenderId
    },
    {
      headers: {
        Authorization: `Bearer ${getCookie('JWT')}`,
      },
    })
  }

  const acceptContactRequest = async (id: number) => {
    return axiosInstance.put<FriendRequest>(`/FriendRequest/accept/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getCookie('JWT')}`,
      },
    })
  }

  const deleteContactRequest = async (id: number) => {
    return axiosInstance.delete<FriendRequest>(`/FriendRequest/refuse/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getCookie('JWT')}`,
      },
    })
  }

  export {
    getContacts,
    getContactRequests,
    sendContactRequest,
    acceptContactRequest,
    deleteContactRequest
  }

