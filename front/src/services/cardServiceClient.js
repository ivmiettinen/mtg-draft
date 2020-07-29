import axios from "axios";


const baseUrl = "http://localhost:3003/api/mtg/";

const createNumber = (newObject) => {
 
  const request = axios.post(baseUrl+'playerAmount', newObject);
  request.then((response) => console.log(response.data))
  return request.then((response) => response.data);
};

const createPlayer = (newObject) => {
 
  const request = axios.post(baseUrl+'/playerRegister', newObject);
  request.then((response) => console.log(response.data))
  return request.then((response) => response.data);
};


// "http://localhost:3003/api/mtg/playerAmount"

export default { createNumber, createPlayer };
