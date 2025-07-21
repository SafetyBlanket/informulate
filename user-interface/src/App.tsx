import { Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router';
import { LandingPage, GamePage } from './pages';

function App() {

  return (
    <Box className="w-full h-full flex flex-col items-center justify-center">
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Box>
  )
}

export default App
