import {StyleSheet} from 'react-native'
import { appColors }  from "../Colors"

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
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 18,
    width: '94%',
  },

  cardGreen: {
    flex: 1,
    backgroundColor: appColors.green1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 18,
    width: '94%'
  },
  
  cardInvis: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 18,
    width: '94%'
  },

  pageTitle: {
    fontFamily: "Nunito",
    textAlign: "left",
    color: appColors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },

  pageTitleLarge: {
    fontFamily: "Nunito",
    textAlign: "left",
    color: appColors.white,
    fontWeight: 'bold',
    fontSize: 26,
  },

  pageTitleLargeGreen: {
    fontFamily: "Nunito",
    // textAlign: "left",
    textAlign: "center",
    color: appColors.green1,
    fontWeight: 'bold',
    fontSize: 26,
  },

  pageTitleGreen: {
    textAlign: "left",
    color: appColors.green1,
    fontWeight: 'bold',
    fontSize: 20,
  },

  pageText: {
    color: appColors.white,
    fontSize: 14,
    textAlign: 'left',
  },

  pageTextLarge: {
    fontFamily: "Nunito",
    textAlign: "left",
    color: appColors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },

  pageTextLargeGreen: {
    fontFamily: "Nunito",
    textAlign: "left",
    color: appColors.green1,
    fontWeight: 'bold',
    fontSize: 18,
  },

  pageTextGreenBold: {
    color: appColors.green1,
    fontSize: 14,
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
    fontSize: 16 
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
    fontSize: 18,
    marginVertical: 4,
    padding: 10,
    textAlignVertical: 'top'
  },

  textBoxTitle: {
    color: appColors.white,
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 4,
    paddingHorizontal: 12,
  },

  borderBox: {
    borderRadius: 12,
    borderColor: appColors.lightGray,
    borderWidth: 1,
  }

});

export default styles;