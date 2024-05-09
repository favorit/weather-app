import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherInfo from "./WeatherInfo";
import useCurrentWeather from "../../hooks/useCurrentWeather";

jest.mock("../../hooks/useCurrentWeather");

const mockUseCurrentWeather = jest.mocked(useCurrentWeather);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("WeatherInfo", () => {
  it("displays loading state correctly", () => {
    mockUseCurrentWeather.mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
    });

    render(<WeatherInfo query="Berlin" />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("displays weather information correctly", () => {
    const query = "Berlin";
    mockUseCurrentWeather.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        current: {
          temp_c: 20,
          condition: {
            text: "Sunny",
          },
        },
        location: {
          name: query,
        },
      },
    });

    render(<WeatherInfo query={query} />);
    expect(screen.getByText(/Weather in Berlin/i)).toBeInTheDocument();
    expect(screen.getByText(/Temperature: 20°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Condition: Sunny/i)).toBeInTheDocument();
  });

  it("displays error message on failure", () => {
    mockUseCurrentWeather.mockReturnValue({
      isLoading: false,
      isError: true,
      error: new Error("Network request failed"),
      data: undefined,
    });

    render(<WeatherInfo query="Berlin" />);
    expect(screen.getByText(/Network request failed/i)).toBeInTheDocument();
  });
});
