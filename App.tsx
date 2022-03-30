import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Entypo} from '@expo/vector-icons'

export default function App() {
  const [darkTheme, setDarkTheme] = useState (false);
  const buttons = [
    'AC', 
    'DEL', 
    '%',
    '/',
    7,
    8,
    9,
    '*',
    4,
    5,
    6,
    '-',
    3,
    2,
    1,
    '+',
    0,
    '.',
    '+/-',
    '=' 
  ]

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")

  function calculator(){
    const splitNumbers  = currentNumber.split (' ')
    const firstNumber = parseFloat(splitNumbers[0])
    const lastNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]

    switch(operator){
      case '+':
        setCurrentNumber((firstNumber + lastNumber).toString())
        return
      case '-':
        setCurrentNumber((firstNumber - lastNumber).toString())
        return
      case '*':
        setCurrentNumber((firstNumber * lastNumber).toString())
        return
      case '/':
        setCurrentNumber((firstNumber / lastNumber).toString())
        return
    }
  }

  function handleInput(buttonPressed){
    console.log(buttonPressed)
    if (buttonPressed === "+" | buttonPressed === "-" | buttonPressed === "*" | buttonPressed === "/"){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return 
    }
    switch (buttonPressed){
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length -1)))
        return
      case 'AC':
        setLastNumber("")
        setCurrentNumber("")
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        return
    }
    setCurrentNumber(currentNumber + buttonPressed)
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  results: {
    flex: 1,
    backgroundColor: darkTheme ? '#282F3B' : '#F5F5F5',
    width: '100%',
    minHeight: 100,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  historyText: {
    color: darkTheme ? '#B5B7BB' : '#7C7C7C',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end'
  },
  resultText: {
    color: darkTheme ? '#B5B7BB' : '#7C7C7C',
    margin: 10,
    fontSize: 25
  },
  themeButton: {
    alignSelf: 'flex-start',
    bottom: 250,
    margin: 15,
    backgroundColor: darkTheme ? '#7B8084' : '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  button: {
    borderColor: darkTheme ? '#3F4D5B' : '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    minWidth: 90,
    minHeight: 90,
    borderWidth: 0.5,
  },
  textButton: {
    color: darkTheme ? '#B5B7BB' : '#7C7C7C',
    fontSize: 30
  }
});

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={() => darkTheme ? setDarkTheme(false) : setDarkTheme(true)}
        >
          <Entypo
            name={darkTheme ? "light-up" : "moon"}
            size={24}
            color={darkTheme ? "white" : "black"}
          />
        </TouchableOpacity>

        <Text style={styles.historyText}>
          {lastNumber}
        </Text>
        <Text style={styles.resultText}>
          {currentNumber}
        </Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '=' ?
          <TouchableOpacity 
            key={button} 
            style={[styles.button, {backgroundColor: '#9DBC7B'}]}
            onPress={() => handleInput(button)}
          >
            <Text
              style={[styles.textButton, {color: '#FFFFFF', fontSize: 28}]}
            >
              {button}
            </Text>
          </TouchableOpacity>
          :
          <TouchableOpacity 
            onPress={() => handleInput(button)}
            key={button} 
            style={[styles.button, 
              {backgroundColor:typeof(button) === 'number' ? darkTheme === true ? '#303946' : '#FFFFFF' : darkTheme === true ? '#414853' : '#EDEDED'}]}>
            <Text>
              {button}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}