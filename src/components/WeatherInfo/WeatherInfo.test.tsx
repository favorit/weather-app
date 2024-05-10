import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
    } as any);

    render(<WeatherInfo query="Berlin" tempUnit="C" />);
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
          temp_f: 68,
          condition: {
            text: "Sunny",
            icon: "https://cdn.weatherapi.com/weather/64x64/d/01d",
            code: 1000,
          },
        },
        location: {
          name: query,
          country: "Germany",
        },
      },
    } as any);

    const { rerender } = render(<WeatherInfo query={query} tempUnit="C" />);
    expect(screen.getByText(/Berlin/i)).toBeInTheDocument();
    expect(screen.getByText(/20°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Sunny/i)).toBeInTheDocument();

    rerender(<WeatherInfo query={query} tempUnit="F" />);
    expect(screen.getByText(/Berlin/i)).toBeInTheDocument();
    expect(screen.getByText(/68°F/i)).toBeInTheDocument();
    expect(screen.getByText(/Sunny/i)).toBeInTheDocument();
  });

  it("displays error message on failure", () => {
    const query = "Berlin";
    mockUseCurrentWeather.mockReturnValue({
      isLoading: false,
      isError: true,
      error: new Error("Network request failed"),
      data: undefined,
    } as any);

    render(<WeatherInfo query={query} tempUnit="C" />);
    expect(screen.getByText(/Network request failed/i)).toBeInTheDocument();
  });

  it("renders conditionally add to favorite button", async () => {
    const query = "Berlin";
    mockUseCurrentWeather.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        current: {
          temp_c: 20,
          temp_f: 68,
          condition: {
            text: "Sunny",
            icon: "https://cdn.weatherapi.com/weather/64x64/d/01d",
            code: 1000,
          },
        },
        location: {
          name: query,
          country: "Germany",
        },
      },
    } as any);

    const onAddToFavorites = jest.fn();

    const { rerender } = render(
      <WeatherInfo
        query={query}
        tempUnit="C"
        onAddToFavorites={onAddToFavorites}
        favoriteLocations={[]}
      />
    );
    const button = screen.getByText(/\+/i);
    expect(button).toBeInTheDocument();
    await userEvent.click(button);

    expect(onAddToFavorites).toHaveBeenCalledTimes(1);
    expect(onAddToFavorites).toBeCalledWith(query);

    rerender(
      <WeatherInfo query={query} tempUnit="C" favoriteLocations={[query]} />
    );
    expect(screen.queryByText(/Add/i)).not.toBeInTheDocument();
  });
});
