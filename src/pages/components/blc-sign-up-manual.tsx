import { useState, useEffect } from "react";
import { Analytics, AnalyticsBrowser } from "@segment/analytics-next";

import type { MainComponentProps, Address } from "@/typings";

import Input from "./input";
import GenerateButton from "./generateButton";
import { createBLCSignUpTrack } from "@/data/tracks";
import { BUTTON_CLASS, DEFAULT_EVENT_NAME } from "@/constants";
import { createRandomUserId } from "@/data";

function ManualMode({ inputs = [] }: MainComponentProps) {
  const [eventName, setEventName] = useState<string>(DEFAULT_EVENT_NAME);
  const [once, setOnce] = useState<boolean>(false);
  const [analyticsStage, setStageAnalytics] = useState<Analytics | undefined>(
    undefined
  );
  const [analyticsHawks, setHawksAnalytics] = useState<Analytics | undefined>(
    undefined
  );

  useEffect(() => {
    async function handleLoadAnalytics() {
      try {
        const resp = await (await fetch("/api/writeKey")).json();
        if (!resp?.stage || once) {
          return;
        }
        const [stageAnalytics] = await AnalyticsBrowser.load({
          writeKey: resp.stage,
        });
        const [hawksAnalytics] = await AnalyticsBrowser.load({
          writeKey: resp.hawks,
        });
        setOnce(true);
        setStageAnalytics(stageAnalytics);
        setHawksAnalytics(hawksAnalytics);
      } catch (err) {
        console.log(err);
        setStageAnalytics(undefined);
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
      <div className="flex items-end gap-2">
        <Input
          label="Event Name"
          name="event_name"
          value={eventName}
          onChange={(newValue) => setEventName(newValue)}
        />
        <GenerateButton
          onClick={() => {
            setEventName(DEFAULT_EVENT_NAME);
          }}
        />
      </div>
      {inputs.map((input) => (
        <div className="flex items-end gap-2" key={input.key}>
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
            if (!analyticsStage) {
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
              const resp = await analyticsStage.identify(
                `${inputValues.user_id}`,
                {
                  email: inputValues.user_email,
                  name: inputValues.user_full_name,
                }
              );
              console.log(resp);
              analyticsStage.track(eventName, inputValues);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Create Track Stage
        </button>
        <button
          className={BUTTON_CLASS}
          onClick={async () => {
            if (!analyticsHawks) {
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
              const resp = await analyticsHawks.identify(
                `${inputValues.user_id}`,
                {
                  email: inputValues.user_email,
                  name: inputValues.user_full_name,
                }
              );
              console.log(resp);
              analyticsHawks.track(eventName, inputValues);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Create Track Hawks
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
