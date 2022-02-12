import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(newTaskTitle: string) {

    if (tasks.find(task => task.title === newTaskTitle)) {
      return Alert.alert('Atenção', 'Essa task já existe!')
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, newTask])
  }

  function toggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundTask = updatedTasks.find(task => task.id === id)

    if (!foundTask) return

    foundTask.done = !foundTask.done

    setTasks(updatedTasks)

  }

  function editTask (id: number, newTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundTask = updatedTasks.find(task => task.id === id)

    if (!foundTask) return

    foundTask.title = newTitle

    setTasks(updatedTasks)
}

  function removeTask(id: number) {
    setTasks(oldState => oldState.filter(task => task.id != id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={addTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={toggleTaskDone}
        removeTask={removeTask}
        editTask={editTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})