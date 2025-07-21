import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import supabase, { getScores, scoreChannel } from '../util/supabase.util';

type ScoreContext = {
    correct: number,
    incorrect: number,
}

const initial: ScoreContext = {
    correct: 0,
    incorrect: 0,
}

const ScoreContext = createContext<ScoreContext>(initial);

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
    const [scores, setScores] = useState<ScoreContext>(initial);

    const loadScores = async () => {
        getScores()
            .then(count => {
                setScores({ correct: Number(count.correct), incorrect: Number(count.incorrect) });
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        loadScores();
        const channel = scoreChannel(loadScores).subscribe();
        return (() => {
            supabase.removeChannel(channel);
        })
    }, []);

    return (
        <ScoreContext.Provider value={scores}>
            {children}
        </ScoreContext.Provider>
    )
}

export const useScore = () => {
    const context = useContext(ScoreContext);
    return context;
}