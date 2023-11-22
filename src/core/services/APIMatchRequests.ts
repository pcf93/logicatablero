import { Match, SearchMatchmaking } from '@/type'
import axios, { AxiosResponse } from 'axios'
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

const findMatchmakingMatch = async (): Promise<AxiosResponse<Match>> => {
    const response = await axiosInstance.get<Match>(`/Match/findMatchmaking`, 
    {
        headers: {
          Authorization: `Bearer ${getCookie('JWT')}`,
        },
    })
    return response
}

const createMatchmakingMatch = async (matchData: SearchMatchmaking): Promise<AxiosResponse<Match>> => {
    const response = await axiosInstance.post<Match>(`/Match/createMatchmaking`,
    {
        player1Id: matchData.playerId,
        arrayPlayer1: matchData.arrayPlayer
    },
    {
      headers: {
        Authorization: `Bearer ${getCookie('JWT')}`,
      },
    }
    )
    return response
  }

const joinMatchmakingMatch = async (matchData: SearchMatchmaking): Promise<AxiosResponse<Match>> => {
    const response = await axiosInstance.put<Match>(`/Match/joinMatchmaking`,
    {
        player2Id: matchData.playerId,
        arrayPlayer2: matchData.arrayPlayer
    },
    {
        headers: {
          Authorization: `Bearer ${getCookie('JWT')}`,
        },
    }
    )
    return response
}

export {
    findMatchmakingMatch,
    createMatchmakingMatch,
    joinMatchmakingMatch
}