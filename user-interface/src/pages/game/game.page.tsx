import { Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Skeleton, Snackbar, Typography } from "@mui/material";
import { generateQuestion, submitAnswer } from '../../api';
import { useEffect, useState } from "react";
import { useScore } from "../../context/score.context";
import { useNavigate } from "react-router";

const GamePage = () => {
    const navigate = useNavigate();
    const { correct, incorrect } = useScore();
    const [question, setQuestion] = useState<{ question: string, choices: string[] } | null>(null);
    const [answer, setAnswer] = useState<null | string>(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (event: any) => {
        try {
            setLoading(true);
            event.preventDefault();
            event.stopPropagation();
            if (!question?.question || !answer) return;
            const { data: { correct, explanation } } = await submitAnswer(question.question, answer);
            setSnackbar({ open: true, message: `${String(correct).toUpperCase()} - ${explanation}` })
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const loadQuestion = async () => {
        setSnackbar({ open: false, message: '' });
        setQuestion(null);
        setAnswer(null);
        generateQuestion().then(res => setQuestion(res.data));
    }

    useEffect(() => {
        try {
            loadQuestion();
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <Box component="main">
            <Card className="absolute top-4 left-4" onClick={() => navigate('/')}>
                <CardContent>
                    <Box className="text-center">
                        <Typography variant="h6">Live Scoreboard</Typography>
                        <span className="text-green-500 font-bold">{correct}</span>/<span className="text-red-500 font-bold">{incorrect}</span>
                    </Box>
                </CardContent>
            </Card>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={12000}
                onClose={loadQuestion}
                message={snackbar.message}
            />

            {question ?
                <Card component="form" className="w-[650px]" onSubmit={onSubmitHandler}>
                    <CardHeader title="Question" subheader={question.question} />
                    <CardContent>
                        <FormControl disabled={snackbar.open}>
                            <FormLabel>Choices:</FormLabel>
                            <RadioGroup value={answer} onChange={(event) => setAnswer(event.target.value)}>
                                {question.choices.map(choice => (
                                    <FormControlLabel value={choice} control={<Radio />} label={choice} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Box className="w-full flex flex-row-reverse gap-4">
                            <Button variant="contained" loading={loading} disabled={[!answer, snackbar.open, loading].includes(true)} type="submit">Submit</Button>
                            <Button variant="outlined" onClick={loadQuestion} hidden>Generate</Button>
                        </Box>
                    </CardActions>
                </Card> : <Skeleton variant="rounded" width="650px" height="400px" animation="wave" />
            }
        </Box>
    );
}

export default GamePage;