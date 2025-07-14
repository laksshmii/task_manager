// src/features/tasks/task.ts

export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
}

export type FilterType = 'all' | 'completed' | 'pending';
