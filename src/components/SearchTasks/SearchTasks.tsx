import { TextInput, Group, SegmentedControl } from '@mantine/core'
import { useAppDispatch } from '../../store/hooks'
import { setFilter, setSearchQuery } from '../../features/tasks/tasksSlice'

export function SearchTasks() {
    const dispatch = useAppDispatch()

    return (
        <Group mb="xl" grow>
         
            <SegmentedControl
                data={[
                    { label: 'All', value: 'all' },
                    { label: 'Completed', value: 'completed' },
                    { label: 'Pending', value: 'pending' },
                ]}
                onChange={(value) => dispatch(setFilter(value as any))}
            />
        </Group>
    )
}