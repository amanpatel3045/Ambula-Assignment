import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  Text,
  Checkbox,
  IconButton,
  useToast,
  CircularProgress,
} from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const TaskList = () => {
  const toast = useToast();
  const [tasks, setTasks] = useState([]); // State for storing tasks
  const [newTask, setNewTask] = useState(''); // State for the input value of new task
  const [editingTaskId, setEditingTaskId] = useState(null); // State for the ID of the task being edited
  const [editedTaskName, setEditedTaskName] = useState(''); // State for the name of the task being edited
  const [loading, setLoading] = useState(false); // State for indicating whether data is being loaded

  useEffect(() => {
    setLoading(true);
    const storedTasks = localStorage.getItem('tasks'); // Retrieve tasks from local storage
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // Set tasks state with the parsed value from local storage
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage whenever tasks state changes
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: Date.now(),
        name: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]); // Add new task to the existing tasks array
      setNewTask(''); // Reset the newTask state to an empty string
      toast({
        title: 'Task Added',
        description: 'The task has been successfully added.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks); // Update tasks state with the updated array
  };

  const handleRemoveTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks); // Update tasks state with the filtered array
    toast({
      title: 'Task Removed',
      description: 'The task has been successfully removed.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEditTask = (taskId, taskName) => {
    setEditingTaskId(taskId); // Set the editingTaskId state with the provided taskId
    setEditedTaskName(taskName); // Set the editedTaskName state with the current task's name
  };

  const handleSaveTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, name: editedTaskName } : task
    );
    setTasks(updatedTasks); // Update tasks state with the updated array
    setEditingTaskId(null); // Reset editingTaskId state to null
    setEditedTaskName(''); // Reset editedTaskName state to an empty string
    toast({
      title: 'Task Updated',
      description: 'The task has been successfully updated.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const totalTasks = tasks.length; // Total number of tasks in the tasks array
  const completedTasks = tasks.filter((task) => task.completed).length; // Number of completed tasks

  return (
    <Box py={4}>
      <VStack align="flex-start" spacing={4} maxW="400px" mx="auto">
        <Heading as="h2" size="lg">
          To-Do List
        </Heading>

        <Box textAlign="left" w="100%">
          <Text fontSize="lg">
            Total Tasks: <Text as="span">{totalTasks}</Text>
          </Text>
          <Text fontSize="lg">
            Completed Tasks: <Text as="span">{completedTasks}</Text>
          </Text>
        </Box>

        <Input
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleAddTask}>
          Add Task
        </Button>

        {loading ? (
          <CircularProgress isIndeterminate color="teal.500" />
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <Box
              key={task.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              w="100%"
              borderWidth="1px"
              borderRadius="md"
              p={3}
            >
              {editingTaskId === task.id ? ( // If the task is being edited
                <>
                  <Input
                    value={editedTaskName}
                    onChange={(e) => setEditedTaskName(e.target.value)}
                  />
                  <IconButton
                    icon={<FaSave />}
                    aria-label="Save Task"
                    onClick={() => handleSaveTask(task.id)}
                  />
                </>
              ) : (
                <>
                  <Checkbox
                    isChecked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                  >
                    <Text
                      as={task.completed ? 's' : 'span'}
                      textDecoration={task.completed ? 'line-through' : 'none'}
                    >
                      {task.name}
                    </Text>
                  </Checkbox>
                  <IconButton
                    icon={<FaEdit />}
                    aria-label="Edit Task"
                    onClick={() => handleEditTask(task.id, task.name)}
                  />
                  <IconButton
                    icon={<FaTrash />}
                    aria-label="Delete Task"
                    onClick={() => handleRemoveTask(task.id)}
                  />
                </>
              )}
            </Box>
          ))
        ) : (
          <Text>No tasks yet. Add a task above.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default TaskList;
