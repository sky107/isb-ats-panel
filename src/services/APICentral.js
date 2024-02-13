import axios from 'axios';

// const API_CENTRAL_URL='https://ratifiserver.onrender.com'

// DEV
// const API_CENTRAL_URL='https://4kmtkz4pcv.us-east-1.awsapprunner.com';
const API_CENTRAL_URL='http://localhost:3000'
// const API_CENTRAL_URL='https://6cqpau3hwt.us-east-1.awsapprunner.com'
 // Same 


const http=axios.create({
    baseURL:API_CENTRAL_URL
})

export default http;