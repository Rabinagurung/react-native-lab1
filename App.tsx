import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

const App = () => {
  const [inputText, setInputText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo: Todo = {
        id: String(Date.now()),
        text: inputText.trim(),
        isCompleted: false
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const handleRemoveTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItemContainer}>
      <View style={styles.todoItem}>
        <TouchableOpacity onPress={() => handleToggleTodo(item.id)}>
          <Ionicons
            name={item.isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={item.isCompleted ? 'green' : 'gray'}
          />
        </TouchableOpacity>
        <Text
          style={[styles.todoText, item.isCompleted && styles.completedText]}>
          {item.text}
        </Text>
        <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
          <Ionicons name='trash' size={24} color='red' />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#5F33E1' }}>
          Todo List
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder='Add a new todo...'
          placeholderTextColor='#888'
        />
        <TouchableOpacity onPress={handleAddTodo}>
          <Ionicons name='add-circle' size={36} color='#5F33E1' />
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        contentContainerStyle={{ padding: 16 }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f0f0f0' // Set a background color to highlight the shadows
  },
  header: {
    height: 80,
    padding: 16,
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 16
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1
  },
  todoItemContainer: {
    marginBottom: 10
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1
  },
  todoText: {
    flex: 1,
    marginLeft: 10
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray'
  }
});

export default App;
