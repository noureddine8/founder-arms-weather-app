import { TextStyle, View } from "react-native"
import { Text } from "./Text"
import { useAppTheme } from "../utils/useAppTheme"
import { ThemedStyle } from "../theme"
import { TxKeyPath } from "../i18n"

interface TemperatureProps {
  tx?: TxKeyPath | undefined
  title?: string | undefined
  description?: string | undefined
  temperature?: number | undefined
}

export function Temperature(props: TemperatureProps) {
  const { themed } = useAppTheme()
  const { tx, temperature, description, title } = props
  return (
    <View>
      {tx && <Text tx={tx} style={themed($titleStyle)} />}
      {title && <Text text={title} style={themed($titleStyle)} />}
      {description && <Text text={description} style={themed($valueStyle)} />}
      {temperature && <Text text={`${Math.floor(temperature)}°C`} style={themed($valueStyle)} />}
    </View>
  )
}
const $titleStyle: ThemedStyle<TextStyle> = () => ({
  alignSelf: "center",
  fontSize: 28,
  lineHeight: 28,
  margin: 4,
  fontFamily: "omnes",
  fontWeight: "500",
})

const $valueStyle: ThemedStyle<TextStyle> = () => ({
  alignSelf: "center",
  fontSize: 24,
  lineHeight: 24,
  fontFamily: "omnes",
})
