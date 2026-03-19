import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Task } from "../types/task";

const STORAGE_KEY = "@todo_app_tasks";

const defaultTasks: Task[] = [
  {
    id: crypto.randomUUID(),
    text: "Make A list displaying 3 default to-do items",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    text: "Make an input field to add new tasks",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    text: "A button to submit new items",
    completed: false,
  },
];

export function useTodos() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        } else {
          setTasks(defaultTasks);
        }
      } catch (e) {
        console.error("Failed to load tasks", e);
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    } catch (e) {
      console.error("Failed to save tasks", e);
    }
  };

  const addTask = () => {
    if (taskText.trim() === "") return;
    const newTasks = [
      { id: crypto.randomUUID(), text: taskText, completed: false },
      ...tasks,
    ];
    setTasks(newTasks);
    saveTasks(newTasks);
    setTaskText("");
  };

  const toggleTask = (id: string) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  return {
    taskText,
    setTaskText,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
}
