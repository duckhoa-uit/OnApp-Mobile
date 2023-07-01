import { StyleSheet } from 'react-native';

import colors from '@constants/colors';
import GlobalStyles from '@constants/GlobalStyles';

export default styles = StyleSheet.create({
  timeCardContainer: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B3D3CE',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  timeString: {
    fontSize: GlobalStyles.FONT_SIZE_SECONDARY,
    lineHeight: 12,
    color: colors.TEXT_SECONDARY,
    fontWeight: '500',
  },
  row: { width: '100%', justifyContent: 'space-between' },
});
