import axios from 'axios'

export const getReposByUser = async user => {
  return await axios.get(`https://api.github.com/users/${user}/repos`)
}

export const getStarredByUser = async user => {
  return await axios.get(`https://api.github.com/users/${user}/starred`)
}

export const getUserProfile = async user => {
  return await axios.get(`https://api.github.com/users/${user}`)
}
