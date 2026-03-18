import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Colors, Shadows } from '../../../shared/theme';
import { ChevronLeft, Clock, Info, CheckCircle2 } from 'lucide-react-native';

const EventDetailsPage = ({ route, navigation }: any) => {
  const { event } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainCard}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{event.type.toUpperCase()}</Text>
          </View>
          <Text style={styles.title}>{event.title}</Text>
          
          <View style={styles.infoRow}>
            <Clock size={18} color={Colors.textSecondary} />
            <Text style={styles.infoText}>{event.time} • Today</Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(event.status) + '20' }]}>
            <CheckCircle2 size={16} color={getStatusColor(event.status)} />
            <Text style={[styles.statusText, { color: getStatusColor(event.status) }]}>{event.status}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Info size={18} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Description</Text>
            </View>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          {event.details && (
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsHeader}>Specifications</Text>
              {Object.entries(event.details).map(([key, value]: [string, any]) => (
                <View key={key} style={styles.detailRow}>
                  <Text style={styles.detailKey}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                  <Text style={styles.detailValue}>{value.toString()}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.actionButtonText}>Back to Timeline</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Urgent':
    case 'Scheduled': 
      return '#F59E0B';
    case 'Pending': 
      return '#3B82F6';
    case 'Results Ready':
    case 'Administered':
    case 'Stable':
      return '#10B981';
    default: return '#9CA3AF';
  }
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 20,
  },
  mainCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    ...Shadows.medium,
    marginBottom: 20,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 24,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginLeft: 10,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  detailsContainer: {
    backgroundColor: '#FAFBFC',
    borderRadius: 16,
    padding: 16,
  },
  detailsHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  detailKey: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    ...Shadows.medium,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default EventDetailsPage;
