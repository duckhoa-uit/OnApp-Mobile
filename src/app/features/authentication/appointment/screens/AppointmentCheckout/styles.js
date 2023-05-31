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
  body: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: GlobalStyles.PADDING_DEFAULT

  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: colors.GRAY,
  },
  changeOption: {
    fontSize: GlobalStyles.FONT_SIZE_SECONDARY,
    lineHeight: 15,
    color: colors.TEXT_SECONDARY
  },

  appointmentInfoContainer: {
    marginTop: 15,
    width: '100%',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: colors.BG_BOX
  },
  appointInfoHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  appointInfoContent: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  appointmentInfoIcon: {
    width: 36,
    height: 36,
    backgroundColor: colors.BG_BOX,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  appointInfoText: {
    marginLeft: 15,
    fontWeight: '600',
    fontSize: GlobalStyles.FONT_SIZE,
    lineHeight: 17,
    color: colors.GRAY,
  },

  paymentMethodContainer: {
    width: '100%',
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: colors.BG_BOX,
    paddingHorizontal: GlobalStyles.PADDING_DEFAULT
  },
  paymentMethod: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
    background: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.BG_BOX,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  visa: {
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: 16,
    lineHeight: 19,
    color: colors.GRAY,
  },
  priceSummary: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  priceLabel: {
    fontWeight: '500',
    fontSize: GlobalStyles.FONT_SIZE,
    lineHeight: 17,
    color: colors.TEXT_SECONDARY,
  },
  priceTotal: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
  },

  submitArea: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: GlobalStyles.PADDING_DEFAULT

  },
  submitBtnContainer: {
    flex: 1,
    marginLeft: 28
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
