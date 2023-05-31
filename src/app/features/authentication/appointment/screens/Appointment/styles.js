import colors from '@constants/colors';
import GlobalStyles from '@constants/GlobalStyles';
import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.WHITE,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  backWard: {
    width: 40,
    height: 40
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000'
  },
  body: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: GlobalStyles.PADDING_DEFAULT
  },
  avatar: {
    width: 95,
    height: 95,
    backgroundColor: '#C4C4C4',
    borderRadius: 10
  },
  information: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  info: {
    flexDirection: 'column',
    marginLeft: 18,
    flex: 1
  },
  doctorImage: {
    width: 115,
    height: 115,
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  name: {
    fontSize: GlobalStyles.FONT_SIZE,
    fontWeight: 'bold',
    color: '#000000'
  },
  doctorInfo: {},
  BriefInfo: {
    marginTop: 30
  },
  datePickerContainer: {
    marginTop: 30,
    width: '100%'
  },
  timePickerContainer: {
    marginTop: 15,
    width: '100%'
  },
  BriefLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.GRAY,
    lineHeight: 19
  },
  BriefContent: {
    marginTop: 10,
    fontSize: GlobalStyles.FONT_SIZE_SECONDARY,
    color: colors.TEXT_SECONDARY,
    lineHeight: 20
  },

  submitArea: {
    paddingTop: 10,
    width: '100%',
    paddingHorizontal: GlobalStyles.PADDING_DEFAULT
  },
  submitBtnContainer: {
    width: '100%',
    marginTop: 60
  },
  submitBtn: {
    width: '100%',
    backgroundColor: colors.PRIMARY,
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBtn: {
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: GlobalStyles.FONT_SIZE
  }
});
