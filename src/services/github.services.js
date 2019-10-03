import axios from 'axios'

const baseUrl = 'https://api.github.com'

export const getReposByUser = async user => {
  return await axios.get(`${baseUrl}/users/${user}/repos`)
}

export const getStarredByUser = async user => {
  return await axios.get(`${baseUrl}/users/${user}/starred`)
}

export const getUserProfile = async user => {
  return await axios.get(`${baseUrl}/users/${user}`)
}
