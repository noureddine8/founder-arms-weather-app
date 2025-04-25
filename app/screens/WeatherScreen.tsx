import { ViewStyle } from "react-native"
import { Screen } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "../navigators"
import { FC } from "react"

interface WeatherScreenProps extends AppStackScreenProps<"Weather"> {}

export const WeatherScreen: FC<WeatherScreenProps> = observer(function WeatherScreen() {
  const { theme, themed } = useAppTheme()

  return <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}></Screen>
})

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})
