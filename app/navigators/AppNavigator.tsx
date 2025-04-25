/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import * as Screens from "@/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { useAppTheme, useThemeProvider } from "@/utils/useAppTheme"
import { ComponentProps, createContext, Dispatch, SetStateAction, useState } from "react"
import { WeatherResponse } from "../services/api"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Home: undefined
  Weather: undefined
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = function AppStack() {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="Home" component={Screens.HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Weather" component={Screens.WeatherScreen} />
    </Stack.Navigator>
  )
}

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<AppStackParamList>>> {}

export type WeatherContextType = {
  weatherData: WeatherResponse | undefined
  loading: boolean
  setWeatherData: Dispatch<SetStateAction<WeatherResponse | undefined>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

const weatherContextDefaultValue: WeatherContextType = {
  weatherData: undefined,
  loading: false,
  setWeatherData: () => {},
  setLoading: () => {},
}

export const WeatherContext = createContext<WeatherContextType>(weatherContextDefaultValue)

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } =
    useThemeProvider()
  const [weatherData, setWeatherData] = useState<WeatherResponse | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <WeatherContext.Provider value={{ weatherData, setWeatherData, loading, setLoading }}>
        <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
          <AppStack />
        </NavigationContainer>
      </WeatherContext.Provider>
    </ThemeProvider>
  )
}
