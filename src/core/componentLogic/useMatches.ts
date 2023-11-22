import { Match } from '@/type'
import { ref } from 'vue'
import {
  getActiveMatches
  
} from '../services/APIMatchRequests'

const activeMatchesList = ref<Array<Match>>([])
const activeMatchId = ref<number>(0)
const match = ref<Match | null>()

export function useMatches() {
  async function setActiveMatches(userId: number) {
    try {
      const response = await getActiveMatches(userId)
      activeMatchesList.value = []
      response.data.forEach((match: Match) => {
        activeMatchesList.value.push(match)
      })
      if (response.status === 400) {
        activeMatchesList.value = []
      }
    } catch (error) {
      activeMatchesList.value = []
    }
  }

  
  return {
    activeMatchesList,
    activeMatchId,
    match,
    setActiveMatches
  }
}
