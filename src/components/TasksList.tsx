import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <TaskItem editTask={editTask} toggleTaskDone={toggleTaskDone} removeTask={removeTask} item={item} index={index} />
      )}
      style={{
        marginTop: 32
      }}
    />
  )
}
