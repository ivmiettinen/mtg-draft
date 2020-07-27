import axios from "axios";


const baseUrl = "http://localhost:3003/api/mtg/playerAmount";

const create = (newObject) => {
 
  const request = axios.post(baseUrl, newObject);
  request.then((response) => console.log(response.data))
  return request.then((response) => response.data);
};




export default { create };
