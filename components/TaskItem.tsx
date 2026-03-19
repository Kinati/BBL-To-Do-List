import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../types/task";

interface TaskItemProps {
  item: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ item, onToggle, onDelete }: TaskItemProps) {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => onToggle(item.id)}
        activeOpacity={0.6}
      >
        <View style={styles.checkbox}>
          {item.completed && <View style={styles.checkboxInner} />}
        </View>
      </TouchableOpacity>

      <Text
        style={[styles.taskText, item.completed && styles.taskTextCompleted]}
      >
        {item.text}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
        activeOpacity={0.6}
      >
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingVertical: 15,
  },
  checkboxContainer: {
    marginRight: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "#000",
  },
  taskText: {
    flex: 1,
    color: "#000",
    fontSize: 16,
  },
  taskTextCompleted: {
    color: "#999",
    textDecorationLine: "line-through",
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  deleteText: {
    color: "#FF3B30",
    fontSize: 14,
  },
});
