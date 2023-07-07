import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
const Hours = ({hours}) => {
  const GetHour = ({hour}) => (
    <Text style={styles.innerText}>
      {Math.floor(hour?.opens_at / 60)}:{hour?.opens_at % 60 < 10 ? '0' : ''}
      {hour?.opens_at % 60}am -{Math.floor(hour?.closes_at / 60) - 12}:
      {hour?.closes_at % 60 < 10 ? '0' : ''}
      {hour?.closes_at % 60}pm
    </Text>
  );
  return (
    <View style={styles.hoursView}>
      <Text style={styles.headingText}>Hours</Text>
      <View style={styles.openingTime}>
        <Text style={styles.innerText}>Monday</Text>
        <GetHour hour={hours?.monday} />
      </View>
      <View style={styles.openingTime}>
        <Text style={styles.innerText}>Tuesday</Text>
        <GetHour hour={hours?.tuesday} />
      </View>
      <View style={styles.openingTime}>
        <Text style={styles.innerText}>Wednesday</Text>
        <GetHour hour={hours?.wednesday} />
      </View>
      <View style={styles.openingTime}>
        <Text style={styles.innerText}>Thursday</Text>
        <GetHour hour={hours?.thursday} />
      </View>
      <View style={styles.openingTime}>
        <Text style={styles.innerText}>Friday</Text>
        <GetHour hour={hours?.friday} />
      </View>
      <View style={styles.openingTime}>
        <Text style={styles.innerText}>Saturday</Text>
        <GetHour hour={hours?.saturday} />
      </View>
      <View style={styles.openingTime}>
        <Text style={styles.innerText}>Sunday</Text>
        <GetHour hour={hours?.sunday} />
      </View>
    </View>
  );
};

export default Hours;
