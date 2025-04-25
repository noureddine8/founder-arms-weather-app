import { ActivityIndicator, View, ViewStyle } from "react-native"
import { ThemedStyle } from "../theme"
import { useAppTheme } from "../utils/useAppTheme"

export function Loader() {
  const { themed } = useAppTheme()
  return (
    <View style={themed($loaderContainer)}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const $loaderContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})
