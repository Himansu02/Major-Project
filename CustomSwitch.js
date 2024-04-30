import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';

const CustomSwitch = ({ value, onValueChange,percent }) => {

    const isDisabled = percent >= 40 && percent <= 70;

  return (
    <TouchableOpacity
      onPress={() => {
        if(isDisabled && !value){
            Alert.alert("Warning","Water Level is in ideal Condition Don't Turn on the Pump",[
                {text:"Ok"}
            ])
            return
        }
        onValueChange(!value)
      }}
      style={{
        width: 80, // Adjust the width as needed
        height: 30, // Adjust the height as needed
        borderRadius: 20, // Makes it look like a rounded switch
        backgroundColor: value ? 'lightgreen' : '#767577',
        justifyContent: 'center',
        marginTop:5
      }}
    >
      <View
        style={{
          width: 40, // Adjust the width of the thumb
          height: 40, // Keep it a square for a thumb effect
          borderRadius: 20, // Makes it look like a round thumb
          backgroundColor: '#fff',
          position: 'absolute',
          transform: [{ translateX: value ? 40 : 0 }], // Adjust the translation for thumb position
        }}
      />
    </TouchableOpacity>
  );
};

export default CustomSwitch