import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "@/components"
import { colors, ThemedStyle } from "@/theme"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC, useState } from "react"
import { api } from "../services/api"
import { TxKeyPath } from "../i18n"
import { AppStackScreenProps } from "../navigators"
import { observer } from "mobx-react-lite"

const homeLogo = require("../../assets/images/logo.png")

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({ navigation }) {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const { theme, themed } = useAppTheme()

  const [cityName, setCityName] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<TxKeyPath | undefined>(undefined)

  const onChangeText = (text: string) => {
    setErrorMessage(undefined)
    setCityName(text)
  }

  const onSearchPressed = async () => {
    try {
      const reuslt = await api.getWeatherByCity(cityName)
      navigation.navigate("Weather")
    } catch (error) {
      setErrorMessage("homeScreen:errorMessage")
    }
  }

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <View style={themed($topContainer)}>
        <Image style={themed($homeLogo)} source={homeLogo} resizeMode="contain" />
        <Text
          testID="home-heading"
          style={themed($homeHeading)}
          tx="homeScreen:title"
          preset="heading"
        />
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
})

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
})

const $inputStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginVertical: spacing.lg,
})

const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  backgroundColor: colors.palette.primary600,
  borderColor: colors.border,
})
const $textButton: ThemedStyle<TextStyle> = ({ spacing }) => ({
  color: colors.palette.neutral100,
})

const $disabledButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  opacity: 0.4,
})
const $disabledTextButton: ThemedStyle<TextStyle> = ({ spacing }) => ({
  color: colors.tintInactive,
})
