import React, { useState } from "react";
import "./App.css";

import passwordList from "./100-most-common.js";

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const specialChars = "!@#$%^&*()_+-=+{}[]|\\:;<>?,./";
const checkmarkEmoji = "✅";
const crossmarkEmoji = "❌";

interface IPasswordStrength {
  length: number;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  isNotIntheList: boolean;
}

function App() {
  const [password, setPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<IPasswordStrength>({
    length: 0,
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isNotIntheList: true,
  });

  const calculatePasswordStrength = (password: string) => {
    const passwordStrength: IPasswordStrength = {
      length: 0,
      hasLowerCase: false,
      hasUpperCase: false,
      hasNumber: false,
      hasSpecialChar: false,
      isNotIntheList: true,
    };

    passwordStrength.length = password.length;

    for (let i = 0; i < password.length; i++) {
      if (uppercase.includes(password[i])) {
        passwordStrength.hasUpperCase = true;
      }

      if (lowercase.includes(password[i])) {
        passwordStrength.hasLowerCase = true;
      }

      if (numbers.includes(password[i])) {
        passwordStrength.hasNumber = true;
      }

      if (specialChars.includes(password[i])) {
        passwordStrength.hasSpecialChar = true;
      }

      if (passwordList.includes(password)) {
        passwordStrength.isNotIntheList = false;
      }
    }

    setPasswordStrength(passwordStrength);
  };

  return (
    <div className="App">
      <h1>Password Strength Checker</h1>

      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={(e) => calculatePasswordStrength(password)}
      />

      <div>
        <p>Length: {passwordStrength.length}</p>

        <p>
          Has Lower Case:{" "}
          {passwordStrength.hasLowerCase ? checkmarkEmoji : crossmarkEmoji}
        </p>

        <p>
          Has Upper Case:{" "}
          {passwordStrength.hasUpperCase ? checkmarkEmoji : crossmarkEmoji}
        </p>

        <p>
          Has Number:{" "}
          {passwordStrength.hasNumber ? checkmarkEmoji : crossmarkEmoji}
        </p>

        <p>
          Has Special Character:{" "}
          {passwordStrength.hasSpecialChar ? checkmarkEmoji : crossmarkEmoji}
        </p>

        <p>
          Is not in a known list of passwords:{" "}
          {passwordStrength.isNotIntheList ? checkmarkEmoji : crossmarkEmoji}
        </p>
      </div>
    </div>
  );
}

export default App;
