import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "@/components"
import { spacing, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { AppStackScreenProps, WeatherContext, WeatherContextType } from "../navigators"
import { FC, useContext } from "react"
import { Temperature } from "../components/Temperature"

const openWeatherImageUrl = "https://openweathermap.org/img/wn"

interface WeatherScreenProps extends AppStackScreenProps<"Weather"> {}

export const WeatherScreen: FC<WeatherScreenProps> = function WeatherScreen() {
  const { themed } = useAppTheme()
  const { weatherData } = useContext<WeatherContextType>(WeatherContext)

  return (
    <Screen safeAreaEdges={["top", "bottom"]} contentContainerStyle={themed($container)}>
      <Text style={themed($titleStyle)} text={weatherData?.name} />
      <View style={themed($weatherBlocView)}>
        <Image
          source={{
            uri: `${openWeatherImageUrl}/${weatherData?.weather[0].icon}@2x.png`,
          }}
          style={themed($imageStyle)}
        />
        <Temperature
          title={weatherData?.weather[0].main}
          description={weatherData?.weather[0].description}
        />

        <View style={themed($tempratureRow)}>
          <Temperature tx="weatherScreen:max" temperature={weatherData?.main.temp} />
          <Temperature tx="weatherScreen:max" temperature={weatherData?.main.temp_max} />
          <Temperature tx="weatherScreen:min" temperature={weatherData?.main.temp_min} />
        </View>
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $weatherBlocView: ThemedStyle<ViewStyle> = ({ colors }) => ({
  marginHorizontal: spacing.md,
  paddingVertical: spacing.lg,
  marginVertical: spacing.lg,
  alignItems: "center",
  borderRadius: spacing.md,
  backgroundColor: colors.palette.neutral100,
  shadowOffset: { height: 4, width: 4 },
  shadowOpacity: 0.3,
  shadowColor: colors.palette.neutral900,
})

const $tempratureRow: ThemedStyle<ViewStyle> = () => ({
  marginTop: spacing.lg,
  flexDirection: "row",
  justifyContent: "space-around",
  width: "100%",
})

const $titleStyle: ThemedStyle<TextStyle> = () => ({
  alignSelf: "center",
  fontSize: 60,
  lineHeight: 60,
  fontFamily: "omnes",
  fontWeight: "bold",
})

const $imageStyle: ThemedStyle<ImageStyle> = () => ({
  width: "50%",
  aspectRatio: 1,
})
