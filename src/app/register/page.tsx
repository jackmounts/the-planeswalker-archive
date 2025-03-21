"use client";

import React, { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";

type Step = 1 | 2 | 3 | 4;
type Gender = "male" | "female" | "non-binary" | undefined;
type SkillLevel = "beginner" | "intermediate" | "advanced" | "pro" | undefined;

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [gender, setGender] = useState<Gender>();
  const [skillLevel, setSkillLevel] = useState<SkillLevel>();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [errorsPassword, setErrorsPassword] = useState<string[]>();
  const [errorsRepeat, setErrorsRepeat] = useState<string[]>();

  const checkPasswordValidity = () => {
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    if (!passwordInput) return;
    const passwordValue = passwordInput.value;
    const errorsList = [];
    if (passwordValue.length < 8) {
      errorsList.push("La password deve avere almeno 8 caratteri.");
    }
    if (!/[A-Z]/.test(passwordValue)) {
      errorsList.push(
        "La password deve contenere almeno una lettera maiuscola."
      );
    }
    if (!/[a-z]/.test(passwordValue)) {
      errorsList.push(
        "La password deve contenere almeno una lettera minuscola."
      );
    }
    if (!/[0-9]/.test(passwordValue)) {
      errorsList.push("La password deve contenere almeno un numero.");
    }
    if (!/[!@#$%^&*]/.test(passwordValue)) {
      errorsList.push(
        "La password deve contenere almeno un carattere speciale."
      );
    }
    setErrorsPassword(errorsList);
  };

  useEffect(() => {
    checkPasswordValidity();
  }, [password]);

  const checkRepeatValidity = () => {
    const repeatInput = document.getElementById(
      "confirm-password"
    ) as HTMLInputElement;
    if (!repeatInput) return;
    const repeatValue = repeatInput.value;
    const errorsList = [];
    if (repeatValue !== password) {
      errorsList.push("Le password non corrispondono.");
    }
    setErrorsRepeat(errorsList);
  };

  useEffect(() => {
    checkRepeatValidity();
  }, [confirmPassword]);

  const checkValidity = () => {
    const res =
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      username.length > 0 &&
      errorsPassword?.length === 0 &&
      errorsRepeat?.length === 0;
    setIsFormValid(res);
  };

  useEffect(() => {
    checkValidity();
  });

  const nextStep = () => {
    setStep((prev) => (prev + 1) as Step);
  };

  const prevStep = () => {
    setStep((prev) => (prev - 1) as Step);
  };

  const register = async () => {};

  return (
    <div className="flex flex-row items-center justify-center size-full wavy-background">
      {step === 1 && (
        <>
          <div className="flex flex-col items-center justify-center size-full gap-4 text-white text-6xl">
            <div className="w-full lg:w-3/4">
              Welcome to the archives, Wizard!
            </div>
            <div className="w-full lg:w-3/4 flex flex-row justify-start items-center gap-x-4 flex-nowrap">
              <div>How do you want to be called?</div>
              <div>
                <input
                  type="text"
                  id="username"
                  placeholder="Liliana of the Veil"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  className="outline-none font-semibold animate-pulse"
                />
              </div>
            </div>
          </div>
          <div className="w-1/10">
            <MoveRight
              color="white"
              size={128}
              className="cursor-pointer"
              onClick={nextStep}
            ></MoveRight>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
