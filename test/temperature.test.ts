import { fahrenheitToCelsius, celsiusToFahrenheit } from '../src/temperature';

test('Fahrenheit para Celsius: 32°F -> 0°C', () => {
  expect(fahrenheitToCelsius(32)).toBeCloseTo(0);
});

test('Celsius para Fahrenheit: 0°C -> 32°F', () => {
  expect(celsiusToFahrenheit(0)).toBeCloseTo(32);
});