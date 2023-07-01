import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SelectItem } from './select-item';
import { styles } from './styles';
import { SelectOption, SelectProps } from './type';

import { Modal } from '../modal';

export const Select = (props: SelectProps) => {
  // state
  const [t] = useTranslation();

  const inset = useSafeAreaInsets();

  const {
    textItemStyle,
    rightChildren,
    onPress,
    customItem = undefined,
    useBottomInset = true,
    defaultSelect = t('dialog:select'),
    data = [],
    ...rest
  } = props;

  const [selectedText, setSelectedText] = useState(defaultSelect);

  const [visible, setVisible] = useState(false);

  // function
  const onPressOption = (item: SelectOption, index: number) => {
    setVisible(false);

    setSelectedText(item.text);

    onPress && onPress(item, index);
  };

  const showDrop = () => {
    setVisible(true);
  };

  const hideDrop = () => {
    setVisible(false);
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<SelectOption>) => {
    return (
      <SelectItem
        customItem={customItem}
        index={index}
        item={item}
        onPress={onPressOption}
        textItemStyle={textItemStyle}
      />
    );
  };

  const keyExtractor = useCallback(
    (item: SelectOption) =>
      item.text +
      new Date().getTime().toString() +
      Math.floor(Math.random() * Math.floor(new Date().getTime())).toString(),
    [],
  );

  // style
  const content = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        paddingBottom: useBottomInset ? inset.bottom : 0,
      },
    ],
    [inset.bottom, useBottomInset],
  );

  // render
  return (
    <>
      <View collapsable={false} style={[styles.root]}>
        <TouchableOpacity activeOpacity={0.68} onPress={showDrop}>
          <View style={[styles.rowButton]}>
            <Text>{selectedText}</Text>
            {rightChildren}
          </View>
        </TouchableOpacity>
        <Modal
          backdropOpacity={0.3}
          entering={SlideInDown}
          exiting={SlideOutDown}
          isVisible={visible}
          onBackButtonPress={hideDrop}
          onBackdropPress={hideDrop}
          style={[styles.modal]}
        >
          <View>
            <View style={[styles.content, content]}>
              <FlatList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                {...rest}
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};
