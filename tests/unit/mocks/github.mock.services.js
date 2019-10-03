import reposJson from './data/repos'
import starredJson from './data/starred'
import userJson from './data/user'

export const getReposByUser = async () => {
  return reposJson
}

export const getStarredByUser = async () => {
  return starredJson
}

export const getUserProfile = async () => {
  return userJson
}
