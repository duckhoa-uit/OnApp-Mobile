import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { SlideInDown, SlideOutDown } from 'react-native-reanimated';

import { execFunc } from '@common';

import { styles } from './styles';
import { ActionSheetProps, OptionData } from './type';

import { Button } from '../button';
import { Divider } from '../divider';
import { Modal } from '../modal';

export const ActionSheet = forwardRef((props: ActionSheetProps, ref) => {
  // state
  const [t] = useTranslation();

  const {
    title,
    rootStyle,
    onPressCancel,
    wrapCancelStyle,
    textOptionStyle,
    wrapOptionStyle,
    onBackDropPress: onBackDropPressOverwrite,
    textCancelStyle: textCancelStyleOverwrite,
    onPressOption,
    textCancel = t('dialog:cancel'),
    backDropColor = 'rgba(0,0,0,.5)',
    closeOnBackDropPress = true,
    option = [],
  } = props;

  const [actionVisible, setActionVisible] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setActionVisible(true);
      },
      hide: () => {
        setActionVisible(false);
      },
    }),
    [],
  );

  // function
  const onPress = useCallback(
    (item: OptionData, index: number) => {
      return () => {
        setActionVisible(false);

        onPressOption && onPressOption(item, index);
      };
    },
    [onPressOption],
  );

  const onCancel = useCallback(() => {
    onPressCancel && onPressCancel();

    setActionVisible(false);
  }, [onPressCancel]);

  const onBackDropPress = useCallback(() => {
    execFunc(onBackDropPressOverwrite);

    if (closeOnBackDropPress) {
      setActionVisible(false);
    }
  }, [closeOnBackDropPress, onBackDropPressOverwrite]);

  // render
  return (
    <Modal
      backdropColor={backDropColor}
      backdropOpacity={1}
      entering={SlideInDown}
      exiting={SlideOutDown}
      isVisible={actionVisible}
      onBackButtonPress={onCancel}
      onBackdropPress={onBackDropPress}
      style={[styles.modal]}
    >
      <View style={[styles.wrap, rootStyle]}>
        <View style={[styles.wrapOption, wrapOptionStyle]}>
          {title &&
            (React.isValidElement(title) ? (
              title
            ) : (
              <>
                <View style={[styles.wrapTitle]}>
                  <Text children={title + ''} style={[styles.title]} />
                </View>
                <Divider />
              </>
            ))}
          {option.map((item: OptionData, index: number) => {
            return (
              <Button key={item.text} onPress={onPress(item, index)}>
                <View style={[styles.wrapTextOption]}>
                  <Text children={item.text} style={[textOptionStyle]} />
                </View>
              </Button>
            );
          })}
        </View>
        <View style={[styles.wrapCancel, wrapCancelStyle]}>
          <Button onPress={onCancel}>
            <View style={[styles.wrapTextCancel]}>
              <Text
                children={textCancel}
                style={[styles.textCancel, textCancelStyleOverwrite]}
              />
            </View>
          </Button>
        </View>
      </View>
    </Modal>
  );
});

export interface ActionSheet {
  show(): void;
  hide(): void;
}
