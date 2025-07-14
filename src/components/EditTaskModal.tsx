import { Modal, TextInput, Textarea, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAppDispatch } from '../store/hooks'
import { editTask } from '../features/tasks/tasksSlice'
import type { Task } from '../features/tasks/task'
import { DateInput } from '@mantine/dates';

interface EditTaskModalProps {
    task: Task
    onClose: () => void
}

export function EditTaskModal({ task, onClose }: EditTaskModalProps) {
    const dispatch = useAppDispatch()

    const form = useForm({
        initialValues: {
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
        },
        validate: {
            title: (value) => (value.trim().length < 3 ? 'Title is too short' : null),
        },
    })

    const handleSubmit = (values: typeof form.values) => {
        dispatch(editTask({
            ...task,
            ...values
        }))
        onClose()
    }

    return (
        <Modal opened={true} onClose={onClose} title="Edit Task">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Title"
                    placeholder="Enter task title"
                    {...form.getInputProps('title')}
                    mb="md"
                />

                <Textarea
                    label="Description"
                    placeholder="Enter task description"
                    {...form.getInputProps('description')}
                    mb="md"
                />

                <DateInput
                    label="Due Date"
                    placeholder="Select due date"
                    {...form.getInputProps('dueDate')}
                    mb="md"
                />

                <Button type="submit" fullWidth>
                    Save Changes
                </Button>
            </form>
        </Modal>
    )
}