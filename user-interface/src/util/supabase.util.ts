import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const getScores = async () => {
    try {
        const correct = await supabase
            .from('trivia')
            .select('*', { count: 'exact', head: true })
            .eq('is_correct', true);
        const incorrect = await supabase
            .from('trivia')
            .select('*', { count: 'exact', head: true })
            .eq('is_correct', false);
        return {
            correct: correct.count,
            incorrect: incorrect.count,
        };
    } catch (error) {
        console.error(error);
        return {
            correct: 0,
            incorrect: 0,
        }
    }
}

export const scoreChannel = (callback: Function) => {
    return supabase
        .channel('trivia-realtime')
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'trivia',
        }, 
        () => callback()
    );
}

export default supabase;