import React, { useReducer, useRef, useState } from 'react';
import { Alert, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ItemWrapper } from './ItemWrapper';
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png'

interface TaskItemData {
    index: number
    item: Task
    toggleTaskDone: (id: number) => void
    removeTask: (id: number) => void
    editTask: (id: number, newTitle: string) => void
}

export function TaskItem({ index, item, toggleTaskDone, removeTask, editTask }: TaskItemData) {
    const [editingTask, toggleEditingTask] = useReducer(editingTask => !editingTask, false)
    const [taskTitle, setTaskTitle] = useState(item.title)
    const inputRef = useRef<TextInput>({} as TextInput)

    function handleEditTask() {
        toggleEditingTask()
        setTimeout(() => inputRef.current.focus(), 100)
    }

    function handleCancelEditTask() {
        setTaskTitle(item.title)
        toggleEditingTask()
    }

    function handleSubmitEditTask() {
        editTask(item.id, taskTitle)
        toggleEditingTask()
        inputRef?.current.blur()
    }

    function handleRemoveTask() {

        Alert.alert(
            'Atenção!', 
            'Você deseja excluir esta tarefa?', 
            [{text: 'Sim', onPress: () => removeTask(item.id)}, {text: 'Não'}]
        )
    }

    return (
        <ItemWrapper index={index}>
            <View>
                <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => editingTask ? null : toggleTaskDone(item.id)}
                >
                    <View 
                        testID={`marker-${index}`}
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        { item.done && (
                        <Icon 
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                        )}
                    </View>

                    <TextInput 
                        style={item.done ? styles.taskTextDone : styles.taskText}
                        editable={editingTask}
                        ref={inputRef}
                        onChangeText={setTaskTitle}
                        onSubmitEditing={handleSubmitEditTask}
                        value={taskTitle}
                    />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', paddingHorizontal: 24}}>
                {
                    !item.done && (
                        <TouchableOpacity
                            testID={`edit-${index}`}
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={editingTask ? handleCancelEditTask : handleEditTask}
                        >
                            <Icon 
                                name={editingTask ? "x" : "edit"}
                                size={18}
                                color={editingTask ? "red" : "#c3c3c3"}
                            />
                        </TouchableOpacity>
                    )
                }              
                {
                    !editingTask && (
                        <TouchableOpacity
                            testID={`trash-${index}`}
                            style={{ marginLeft: 15 }}
                            onPress={handleRemoveTask}
                        >
                            <Image source={trashIcon} />
                        </TouchableOpacity>
                    )
                }
            </View>
        </ItemWrapper>
    );
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })