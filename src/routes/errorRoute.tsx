import { ErrorBoundary } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";

export function routeData() {
  return createServerData$(
    async (_, { request }) => {
      if (true) {
        throw new Error("Error not handled");
      }
      return { name: "Test" };
    },
    { key: () => ["routeData"] }
  );
}

export default function ErrorRoute() {
  const data = useRouteData<typeof routeData>();
  return (
    <ErrorBoundary
      fallback={(e) => {
        console.error(e);
        return <p>Internal Server Error. Please try again later.</p>;
      }}
    >
      <div>
        <h1>Welcome back, {data()?.name}</h1>
      </div>
    </ErrorBoundary>
  );
}
