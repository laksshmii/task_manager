import { Paper, Text, LoadingOverlay, useMantineTheme } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchQuote } from '../features/quotes/quotesSlice';
import { useEffect } from 'react';

export function Quote() {
    const dispatch = useAppDispatch();
    const { content, author, status } = useAppSelector((state) => state.quotes);

    useEffect(() => {
        dispatch(fetchQuote());
    }, [dispatch]);

    if (status === 'loading') {
        return <LoadingOverlay visible />;
    }

    return (
        <Paper
            p="md"
            mb="xl"
            radius="md"
            shadow="sm"
            style={{
                backgroundColor: useMantineTheme().colors.gray[0],
                color: useMantineTheme().colors.gray[8],
            }}
        >
            <Text ta="center" size="lg">
                {status === 'failed'
                    ? '"The only way to do great work is to love what you do." — Steve Jobs'
                    : `"${content}" — ${author}`}
            </Text>
        </Paper>
    );
}