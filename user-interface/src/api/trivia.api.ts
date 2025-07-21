import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE;

export const generateQuestion = async () => {
    return await axios.get(`${baseUrl}/generate-question`);
}

export const submitAnswer = async () => {
    return await axios.post(`${baseUrl}/submit-answer`, {
        name: "Functions"
    });
}