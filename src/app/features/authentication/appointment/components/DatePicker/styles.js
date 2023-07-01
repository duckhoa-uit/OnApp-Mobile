import { StyleSheet } from 'react-native';

import colors from '@constants/colors';

export default styles = StyleSheet.create({
  dateCardContainer: {
    flexDirection: 'column',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.BG_BOX,
    height: 72,
    width: 56,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  dateString: {
    fontSize: 10,
    lineHeight: 12,
    color: colors.TEXT_SECONDARY,
  },
  dateNumber: {
    marginTop: 6,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: colors.GRAY,
  },
});
