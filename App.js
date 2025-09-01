import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const App = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState('');
  const [unit, setUnit] = useState('Metric');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const validateInput = (value, type) => {
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      Alert.alert('Invalid Input', `Please enter a valid ${type}.`);
      return false;
    }
    return true;
  };

  const calculateBMI = () => {
    if (!validateInput(height, 'height') || !validateInput(weight, 'weight')) return;

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    let bmi;

    if (unit === 'Metric') {
      const heightInMeters = heightNum / 100;
      bmi = weightNum / (heightInMeters * heightInMeters);
    } else {
      bmi = (weightNum / (heightNum * heightNum)) * 703;
    }

    let category = getBMICategory(bmi);
    setBmiResult(`BMI: ${bmi.toFixed(2)}, Category: ${category}`);
  };

  const getBMICategory = (bmi) => {
    if (bmi <= 18.5) return 'Underweight';
    if (bmi < 24.9) return 'Normal weight';
    if (bmi < 29.9) return 'Overweight';
    return 'Obesity';
  };

  const clearInputs = () => {
    setHeight('');
    setWeight('');
    setBmiResult('');
    setUnit('Metric');
  };

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>BMI Calculator</Text>
      
      <Icon 
        name={isDarkMode ? 'sunny' : 'moon'} 
        size={30} 
        color={isDarkMode ? '#FFC107' : '#000'} 
        onPress={toggleDarkMode}
        style={styles.icon}
      />
      
      <View style={[styles.inputContainer, isDarkMode ? styles.darkInputContainer : styles.lightInputContainer]}>
        <Picker
          selectedValue={unit}
          style={[styles.picker, isDarkMode ? styles.darkPicker : styles.lightPicker]}
          onValueChange={(itemValue) => setUnit(itemValue)}
          itemStyle={{ color: isDarkMode ? '#FFF' : '#000' }}
        >
          <Picker.Item label="Metric (kg/cm)" value="Metric" />
          <Picker.Item label="Standard (lb/in)" value="Standard" />
        </Picker>

        <TextInput
          style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
          placeholder={`Height (${unit === 'Metric' ? 'cm' : 'inches'})`}
          placeholderTextColor={isDarkMode ? '#FFF' : '#000'} 
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <TextInput
          style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
          placeholder={`Weight (${unit === 'Metric' ? 'kg' : 'lbs'})`}
          placeholderTextColor={isDarkMode ? '#FFF' : '#000'} 
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>

      <Button title="Calculate BMI" onPress={calculateBMI} color={isDarkMode ? '#FFC107' : '#000'} />
      <TouchableOpacity onPress={clearInputs} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>

      {bmiResult ? <Text style={[styles.result, isDarkMode ? styles.darkText : styles.lightText]}>{bmiResult}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
  },
  darkContainer: {
    backgroundColor: '#121212', 
  },
  lightContainer: {
    backgroundColor: '#FFFFFF', 
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#FFFFFF', 
  },
  lightText: {
    color: '#000000', 
  },
  icon: {
    alignSelf: 'flex-end', 
    marginBottom: 10,
  },
  inputContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  darkInputContainer: {
    backgroundColor: '#333', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5, 
  },
  lightInputContainer: {
    backgroundColor: '#f9f9f9', 
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  darkInput: {
    backgroundColor: '#555', 
    borderColor: '#777', 
  },
  lightInput: {
    backgroundColor: '#FFF', 
    borderColor: '#ccc', 
  },
  picker: {
    height: 50,
    width: '100%',
  },
  darkPicker: {
    backgroundColor: '#333', 
  },
  lightPicker: {
    backgroundColor: '#FFF', 
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  clearButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF3D00',
    borderRadius: 5,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default App;
