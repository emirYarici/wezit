import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Colors, Shadows } from '../../../shared/theme';
import { 
  ChevronLeft, 
  Pill, 
  TestTube, 
  Activity, 
  Thermometer, 
  Clock,
  ArrowRight
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const TIMELINE_DATA = [
  { 
    id: '1', 
    type: 'medication', 
    title: 'Paracetamol 500mg', 
    time: '08:00 AM', 
    status: 'Administered',
    description: 'Oral intake for fever control',
    details: { dose: '500mg', route: 'Oral', frequency: 'Every 6 hours' }
  },
  { 
    id: '2', 
    type: 'test', 
    title: 'Complete Blood Count', 
    time: '09:30 AM', 
    status: 'Results Ready',
    description: 'Routine screening for infection',
    details: { laboratory: 'Main Lab', urgent: false }
  },
  { 
    id: '3', 
    type: 'vital', 
    title: 'Vitals Recorded', 
    time: '10:15 AM', 
    status: 'Stable',
    description: 'BP: 120/80, Temp: 37.2°C',
    details: { bp: '120/80', temp: '37.2', hr: '72' }
  },
  { 
    id: '4', 
    type: 'medication', 
    title: 'Amoxicillin 250mg', 
    time: '12:00 PM', 
    status: 'Pending',
    description: 'Antibiotic course day 3',
    details: { dose: '250mg', route: 'Oral', frequency: 'Daily' }
  },
  { 
    id: '5', 
    type: 'test', 
    title: 'Chest X-Ray', 
    time: '02:00 PM', 
    status: 'Scheduled',
    description: 'Assessing lung condition',
    details: { radiology: 'Building B', urgent: true }
  },
];

const PatientDetailsPage = ({ route, navigation }: any) => {
  const { patient } = route.params;
  const [isVisiting, setIsVisiting] = useState(false);
  const [painLevel, setPainLevel] = useState(0);
  const [appetite, setAppetite] = useState('normal');

  const painEmojis = ['😊', '🙂', '😐', '😟', '😨', '😫', '😩', '😭', '💀'];

  const renderTimelineItem = ({ item, index }: { item: any, index: number }) => {
    const isFirst = index === 0;
    const isLast = index === TIMELINE_DATA.length - 1;

    const getIcon = () => {
      switch (item.type) {
        case 'medication': return <Pill size={20} color={Colors.primary} />;
        case 'test': return <TestTube size={20} color="#8B5CF6" />;
        case 'vital': return <Activity size={20} color="#EC4899" />;
        default: return <Clock size={20} color={Colors.textSecondary} />;
      }
    };

    return (
      <TouchableOpacity 
        style={styles.timelineItem} 
        onPress={() => navigation.navigate('EventDetails', { event: item })}
      >
        {/* Left: Time and Line */}
        <View style={styles.timelineSidebar}>
          <Text style={styles.timelineTime}>{item.time}</Text>
          <View style={styles.lineWrapper}>
            {!isLast && <View style={styles.verticalLine} />}
            <View style={[styles.dot, { backgroundColor: getStatusColor(item.status) }]} />
          </View>
        </View>

        {/* Right: Content Card */}
        <View style={styles.timelineContent}>
          <View style={styles.eventCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                {getIcon()}
              </View>
              <View style={styles.headerText}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventStatus}>{item.status}</Text>
              </View>
              <ArrowRight size={18} color={Colors.border} />
            </View>
            <Text style={styles.eventDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Board</Text>
        <TouchableOpacity style={styles.placeholder}>
          <Activity size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.patientHero}>
        <View style={styles.heroMain}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>{patient.name.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.heroName}>{patient.name}</Text>
            <Text style={styles.heroSubtitle}>{patient.age}y/o • Bed {patient.id.replace('p', '')}</Text>
          </View>
        </View>
        
        <View style={styles.heroActions}>
          <TouchableOpacity 
            style={[styles.visitButton, isVisiting && styles.activeVisitButton]} 
            onPress={() => setIsVisiting(!isVisiting)}
          >
            <Activity size={18} color={isVisiting ? Colors.white : Colors.primary} />
            <Text style={[styles.visitButtonText, isVisiting && styles.activeVisitButtonText]}>
              {isVisiting ? 'End Visit' : 'Start Visit'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.vitalsPreview}>
          <View style={styles.vitalDot}>
            <Thermometer size={14} color={Colors.white} />
            <Text style={styles.vitalDotText}>37.2°C</Text>
          </View>
          <View style={[styles.vitalDot, { backgroundColor: '#3B82F6' }]}>
            <Activity size={14} color={Colors.white} />
            <Text style={styles.vitalDotText}>120/80</Text>
          </View>
        </View>
      </View>

      {isVisiting && (
        <View style={styles.visitPanel}>
          <Text style={styles.visitPanelTitle}>Daily Assessment</Text>
          
          <View style={styles.assessmentSection}>
            <Text style={styles.assessmentLabel}>Pain Level (Scale 1-9)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.painScale}>
              {painEmojis.map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.painItem,
                    painLevel === index + 1 && styles.selectedPainItem
                  ]}
                  onPress={() => setPainLevel(index + 1)}
                >
                  <Text style={styles.painEmoji}>{emoji}</Text>
                  <Text style={[styles.painNumber, painLevel === index + 1 && styles.selectedPainText]}>
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.assessmentSection}>
            <Text style={styles.assessmentLabel}>Appetite</Text>
            <View style={styles.chipContainer}>
              {['Poor', 'Normal', 'Good'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.chip,
                    appetite === item.toLowerCase() && styles.selectedChip
                  ]}
                  onPress={() => setAppetite(item.toLowerCase())}
                >
                  <Text style={[
                    styles.chipText,
                    appetite === item.toLowerCase() && styles.selectedChipText
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.saveVisitButton} onPress={() => setIsVisiting(false)}>
            <Text style={styles.saveVisitButtonText}>Save Visit Findings</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.timelineHeader}>
        <Text style={styles.timelineTitle}>Timeline</Text>
        <Text style={styles.timelineDate}>Today, March 18</Text>
      </View>
      
      <FlatList
        data={TIMELINE_DATA}
        renderItem={renderTimelineItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.timelineList}
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    padding: 8,
  },
  timelineList: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timelineSidebar: {
    width: 70,
    alignItems: 'center',
    paddingTop: 16,
  },
  timelineTime: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  lineWrapper: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: -16, // Connect to next item
    width: 2,
    backgroundColor: Colors.border,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 24,
  },
  eventCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    ...Shadows.small,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  eventStatus: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  eventDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  patientHero: {
    margin: 20,
    padding: 24,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    ...Shadows.medium,
  },
  heroMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  heroName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  vitalsPreview: {
    flexDirection: 'row',
    marginTop: 20,
  },
  vitalDot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  vitalDotText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  timelineTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
  },
  timelineDate: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  heroActions: {
    marginTop: 16,
  },
  visitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  activeVisitButton: {
    backgroundColor: '#EF4444', // Danger color to end visit
  },
  visitButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    marginLeft: 8,
  },
  activeVisitButtonText: {
    color: Colors.white,
  },
  visitPanel: {
    margin: 20,
    marginTop: 0,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    ...Shadows.medium,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  visitPanelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  assessmentSection: {
    marginBottom: 24,
  },
  assessmentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  painScale: {
    paddingRight: 20,
  },
  painItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    marginRight: 10,
  },
  selectedPainItem: {
    backgroundColor: Colors.primary,
  },
  painEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  painNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  selectedPainText: {
    color: Colors.white,
  },
  chipContainer: {
    flexDirection: 'row',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  selectedChipText: {
    color: Colors.white,
  },
  saveVisitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveVisitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PatientDetailsPage;
