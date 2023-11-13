import { useState } from "react";
import Input from "./input";
import GenerateButton from "./generateButton";

function ManualMode({ inputs }: MainComponentProps) {
  const [inputValues, setInputValues] = useState(
    inputs.reduce((acc, input) => {
      acc[input.label] = "";
      return acc;
    }, {} as Record<string, string>)
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      {inputs.map((input) => (
        <div key={input.key} className="flex items-end gap-2">
          <Input
            label={input.label}
            value={inputValues[input.label]}
            onChange={(newValue) =>
              setInputValues({ ...inputValues, [input.label]: newValue })
            }
          />
          <GenerateButton
            onClick={() => {
              setInputValues({
                ...inputValues,
                [input.label]: input.handleGenerate(),
              });
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default ManualMode;
