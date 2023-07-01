import * as React from 'react';
import {
  ActivityIndicator,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from 'react-native';

import { Icon } from '@components/icon';
import { TouchableScale } from '@components/touch-scale';

import { useSearchBarStyle } from './style';

export interface ISource {
  source: string | { uri: string };
}

export type ISearchBarProps = {
  darkMode?: boolean;
  placeholder?: string;
  ImageComponent?: any;
  spinnerSize?: number;
  spinnerColor?: string;
  spinnerVisibility?: boolean;
  placeholderTextColor?: string;
  searchIconComponent?: React.ReactNode;
  clearIconComponent?: React.ReactNode;
  style?: ViewStyle | Array<ViewStyle> | undefined;
  textInputStyle?: TextStyle | Array<TextStyle>;
  onBlur?: () => void;
  onFocus?: () => void;
  onPress?: () => void;
  onSearchPress?: () => void;
  onClearPress?: () => void;
} & TouchableWithoutFeedbackProps &
  TextInputProps;

export const SearchBar = (props: ISearchBarProps) => {
  const {
    darkMode = false,
    spinnerSize = 12,
    spinnerColor = '#19191a',
    spinnerVisibility = false,
    style,
    onSearchPress,
    searchIconComponent,
    // ImageComponent = Image,
    onBlur,
    onFocus,
    textInputStyle,
    placeholder = 'Search here...',
    placeholderTextColor,
    clearIconComponent,
  } = props;

  const styles = useSearchBarStyle();

  const inputRef = React.useRef<TextInput>(null);

  const handleSearchBarPress = () => {
    inputRef.current?.focus();

    props.onPress && props.onPress();
  };

  const handleOnClearPress = () => {
    inputRef.current?.clear();

    props.onClearPress && props.onClearPress();
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  const renderSpinner = () => {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator color={spinnerColor} size={spinnerSize} />
      </View>
    );
  };

  const renderSearchIcon = () => {
    return (
      <TouchableScale onPress={onSearchPress} style={styles.searchContainer}>
        {searchIconComponent || <Icon icon="search" size={18} />}
      </TouchableScale>
    );
  };

  const renderTextInput = () => {
    let _placeholderTextColor = placeholderTextColor;
    if (!placeholderTextColor) {
      _placeholderTextColor = darkMode ? '#fdfdfd' : '#19191a';
    }

    return (
      <TextInput
        placeholderTextColor={_placeholderTextColor}
        {...props}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        ref={inputRef}
        style={[styles._textInputStyle, textInputStyle]}
      />
    );
  };

  const renderClearIcon = () => {
    return (
      <TouchableScale
        minScale={0.8}
        onPress={handleOnClearPress}
        style={styles.clearIconContainer}
      >
        {clearIconComponent || <Icon icon="close" size={15} />}
      </TouchableScale>
    );
  };

  return (
    <TouchableScale
      {...props}
      containerStyle={[styles._container, style]}
      minScale={0.97}
      onPress={handleSearchBarPress}
    >
      {spinnerVisibility ? renderSpinner() : renderSearchIcon()}
      {renderTextInput()}
      {renderClearIcon()}
    </TouchableScale>
  );
};
