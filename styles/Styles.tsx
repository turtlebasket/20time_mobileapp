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
  },

  card: {
    // flex: 1,
    backgroundColor: appColors.darker,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 18,
    width: '94%'
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

  pageTitleGreen: {
    textAlign: "left",
    color: appColors.green1,
    fontWeight: 'bold',
    fontSize: 20,
  },

  pageText: {
    color: appColors.white,
    fontSize: 16,
    textAlign: 'left',
  },

  pageTextLarge: {
    fontFamily: "Nunito",
    textAlign: "left",
    color: appColors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },

  pageTextGreenBold: {
    color: appColors.green1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
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
  }
});

export default styles;