import React, { useMemo, forwardRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Colors, Shadows } from '../../../shared/theme';
import { Check } from 'lucide-react-native';
import { UnitSwitcherBackdrop } from './UnitSwitcherBackdrop';

export interface Unit {
  id: string;
  name: string;
  hospital: string;
  capacity: number;
}

interface UnitSwitcherSheetProps {
  units: Unit[];
  selectedUnit: Unit;
  onSelect: (unit: Unit) => void;
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export const UnitSwitcherSheet = ({
  units,
  selectedUnit,
  onSelect,
  bottomSheetRef,
}: UnitSwitcherSheetProps) => {
  const snapPoints = useMemo(() => ['50%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enableDynamicSizing
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={UnitSwitcherBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetIndicator}
    >
      <BottomSheetView style={styles.switcherContent}>
        <Text style={styles.switcherTitle}>Switch Unit</Text>
        {units.map(unit => (
          <TouchableOpacity
            key={unit.id}
            style={[
              styles.unitItem,
              selectedUnit.id === unit.id && styles.selectedUnitItem,
            ]}
            onPress={() => onSelect(unit)}
          >
            <Text
              style={[
                styles.unitItemText,
                selectedUnit.id === unit.id && styles.selectedUnitItemText,
              ]}
            >
              {unit.name}
            </Text>
            {selectedUnit.id === unit.id && (
              <Check size={20} color={Colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: Colors.white,
    borderRadius: 32,
  },
  bottomSheetIndicator: {
    backgroundColor: Colors.border,
    width: 40,
  },
  switcherContent: {
    width: '100%',
    padding: 24,
  },
  switcherTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  unitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedUnitItem: {
    backgroundColor: Colors.primary + '10',
  },
  unitItemText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  selectedUnitItemText: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
