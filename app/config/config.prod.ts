/**
 * These are configuration settings for the production environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
import Config from "react-native-config"

export default {
  API_URL: "https://api.openweathermap.org/data/2.5/weather",
  OPEN_WEATHER_MAP_API_KEY: Config.OPEN_WEATHER_MAP_API_KEY,
}
