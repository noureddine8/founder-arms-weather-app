import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "@/components"
import { colors, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC, useContext, useState } from "react"
import { api } from "../services/api"
import { TxKeyPath } from "../i18n"
import { AppStackScreenProps, WeatherContext, WeatherContextType } from "../navigators"
import { Loader } from "../components/Loader"
import { errorKindToKeyPath } from "../utils/hepler"

const weatherLogo = require("../../assets/images/weather.png")

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = function HomeScreen({ navigation }) {
  const { themed } = useAppTheme()
  const { loading, setWeatherData, setLoading } = useContext<WeatherContextType>(WeatherContext)

  const [cityName, setCityName] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<TxKeyPath | undefined>(undefined)

  const onChangeText = (text: string) => {
    setErrorMessage(undefined)
    setCityName(text)
  }

  const onSearchPressed = async () => {
    setLoading(true)
    setErrorMessage(undefined)
    try {
      const reuslt = await api.getWeatherByCity(cityName)
      setLoading(false)

      if (reuslt.kind === "ok") {
        setWeatherData(reuslt.weather)
        navigation.navigate("Weather")
        return
      }
      setErrorMessage(errorKindToKeyPath(reuslt.kind))
    } catch {
      setLoading(false)
      setErrorMessage("homeScreen:errorMessage")
    }
  }
  if (loading) {
    return <Loader />
  }
  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <View style={themed($topContainer)}>
        <Image style={themed($homeLogo)} source={weatherLogo} resizeMode="contain" />
        <Text
          testID="home-heading"
          style={themed($homeHeading)}
          tx="homeScreen:title"
          preset="heading"
        />
        <Text testID="home-heading" style={themed($homeHeading)} preset="heading" />
        <TextField
          placeholderTx="homeScreen:inputPlaceholder"
          value={cityName}
          onChangeText={onChangeText}
          containerStyle={themed($inputStyle)}
          helperTx={errorMessage}
          status={errorMessage ? "error" : undefined}
        />
        <Button
          tx="homeScreen:buttonLabel"
          onPress={onSearchPressed}
          disabled={!cityName}
          style={themed($button)}
          textStyle={themed($textButton)}
          disabledStyle={themed($disabledButton)}
          disabledTextStyle={themed($disabledTextButton)}
        />
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.lg,
})

const $homeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 88,
  width: "100%",
  marginVertical: spacing.xxl,
})

const $homeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  fontFamily: "omnes",
})

const $inputStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginVertical: spacing.lg,
})

const $button: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: colors.palette.primary600,
  borderColor: colors.border,
})
const $textButton: ThemedStyle<TextStyle> = () => ({
  color: colors.palette.neutral100,
  fontWeight: "bold",
})

const $disabledButton: ThemedStyle<ViewStyle> = () => ({
  opacity: 0.4,
})
const $disabledTextButton: ThemedStyle<TextStyle> = () => ({
  color: colors.tintInactive,
  fontFamily: "omnes",
  fontWeight: "bold",
})
