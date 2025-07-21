import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE;

export const generateQuestion = async () => {
    return await axios.get<{ question: string, choices: string[] }>(`${baseUrl}/generate-question`);
}

export const submitAnswer = async (question: string, answer: string) => {
    return await axios.post<{ correct: boolean, explanation: string }>(`${baseUrl}/submit-answer`, { question, answer });
}