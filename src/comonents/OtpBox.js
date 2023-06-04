
import React, { useRef, useState, useEffect } from 'react';
import { TextField, Grid } from '@material-ui/core';

const OTPDigitsInput = ({ onOtpChange }) => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (onOtpChange) {
      onOtpChange(otp);
    }
  }, [otp, onOtpChange]);

  const handleKeyPress = (event, index) => {
    const inputLength = inputRefs.current.length;
    const inputValue = event.key;

    if (event.key === 'Backspace') {
      if (index > 0) {
        event.preventDefault();
        inputRefs.current[index].value = '';
        inputRefs.current[index - 1].focus();
      }
      return;
    }

    if (!/^[0-9]$/.test(inputValue)) {
      event.preventDefault();
      return;
    }

    if (inputValue && index < inputLength - 1) {
      event.preventDefault();
      inputRefs.current[index].value = inputValue;
      inputRefs.current[index + 1].focus();
    } else if (inputValue && index === inputLength - 1) {
      event.preventDefault();
      inputRefs.current[index].value = inputValue;
    }

    setOtp(getOtpValue());
  };

  const handleInputChange = (event, index) => {
    const inputValue = event.target.value;
    const nextIndex = index + 1;
    const prevIndex = index - 1;

    if (inputValue && nextIndex < inputRefs.current.length) {
      inputRefs.current[nextIndex].focus();
    } else if (!inputValue && prevIndex >= 0) {
      inputRefs.current[prevIndex].focus();
    }

    setOtp(getOtpValue());
  };

  const getOtpValue = () => {
    return inputRefs.current.reduce((acc, inputRef) => {
      return acc + (inputRef.value || '');
    }, '');
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < 6; i++) {
      inputs.push(
        <TextField
          key={i}
          inputRef={(ref) => (inputRefs.current[i] = ref)}
          variant="outlined"
          size="small"
          inputProps={{
            maxLength: 1,
            style: { textAlign: 'center', height: "50px", width: "10px", marginRight: "10px" },
          }}
          onKeyDown={(event) => handleKeyPress(event, i)}
          onChange={(event) => handleInputChange(event, i)}
        />
      );
    }
    return inputs;
  };

  return <Grid spacing={5}>{renderInputs()}</Grid>;
};

export default OTPDigitsInput;