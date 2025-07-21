import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const columns: GridColDef[] = [
    {
        field: 'score',
        headerName: 'Score',
        flex: 1,
    },
    {
        field: 'name',
        headerName: 'Name',
        flex: 2,
    }
];

const LandingPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 3000)
    }, []);


    return (
        <Box component="main" className="h-full w-full flex flex-col gap-4 items-center justify-center">
            <Card className="w-[700px] text-center" elevation={4}>
                <CardHeader title={<Typography variant="h3" className="font-semibold">AI Trivia Arena</Typography>} />
                <CardContent>
                    <DataGrid
                        columns={columns}
                        rows={scores}
                        loading={loading}
                        density="compact"
                        getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'bg-slate-200' : ''}
                        disableRowSelectionOnClick
                        hideFooter
                    />
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