import axios from "axios";

import setLinkForPlayers from '../FileGatheringBox'

const baseUrl = "http://localhost:3003/api/mtg/";

const create = (newObject) => {
 
  const request = axios.post(baseUrl, newObject);
  request.then((response) => console.log(response.data))
  return request.then((response) => response.data);
};


// const create = (newObject, vastaus) => {
 
//   const request = axios.post(baseUrl, newObject);
//   request.then((response) => console.log(response.data))
//   return request.then((response) => response.data);
// };



export default { create };
