import React, {useState} from 'react';
import moment from 'moment';
import {View, Text, Button} from 'react-native';
import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-community/picker';

import styles from './styles';
import {getAge} from '../../utills/Methods';
import {US_STATES} from '../../utills/Constants';
import InputField from '../InputField';
import {TouchableOpacity} from 'react-native-gesture-handler';
import appConfig from 'app/config'

export default function SignupForm({profile, setProfile, content, validation }) {
  const profileFields = [
    {
      key: 'first_name',
      label: content.first_name_title,
      autoComplete: 'name-given',
      required: true,
    },
    {
      key: 'last_name',
      label: content.last_name_title,
      autoComplete: 'name-family',
      required: true,
    },
    {
      key: 'email',
      label: content.email_title,
      autoComplete: 'email',
    },
    {
      key: 'dob',
      label: content.dob_title,
      type: 'date',
      autoComplete: 'birthdate-full',
      required: true,
    }
  ];
  const medicalFields = [
    {
      key: 'medical_card_no',
      label: 'Medical Card Number',
    },
    {
      key: 'medical_card_expired_at',
      label: 'Medical Card Expiration',
      type: 'date',
    },
    {
      key: 'medical_card_state',
      label: 'Medical Card State',
      type: 'picker',
    },
  ]

  const medicalToggle = {
    key: 'has_medical',
    label: content.med_title,
    type: 'checkbox',
  }

  let mainFields
  switch (appConfig.MEDICAL) {
    case 'optional': 
      mainFields = [...profileFields, medicalToggle, ...medicalFields]
      break
    case 'required': 
      mainFields = [...profileFields, ...medicalFields]
      break
    case 'disabled':
      mainFields = profileFields
      break
    default: 
      console.log(`Unknown MEDICAL status: ${appConfig.MEDICAL}`)
      mainFields = profileFields
  }

  const onChangeProfile = (text, key) => {
    setProfile({...profile, [key]: text});

    if (key === 'email') {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
        console.log('Email is Not Correct');
        return false;
      } else {
        console.log('Email is Correct');
      }
    }
  };
  // const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  console.log('^^');
  console.log(getAge(profile.dob), profile.dob);
  return (
    <>
      {mainFields.map((field) => {
        if (field.type === 'checkbox') {
          return (
            <View style={styles.checkboxGroup}>
              <CheckBox
                value={profile[field.key]}
                onValueChange={(val) => onChangeProfile(val, field.key)}
                style={styles.checkbox}
              />
              <Text style={styles.checkboxLabel}>{field.label}</Text>
            </View>
          );
        }
        if (field.key.includes('medical_card_') && appConfig.MEDICAL !== 'required' && !profile.has_medical) {
          return;
        }
        let date = new Date();
        if (field.type === 'date' && profile[field.key]) {
          const dateSplitted = profile[field.key].split('/');
          date.setFullYear(dateSplitted[2]);
          date.setMonth(dateSplitted[1] - 1);
          date.setDate(dateSplitted[0]);
        }
        return (
          <View style={styles.formGroup} key={field.key}>
            <Text style={styles.formLabel}>{field.label}</Text>
            {!field.type && (
              <InputField
                style={{minHeight: 50}}
                onChange={(newText) => onChangeProfile(newText, field.key)}
                autoComplete={field.autoComplete}
                value={profile[field.key]}
              />
            )}
            {field.type === 'date' && (
              <>
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <View pointerEvents="none">
                    <InputField
                      style={{minHeight: 50}}
                      disabled
                      value={profile[field.key]}
                    />
                  </View>
                </TouchableOpacity>
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={date}
                  onConfirm={(date) => {
                    setOpen(false);
                    onChangeProfile(
                      moment(date).format('DD/MM/YYYY'),
                      field.key,
                    );
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </>
            )}
            {field.type === 'picker' && (
              <Picker
                selectedValue={profile[field.key]}
                style={styles.formInput}
                itemStyle={{color: 'white'}}
                onValueChange={(itemValue, itemIndex) =>
                  onChangeProfile(itemValue, field.key)
                }>
                {US_STATES.map((state) => (
                  <Picker.Item
                    label={state.name}
                    value={state.abbreviation}
                    key={state.abbreviation}
                    style={{color: 'white'}}
                  />
                ))}
              </Picker>
            )}
            <Text style={styles.errorText}>
              {validation && field.required && !profile[field.key]
                ? 'This field is required'
                : ''}
            </Text>
          </View>
        );
      })}
      <Text style={styles.errorText}>
        {!(getAge(profile.dob) >= 22) && content.age_error}
      </Text>
    </>
  );
}
