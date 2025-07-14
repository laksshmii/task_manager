import { Table, Badge, Checkbox, ActionIcon, Group, Text, Select, TextInput, Flex } from '@mantine/core';
import { IconTrash, IconEdit, IconSearch, IconCheck, IconCircleCheck, IconClock } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteTask, toggleTask, setFilter, setSearchQuery } from '../../features/tasks/tasksSlice';
import dayjs from 'dayjs';
import { useState } from 'react';
import { EditTaskModal } from '../EditTaskModal';
import { notifications } from '@mantine/notifications';
import type { Task } from '../../features/tasks/task';
import { useTheme } from '../../ThemeContext';


export function TaskTable() {
    const dispatch = useAppDispatch();
    const { tasks, filter, searchQuery } = useAppSelector((state) => state.tasks);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const { darkMode } = useTheme();
    const handleToggleTask = (taskId: string, taskTitle: string, isCompleted: boolean) => {
        dispatch(toggleTask(taskId));
        notifications.show({
            title: 'Task Updated',
            message: `"${taskTitle}" marked as ${isCompleted ? 'pending' : 'completed'}`,
            icon: <IconCheck size="1.1rem" />,
            color: isCompleted ? 'blue' : 'teal',
            autoClose: 3000,
        });
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'completed' && task.completed) ||
            (filter === 'pending' && !task.completed);

        const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesFilter && matchesSearch;
    });

    return (
        <>
            <Flex justify="space-between" mb="md" gap="md">
                <TextInput
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    style={{ flex: 1, width: '50%' }}

                />

                <Select
                    value={filter}
                    onChange={(value) => dispatch(setFilter(value as 'all' | 'completed' | 'pending'))}
                    data={[
                        { value: 'all', label: 'All Tasks' },
                        { value: 'pending', label: 'Pending' },
                        { value: 'completed', label: 'Completed' },
                    ]}
                    style={{ width: 180 }}
                />
            </Flex>

            <Table striped highlightOnHover verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr >
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Task</Table.Th>
                        <Table.Th>Due Date</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {filteredTasks.map((task) => (
                        <Table.Tr key={task.id} className={darkMode ? 'dark-row' : ''}>
                            <Table.Td>
                                <Flex align="center" gap="sm">
                                    <Checkbox
                                        checked={task.completed}
                                        onChange={() => handleToggleTask(task.id, task.title, task.completed)}
                                        color="teal"
                                        size="md"
                                    />
                                    <Badge
                                        color={task.completed ? 'teal' : 'orange'}
                                        variant={darkMode ? 'filled' : 'light'}
                                        leftSection={task.completed ?
                                            <IconCircleCheck size="0.8rem" /> :
                                            <IconClock size="0.8rem" />}
                                    >
                                        {task.completed ? 'Completed' : 'Pending'}
                                    </Badge>
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Text fw={500} c={task.completed ? 'dimmed' : undefined}>
                                    {task.title}
                                </Text>
                                {task.description && (
                                    <Text size="sm" c="dimmed">
                                        {task.description}
                                    </Text>
                                )}
                            </Table.Td>
                            <Table.Td>
                                <Text>
                                    {dayjs(task.dueDate).format('MMM D, YYYY')}
                                </Text>
                                <Text size="xs" c="dimmed">
                                    {dayjs(task.dueDate).format('MMM D, YYYY')}
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Group  >
                                    <ActionIcon
                                        variant="subtle"
                                        color="blue"
                                        onClick={() => setEditingTask(task)}
                                    >
                                        <IconEdit size={18} />
                                    </ActionIcon>
                                    <ActionIcon
                                        variant="subtle"
                                        color="red"
                                        onClick={() => dispatch(deleteTask(task.id))}
                                    >
                                        <IconTrash size={18} />
                                    </ActionIcon>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                />
            )}
        </>
    );
}