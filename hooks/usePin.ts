// hooks/usePin.ts
import { PIN_ONE, PIN_TWO } from '@/lib/const';
import { useState } from 'react';

enum Step {
  Initial = 1,
  SecondPin = 2,
  AccessGranted = 3
}

export const usePin = () => {
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [step, setStep] = useState<Step>(Step.Initial);

  const handlePinSubmit = (pin: string, currentStep: Step) => {
    if (currentStep === Step.Initial) {
      if (PIN_ONE.includes(pin)) {
        setPin1(pin);
        setStep(Step.SecondPin);
      } else {
        // Handle invalid PIN
        alert("Invalid PIN. Please try again.");
      }
    } else if (currentStep === Step.SecondPin) {
      if (PIN_TWO.includes(pin)) {
        setPin2(pin);
        setStep(Step.AccessGranted);
      } else {
        // Handle invalid PIN
        alert("Invalid PIN. Please try again.");
        setStep(Step.Initial);
        setPin1("");
      }
    }
  };

  return { pin1, pin2, step, handlePinSubmit };
};