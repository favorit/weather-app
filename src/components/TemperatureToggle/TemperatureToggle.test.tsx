import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TemperatureToggle from "./TemperatureToggle";

describe("TemperatureToggle", () => {
  it("toggles temperature unit", async () => {
    const onUnitChange = jest.fn();
    const { rerender } = render(
      <TemperatureToggle unit="C" onUnitChange={onUnitChange} />
    );
    expect(screen.getByTestId("selected")).toHaveTextContent("°C");
    expect(screen.getByTestId("clickable")).toHaveTextContent("°F");
    await userEvent.click(screen.getByText("°F"));
    expect(onUnitChange).toHaveBeenCalledTimes(1);
    expect(onUnitChange).toHaveBeenCalledWith("F");

    rerender(<TemperatureToggle unit="F" onUnitChange={onUnitChange} />);
    expect(screen.getByTestId("selected")).toHaveTextContent("°F");
    expect(screen.getByTestId("clickable")).toHaveTextContent("°C");
  });
});
