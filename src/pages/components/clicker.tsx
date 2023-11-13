import { useState, useEffect } from "react";
import { Analytics, AnalyticsBrowser } from "@segment/analytics-next";

import { createRandomPerson, createRandomUserId } from "@/data";
import { createBLCSignUpTrack } from "@/data/tracks";

function Clicker() {
  const [once, setOnce] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(1);
  const [userId, setUserId] = useState<string>(createRandomUserId());
  const [person, setPerson] = useState<Person>(createRandomPerson());
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="p-4">
        <h2 className="text-xl font-semibold">User Title</h2>
        <div className="card-body">
          <h3 className="text-lg font-semibold">
            <b>Name:</b> {person.name}
          </h3>
          <p className="text-gray-600">
            <b>Email:</b>
            <a
              href={`mailto:${person.email}`}
              className="text-blue-500 hover:underline"
            >
              {person.email}
            </a>
          </p>
          <p className="text-gray-600">
            <b>Clicked Times: </b> {clickCount}
          </p>
        </div>
        <div className="mt-4 flex gap-4">
          <button
            className="bg-blue-500 text-white border border-blue-500 py-2 px-4 rounded hover:bg-blue-600 hover:border-blue-600"
            onClick={async () => {
              if (!analytics) {
                console.warn("no analytics");
                return;
              }
              try {
                console.log(userId, person);
                const resp = await analytics.identify(`${userId}`, person);
                console.log(resp);
                analytics.track(
                  "button_clicked",
                  createBLCSignUpTrack({
                    user_id: userId,
                    user_full_name: person.name,
                    user_email: person.email,
                  })
                );
                setClickCount(clickCount + 1);
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Click Me
          </button>
          <button
            className="bg-white text-blue-500 border border-blue-500 py-2 px-4 rounded hover:bg-blue-600 hover:text-white"
            onClick={() => {
              setUserId(createRandomUserId());
              setClickCount(1);
              setPerson(createRandomPerson());
            }}
          >
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Clicker;
