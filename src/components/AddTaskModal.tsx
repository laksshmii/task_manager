import { Modal, TextInput, Textarea, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAppDispatch } from '../store/hooks'
import { addTask } from '../features/tasks/tasksSlice'
import { DateInput } from '@mantine/dates';


interface AddTaskModalProps {
  opened: boolean
  onClose: () => void
}

export function AddTaskModal({ opened, onClose }: AddTaskModalProps) {
  const dispatch = useAppDispatch()

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      dueDate: '',
    },
    validate: {
      title: (value) => (value.trim().length < 3 ? 'Title is too short' : null),
      dueDate: (value) => (!value ? 'Due date is required' : null),
    },
  })

  const handleSubmit = (values: typeof form.values) => {
    dispatch(addTask(values))
    form.reset()
    onClose()

  }

  return (
    <Modal opened={opened} onClose={onClose} title="Add New Task">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter task title"
          {...form.getInputProps('title')}
          mb="md"
          withAsterisk
        />

        <Textarea
          label="Description"
          placeholder="Enter task description"
          {...form.getInputProps('description')}
          mb="md"
          withAsterisk
        />

        <DateInput
          label="Due Date"
          placeholder="Select due date"
          {...form.getInputProps('dueDate')}
          mb="md"
          withAsterisk
        />

        <Button type="submit" fullWidth>
          Add Task
        </Button>
      </form>
    </Modal>
  )
}