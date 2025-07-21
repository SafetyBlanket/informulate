import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { generateQuestion, submitAnswer } from '../../api';

const GamePage = () => {


    const onSubmitAnswerHandler = async () => {
        await submitAnswer();
    }

    const generateQuestionHandler = async () => {
        await generateQuestion();
    }

    return (
        <Box component="main">
            <Card className="absolute top-4 left-4">
                <CardContent>
                    <Box className="text-center">
                        <Typography variant="h6">Live Scoreboard</Typography>
                        <span className="text-green-500 font-bold">0</span>/<span className="text-red-500 font-bold">0</span>
                    </Box>
                </CardContent>
            </Card>

            <Card className="w-[650px]">
                <CardHeader title="Question" subheader="What is this?" />
                <CardContent>
                </CardContent>
                <CardActions>
                    <Box className="w-full flex flex-row-reverse">
                        <Button variant="contained" onClick={onSubmitAnswerHandler}>Submit</Button>
                        <Button variant="contained" onClick={generateQuestionHandler}>Generate</Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
}

export default GamePage;