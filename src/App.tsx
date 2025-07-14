import { useState } from 'react'
import { AppShell, Button, Group, ActionIcon } from '@mantine/core'
import { TaskTable } from './components/TaskTable/TaskTable'
import { AddTaskModal } from './components/AddTaskModal'
import { SearchTasks } from './components/SearchTasks/SearchTasks'
import { Quote } from './components/Quote'
import { useTheme } from './ThemeContext'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { ThemeProvider } from './ThemeContext'

function AppContent() {
  const [modalOpened, setModalOpened] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <AppShell padding="md">
      <AppShell.Main>
        <Group justify="space-between" mb="xl">
          <h1>Task Manager</h1>
          <Group>
            <ActionIcon
              variant="outline"
              color={darkMode ? 'yellow' : 'blue'}
              onClick={toggleDarkMode}
              title="Toggle color scheme"
            >
              {darkMode ? <IconSun size="1.1rem" /> : <IconMoon size="1.1rem" />}
            </ActionIcon>
            <Button onClick={() => setModalOpened(true)}>Add Task</Button>
          </Group>
        </Group>
        
        <Quote />
        <SearchTasks />
        <TaskTable />
        <AddTaskModal opened={modalOpened} onClose={() => setModalOpened(false)} />
      </AppShell.Main>
    </AppShell>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}