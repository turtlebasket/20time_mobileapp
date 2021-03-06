import {DarkTheme} from '@react-navigation/native'
import appColors from './Colors'

const appNavTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: appColors.black,
    card: appColors.black
  }
};
export default appNavTheme;