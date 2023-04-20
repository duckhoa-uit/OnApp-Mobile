import { StyleSheet } from 'react-native';

import { INPUT_BG_COLOR } from './constants';

export const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: '#000',
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 6,
    borderBottomColor: 'transparent',
  },
  containerInput: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 5,
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: INPUT_BG_COLOR,
  },
  lineStatus: {
    height: 1,
    width: '10%',
    position: 'absolute',
    bottom: 0,
  },
  multiline: {
    height: 100,
    paddingTop: 10,
  },
  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});
