import {StyleSheet} from 'react-native'
import { appColors }  from "./Colors"

const fontSizes = {
  small: 14,
  normal: 16,
  subtitle: 18,
  title: 22
}

const styles = StyleSheet.create({

  container: {
    fontFamily: "Nunito",
    flex: 1,
    flexDirection: "column",
    backgroundColor: appColors.black,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },

  card: {
    // flex: 1,
    backgroundColor: appColors.dark,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginHorizontal: 8,
    marginBottom: 12,
    borderRadius: 8,
  },

  cardGreen: {
    flex: 1,
    backgroundColor: appColors.green1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginHorizontal: 8,
    marginBottom: 12,
    borderRadius: 18,
  },
  
  cardInvis: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginHorizontal: 8,
    marginBottom: 12,
    borderRadius: 18,
    // width: '96%'
  },

  cardInvisCompact: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 0,
    marginHorizontal: 8,
    marginBottom: 0,
    borderRadius: 18,
    // width: '96%',
    justifyContent: 'center',
  },

  pageTitle: {
    fontFamily: "Nunito",
    textAlign: "left",
    color: appColors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.subtitle,
  },

  pageTitleLarge: {
    fontFamily: "Nunito",
    textAlign: "left",
    color: appColors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.title,
  },

  pageTitleLargeGreen: {
    fontFamily: "Nunito",
    // textAlign: "left",
    textAlign: "center",
    color: appColors.green1,
    fontWeight: 'bold',
    fontSize: fontSizes.title,
  },

  pageTitleGreen: {
    textAlign: "left",
    color: appColors.green1,
    fontWeight: 'bold',
    fontSize: fontSizes.subtitle,
  },

  pageText: {
    color: appColors.white,
    fontSize: fontSizes.small,
    textAlign: 'left',
  },

  pageTextLight: {
    color: appColors.lighterGray,
    fontSize: fontSizes.small,
    textAlign: 'left',
  },

  pageTextBold: {
    color: appColors.white,
    fontSize: fontSizes.normal,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  pageTextGreenBold: {
    color: appColors.green1,
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  lightGreen: {
    color: appColors.white,
    backgroundColor: appColors.green1
  },

  lightGray: {
    color: appColors.white,
    backgroundColor: appColors.lightGray
  },

  customButton: {
    color: appColors.white,
    backgroundColor: appColors.green1,
    padding: 10,
    borderRadius: 8,
    margin: 8,
    fontSize: fontSizes.subtitle
  },

  ctrlBtn: {
    margin: 10,
    borderRadius: 10,
  },

  ctrlBtns: {
    marginTop: 10 
  },

  strikethrough: {
    textDecorationLine: 'line-through'
  },

  profilePictureLarge: {
    width: 120,
    height: 120,
    borderRadius: 120/2,
    borderWidth: 2,
    borderColor: appColors.green1
  },

  profilePictureSmall: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    borderWidth: 2,
    borderColor: appColors.green1
  },

  textBox: {
    color: appColors.white,
    fontSize: fontSizes.subtitle,
    marginVertical: 4,
    padding: 10,
    textAlignVertical: 'top',
  },

  textBoxTitle: {
    color: appColors.white,
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    marginVertical: 4,
    paddingHorizontal: 12,
    minWidth: 170,
  },

  borderBox: {
    borderRadius: 12,
    borderColor: appColors.lightGray,
    borderWidth: 1,
  },

  reactNavigationStackHeader: {
    backgroundColor: appColors.black,
    height: 62,
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    height: 60,
    maxHeight: 60,
    paddingHorizontal: 8,
    // paddingVertical: 0,
    marginHorizontal: 10,
    // marginBottom: 0,
    width: '100%',
    justifyContent: 'center',
  },


});

export default styles;