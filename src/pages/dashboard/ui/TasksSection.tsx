import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Colors, Shadows } from '../../../shared/theme';
import { Activity, FileText, Calendar, Users, Clock, CheckCircle2, Circle } from 'lucide-react-native';

const INITIAL_TASKS = [
  { id: '1', title: 'Check BP - John Doe', time: '09:00 AM', category: 'Health', Icon: Activity, color: '#6366F1', completed: false },
  { id: '2', title: 'Review LAB - Jane', time: '10:30 AM', category: 'Lab', Icon: FileText, color: '#10B981', completed: true },
  { id: '3', title: 'Morning Rounds', time: '11:00 AM', category: 'Routine', Icon: Calendar, color: '#F59E0B', completed: false },
  { id: '4', title: 'Staff Meeting', time: '02:00 PM', category: 'Social', Icon: Users, color: '#EF4444', completed: false },
];

export const TasksSection = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.taskCard, 
              { borderLeftColor: item.color },
              item.completed && styles.completedTaskCard
            ]}
            onPress={() => toggleTask(item.id)}
          >
            <View style={styles.taskCardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                <item.Icon size={18} color={item.color} />
              </View>
              {item.completed ? (
                <CheckCircle2 size={22} color={Colors.success} />
              ) : (
                <Circle size={22} color={Colors.border} />
              )}
            </View>
            <View>
              <Text 
                style={[
                  styles.taskTitle, 
                  item.completed && styles.completedTaskTitle
                ]} 
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <View style={styles.taskMeta}>
                <Clock size={12} color={Colors.textSecondary} />
                <Text style={styles.taskTime}>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.taskListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  taskCard: {
    width: 200,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    borderLeftWidth: 4,
    ...Shadows.small,
  },
  completedTaskCard: {
    opacity: 0.7,
  },
  taskCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  completedTaskTitle: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTime: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  taskListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
