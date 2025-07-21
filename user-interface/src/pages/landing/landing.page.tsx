import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useScore } from '../../context/score.context';

const LandingPage = () => {
    const { correct, incorrect } = useScore();
    const navigate = useNavigate();

    return (
        <Box component="main" className="h-full w-full flex flex-col gap-4 items-center justify-center">
            <Card className="w-[700px] text-center" elevation={4}>
                <CardHeader title={<Typography variant="h3" className="font-semibold">AI Trivia Arena</Typography>} />
                <CardContent>
                    <Box className="flex items-center justify-center gap-40">
                        <Box>
                            <Typography className="font-extrabold">Correct</Typography>
                            <Typography className="text-4xl text-green-500 font-extrabold">{correct}</Typography>
                        </Box>
                        <Box>
                            <Typography className="font-extrabold">Incorrect</Typography>
                            <Typography className="text-4xl text-red-500 font-extrabold">{incorrect}</Typography>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions>
                    <Box className="w-full flex items-center justify-center">
                        <Button variant="contained" size="large" onClick={() => navigate('/game')} fullWidth>Start Game</Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
}

export default LandingPage;