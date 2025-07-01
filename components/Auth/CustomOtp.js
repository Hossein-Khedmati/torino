"use client";
import { useRef } from "react";

export default function CustomOtpInput({ length = 6, value, onChange }) {
  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;

    const newValue = value.split("");
    newValue[idx] = val[0]; // فقط یک رقم
    onChange(newValue.join(""));

    // فوکوس به بعدی
    if (idx < length - 1 && inputsRef.current[idx + 1]) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      const newValue = value.split("");
      newValue[idx] = "";
      onChange(newValue.join(""));

      if (idx > 0 && !value[idx] && inputsRef.current[idx - 1]) {
        inputsRef.current[idx - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!paste) return;
    const newCode = paste.slice(0, length);
    onChange(newCode);
    if (inputsRef.current[newCode.length - 1]) {
      inputsRef.current[newCode.length - 1].focus();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        direction: "ltr",
        justifyContent: "center",
      }}
      onPaste={handlePaste}
    >
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          style={{
            width: "2.5rem",
            height: "2.5rem",
            textAlign: "center",
            fontSize: "1.5rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            direction: "ltr",
            unicodeBidi: "bidi-override",
          }}
        />
      ))}
    </div>
  );
}
