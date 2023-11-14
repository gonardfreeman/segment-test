import { useState, useEffect } from "react";
import { Analytics, AnalyticsBrowser } from "@segment/analytics-next";

import Input from "./input";
import GenerateButton from "./generateButton";
import { createBLCSignUpTrack } from "@/data/tracks";
import { BUTTON_CLASS } from "@/constants";
import { createRandomUserId } from "@/data";

function ManualMode({ inputs = [] }: MainComponentProps) {
  const [once, setOnce] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined);

  useEffect(() => {
    async function handleLoadAnalytics() {
      try {
        const resp = await (await fetch("/api/writeKey")).json();
        if (!resp?.writeKey || once) {
          return;
        }
        const [analytics] = await AnalyticsBrowser.load({
          writeKey: resp.writeKey,
        });
        setOnce(true);
        setAnalytics(analytics);
      } catch (err) {
        console.log(err);
        setAnalytics(undefined);
        setOnce(false);
      }
    }
    handleLoadAnalytics().catch((err) => console.log(err));
  }, [once]);

  const [inputValues, setInputValues] = useState(
    inputs.reduce((acc, input) => {
      acc[input.name] = "";
      return acc;
    }, {} as Record<string, string>)
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      {inputs.map((input) => (
        <div key={input.key} className="flex items-end gap-2">
          <Input
            label={input.label}
            name={input.name}
            value={inputValues[input.name]}
            onChange={(newValue) =>
              setInputValues({ ...inputValues, [input.name]: newValue })
            }
          />
          <GenerateButton
            onClick={() => {
              let newValue = input.handleGenerate();
              if (["address", "zip_code"].includes(input.name)) {
                setInputValues({
                  ...inputValues,
                  address: (newValue as Address).address,
                  zip_code: (newValue as Address).zip_code,
                });
                return;
              }
              setInputValues({
                ...inputValues,
                [input.name]: input.handleGenerate() as string,
              });
            }}
          />
        </div>
      ))}
      <div className="flex gap-2">
        <button
          className={BUTTON_CLASS}
          onClick={async () => {
            if (!analytics) {
              console.warn("no analytics");
              return;
            }
            try {
              if (inputValues.user_id.length === 0) {
                setInputValues({
                  ...inputValues,
                  user_id: createRandomUserId(),
                });
              }
              const resp = await analytics.identify(`${inputValues.user_id}`, {
                email: inputValues.user_email,
                name: inputValues.user_full_name,
              });
              console.log(resp);
              analytics.track(
                "button_clicked",
                createBLCSignUpTrack(inputValues)
              );
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Create Track
        </button>
        <button
          className={BUTTON_CLASS}
          onClick={() => {
            setInputValues(
              createBLCSignUpTrack({
                user_id: createRandomUserId(),
              }) as Record<string, string>
            );
          }}
        >
          Generate With New User ID
        </button>
      </div>
    </div>
  );
}

export default ManualMode;
