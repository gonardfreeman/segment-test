import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import { Analytics, AnalyticsBrowser } from "@segment/analytics-next";

import { nanoid } from "nanoid";

interface Person {
  email: string;
  name: string;
}

function Clicker() {
  const [userId, setUserId] = useState<string>(nanoid());
  const [person, setPerson] = useState<Person>({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  });
  const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined);
  const [writeKey, setWriteKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function handleLoadAnalytics() {
      try {
        const resp = await (await fetch("/api/writeKey")).json();
        if (!resp?.writeKey) {
          return;
        }
        setWriteKey(resp.writeKey);
        if (!writeKey) {
          return;
        }
        const [analytics] = await AnalyticsBrowser.load({ writeKey });
        setAnalytics(analytics);
        await analytics.identify(userId, person);
      } catch (err) {
        console.log(err);
        setAnalytics(undefined);
      }
    }
    handleLoadAnalytics().catch((err) => console.log(err));
  }, [person, userId, writeKey, analytics]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="p-4">
        <h2 className="text-xl font-semibold">User Title</h2>
        <div className="card-body">
          <h3 className="text-lg font-semibold">
            <b>Name:</b> {person.name}
          </h3>
          <p className="text-gray-600">
            Email:
            <a
              href={`mailto:${person.email}`}
              className="text-blue-500 hover:underline"
            >
              {person.email}
            </a>
          </p>
        </div>
        <div className="mt-4 flex gap-4">
          <button
            className="bg-blue-500 text-white border border-blue-500 py-2 px-4 rounded hover:bg-blue-600 hover:border-blue-600"
            onClick={() => {
              if (!analytics) {
                console.warn("no analytics");
                return;
              }
              analytics.track("Button clicked!");
            }}
          >
            Button
          </button>
          <button
            className="bg-white text-blue-500 border border-blue-500 py-2 px-4 rounded hover:bg-blue-600 hover:text-white"
            onClick={() => {
              setUserId(nanoid());
              setPerson({
                name: faker.person.fullName(),
                email: faker.internet.email(),
              });
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
