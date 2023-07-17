import { StyleSheet } from 'react-native';

import ColorPalette from '@constants/colors';
import GlobalStyles from '@constants/GlobalStyles';

export default styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.WHITE,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  /*scoll view settings*/
  ScrollView: {
    width: '100%',
    flexDirection: 'column',
    flex: 1,
  },

  scrollContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: GlobalStyles.PADDING_DEFAULT,
  },
  BigButton: {
    width: '100%',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#E8F3F1',
    borderRadius: 12,
    borderWidth: 1,
    padding: 8,
  },
  doctorImage: {
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    width: 112,
    height: 112,
    overflow: 'hidden',
  },
  doctorInfo: {
    flexDirection: 'column',
    marginLeft: 18,
    flex: 1,
  },
  doctorName: {
    fontSize: GlobalStyles.FONT_SIZE,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    marginTop: 8,
    fontSize: GlobalStyles.FONT_SIZE_SECONDARY,
    color: ColorPalette.TEXT_SECONDARY,
  },
  ratingBox: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F3F1',
    padding: 4,
    borderRadius: 2,
    width: 40,
  },
  rating: {
    marginLeft: 4,
    fontSize: GlobalStyles.FONT_SIZE_SECONDARY,
    color: ColorPalette.GREEN_NEON,
  },
  star: {
    width: 18,
    height: 18,
    color: ColorPalette.GREEN_NEON,
  },
  doctorLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  locationText: {
    marginLeft: 4,
    fontSize: GlobalStyles.FONT_SIZE_SECONDARY,
    color: ColorPalette.TEXT_SECONDARY,
  },
});
