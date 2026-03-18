import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { Colors, Shadows } from '../../../shared/theme';
import {
  ChevronRight,
  User,
  UserMinus,
  ChevronDown,
  Check,
} from 'lucide-react-native';
import { TasksSection } from './TasksSection';
import { ScrollView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { UnitSwitcherSheet, Unit } from './UnitSwitcherSheet';

const MOCK_UNITS: Unit[] = [
  {
    id: '1',
    name: 'Emergency Unit',
    capacity: 20,
    hospital: 'Central Health Hospital',
  },
  {
    id: '2',
    name: 'Cardiology',
    capacity: 12,
    hospital: 'Central Health Hospital',
  },
  {
    id: '3',
    name: 'Pediatrics',
    capacity: 10,
    hospital: 'Central Health Hospital',
  },
  {
    id: '4',
    name: 'General Ward',
    capacity: 30,
    hospital: 'Central Health Hospital',
  },
];

const DashboardPage = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<Unit>(MOCK_UNITS[1]); // Cardiology as default

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenSwitcher = () => bottomSheetRef.current?.expand();
  const handleCloseSwitcher = () => bottomSheetRef.current?.close();

  // Generate beds dynamically based on selected unit
  const beds = Array.from({ length: selectedUnit.capacity }, (_, i) => ({
    id: `b${i + 1}`,
    label: `Bed ${i + 1}`,
    patient:
      i < 3
        ? {
            id: `p${i}`,
            name: i === 0 ? 'John Doe' : i === 1 ? 'Jane Smith' : 'Alice Brown',
            age: 45 - i * 8,
            condition:
              i === 0 ? 'Post-surgery' : i === 1 ? 'Stable' : 'Observation',
          }
        : null,
  }));

  const renderBed = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.bedCard, !item.patient && styles.emptyBedCard]}
      onPress={() =>
        item.patient &&
        navigation.navigate('PatientDetails', { patient: item.patient })
      }
    >
      <View style={styles.bedHeader}>
        <Text style={styles.bedLabel}>{item.label}</Text>
        {item.patient ? (
          <User size={16} color={Colors.primary} />
        ) : (
          <UserMinus size={16} color={Colors.textSecondary} />
        )}
      </View>

      {item.patient ? (
        <View>
          <Text style={styles.patientName} numberOfLines={1}>
            {item.patient.name}
          </Text>
          <Text style={styles.patientInfo}>
            {item.patient.age} y/o • {item.patient.condition}
          </Text>
        </View>
      ) : (
        <Text style={styles.emptyText}>Empty</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.unitSelector}
            onPress={handleOpenSwitcher}
          >
            <View>
              <View style={styles.unitNameRow}>
                <Text style={styles.hospitalName}>{selectedUnit.name}</Text>
                <ChevronDown
                  size={20}
                  color={Colors.text}
                  style={styles.chevron}
                />
              </View>
              <Text style={styles.subtitle}>{selectedUnit.hospital}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search beds or patients..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TasksSection />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Beds Management</Text>
        </View>

        <View style={styles.bedGrid}>
          {beds
            .filter(
              b =>
                b.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.patient?.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            )
            .map(renderBed)}
        </View>
      </ScrollView>

      <UnitSwitcherSheet
        bottomSheetRef={bottomSheetRef}
        units={MOCK_UNITS}
        selectedUnit={selectedUnit}
        onSelect={unit => {
          setSelectedUnit(unit);
          handleCloseSwitcher();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    color: Colors.text,
  },
  listContent: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  scrollContent: {
    paddingBottom: 120, // Space for floating tab bar
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  hospitalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  bedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  bedCard: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Shadows.small,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyBedCard: {
    backgroundColor: Colors.inputBackground,
    borderStyle: 'dashed',
    borderColor: Colors.textSecondary,
    borderWidth: 1,
  },
  bedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bedLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  patientInfo: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  unitSelector: {
    paddingVertical: 4,
  },
  unitNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    marginLeft: 8,
    marginTop: 2,
  },
});

export default DashboardPage;
