import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Colors, Shadows } from '../../../shared/theme';

const { width } = Dimensions.get('window');

const MOCK_DAYS = [
  { id: '1', date: 'March 17', situation: 'Condition improving. Vitals stable.', status: 'Completed', time: '10:30 AM' },
  { id: '2', date: 'March 16', situation: 'Slight fever. Adjusted medication.', status: 'Completed', time: '11:15 AM' },
  { id: '3', date: 'March 15', situation: 'Patient resting. Therapy session scheduled.', status: 'Urgent', time: '09:45 AM' },
  { id: '4', date: 'March 14', situation: 'Initial assessment completed.', status: 'Completed', time: '02:30 PM' },
  { id: '5', date: 'March 13', situation: 'Awaiting laboratory results.', status: 'Pending', time: 'Pending' },
];

const PatientDetailsPage = ({ route, navigation }: any) => {
  const { patient } = route.params;

  const renderDayItem = ({ item }: { item: typeof MOCK_DAYS[0] }) => (
    <View style={styles.dayCard}>
      <View style={styles.dayHeader}>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.situationContent}>
        <Text style={styles.situationTitle}>Daily Situation Report</Text>
        <Text style={styles.situationDescription}>{item.situation}</Text>
      </View>

      <View style={styles.dayFooter}>
        <Text style={styles.timeLabel}>Visit Time: <Text style={styles.timeValue}>{item.time}</Text></Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Urgent': return '#EF4444';
      case 'Pending': return '#3B82F6';
      default: return '#10B981';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{patient.name}</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.patientInfoCard}>
        <Text style={styles.patientInfoTitle}>General Overview</Text>
        <Text style={styles.patientInfoDesc}>Condition: {patient.condition}</Text>
        <Text style={styles.patientInfoDesc}>Age: {patient.age} years old</Text>
      </View>

      <Text style={styles.listHeader}>Visit History</Text>
      
      <FlatList
        data={MOCK_DAYS}
        renderItem={renderDayItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  placeholder: {
    width: 60,
  },
  patientInfoCard: {
    margin: 20,
    padding: 20,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    ...Shadows.medium,
  },
  patientInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  patientInfoDesc: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 24,
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  dayCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Shadows.small,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },
  situationContent: {
    backgroundColor: '#FAFBFC',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  situationTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  situationDescription: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
  },
  dayFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  timeLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  timeValue: {
    fontWeight: '600',
    color: Colors.text,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  editButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default PatientDetailsPage;
