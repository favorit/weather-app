import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import nock from "nock";

import useCurrentWeather from "./useCurrentWeather";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

// Create a wrapper component that provides a QueryClient instance
const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={createTestQueryClient()}>
      {children}
    </QueryClientProvider>
  );
};

describe("useCurrentWeather", () => {
  it("fetches and returns weather data", async () => {
    const query = "Berlin";
    const mockResponse = {
      temp_c: 20,
      condition: {
        text: "Sunny",
      },
    };

    nock("https://api.weatherapi.com")
      .get("/v1/current.json")
      .query({ key: process.env.REACT_APP_WEATHER_API_KEY, q: query })
      .reply(200, mockResponse, { "Access-Control-Allow-Origin": "*" });

    const wrapper = createWrapper();
    const { result, waitFor } = renderHook(() => useCurrentWeather(query), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({
      temp_c: 20,
      condition: {
        text: "Sunny",
      },
    });
  });

  it("handles network errors", async () => {
    const query = "Berlin";
    nock("https://api.weatherapi.com")
      .get("/v1/current.json")
      .query({ key: process.env.REACT_APP_WEATHER_API_KEY, q: query })
      .reply(500);

    const wrapper = createWrapper();
    const { result, waitFor } = renderHook(() => useCurrentWeather(query), {
      wrapper,
    });
    await waitFor(() => result.current.isError);

    expect(result.current.error!.message).toEqual("Network request failed");
  });
});
