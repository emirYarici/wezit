import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { Colors } from '../../../shared/theme';

const SchedulePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Calendar size={48} color={Colors.textSecondary} />
        <Text style={styles.text}>Schedule Coming Soon</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});

export default SchedulePage;
