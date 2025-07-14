import { createSlice,  } from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type { Task, FilterType } from './task'
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/storage'

const initialState = {
    tasks: loadFromLocalStorage<Task[]>('tasks') || [],
    filter: 'all' as FilterType,
    searchQuery: '',
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'completed'>>) => {
            const newTask = {
                ...action.payload,
                id: crypto.randomUUID(),
                completed: false,
            }
            state.tasks.push(newTask)
            saveToLocalStorage('tasks', state.tasks)
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
            saveToLocalStorage('tasks', state.tasks)
        },
        toggleTask: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find(task => task.id === action.payload)
            if (task) {
                task.completed = !task.completed
                saveToLocalStorage('tasks', state.tasks)
            }
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id)
            if (index !== -1) {
                state.tasks[index] = action.payload
                saveToLocalStorage('tasks', state.tasks)
            }
        },
        setFilter: (state, action: PayloadAction<FilterType>) => {
            state.filter = action.payload
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
        },
    },
})

export const {
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    setFilter,
    setSearchQuery
} = tasksSlice.actions

export default tasksSlice.reducer