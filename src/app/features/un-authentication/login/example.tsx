import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';

import { dispatch } from '@common';
import {
  ActionSheet,
  Block,
  Button,
  CheckBox,
  Divider,
  DropDown,
  HelperText,
  LightBox,
  Otp,
  Progress,
  RadioButton,
  Screen,
  Select,
  Slider,
  Spacer,
  Switch,
  Text,
  TextInput,
  TouchableScale,
} from '@components';
import { FormLoginType } from '@model/authentication';
import { appActions } from '@redux-slice';

import { FormLogin } from './components/form-login';

export const Example = () => {
  // state
  const _refAction = useRef<ActionSheet>();

  const [visible, setVisible] = useState(false);

  const [progress] = useState(10);

  const [sliderProgress, setSliderProgress] = useState<number>(0);

  const [sliderRangeProgress, setSliderRangeProgress] = useState<{
    lower: number;
    upper: number;
  }>({ lower: 0, upper: 0 });

  // function
  const handleSubmit = (data: FormLoginType) => {
    dispatch(appActions.setAppTheme('dark'));

    Alert.alert(JSON.stringify(data));
  };

  const handleShowAction = async () => {
    _refAction.current?.show();
  };

  // render
  return (
    <Block block paddingHorizontal={15} paddingTop={0}>
      <Screen
        backgroundColor={'transparent'}
        bottomInsetColor="transparent"
        scroll
        style={{ paddingVertical: 0, paddingHorizontal: 10 }}
      >
        <FormLogin onSubmit={handleSubmit} />
        <Block block height={150}>
          <LightBox
            source={{
              uri: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}
          />
        </Block>

        <Block direction={'row'} middle paddingVertical={15}>
          <Text>Action Sheet</Text>
          <Spacer width={10} />
          <Button onPress={handleShowAction}>
            <Text>Show Action</Text>
          </Button>
          <ActionSheet
            option={[{ text: 'Option1' }, { text: 'Option2' }]}
            ref={_refAction}
            title={'Select'}
          />
        </Block>
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>Check box</Text>
          <Spacer width={10} />
          <CheckBox onToggle={setVisible} />
        </Block>
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>OTP</Text>
          <Spacer width={10} />
          <Otp length={5} />
        </Block>
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>DropDown</Text>
          <Spacer width={10} />
          <DropDown
            data={[
              { label: 'Option1', value: 1 },
              { label: 'Option2', value: 2 },
            ]}
          />
        </Block>
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>Select</Text>
          <Spacer width={10} />
          <Select data={[{ text: 'Option1' }, { text: 'Option2' }]} />
        </Block>
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>Helper text</Text>
          <Spacer width={10} />
          <Block>
            <HelperText msg={'Helper text'} type={'error'} visible={visible} />
            <HelperText msg={'Helper text'} type={'info'} visible={visible} />
          </Block>
        </Block>
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>Divider</Text>
          <Spacer width={10} />
          <Divider />
        </Block>
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>Progress Circle</Text>
          <Spacer width={10} />
          <Progress progress={progress} type={'circle'} />
        </Block>
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>Progress Line</Text>
          <Spacer width={10} />
          <Progress progress={progress} type={'linear'} />
        </Block>
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>Radio Button</Text>
          <Spacer width={10} />
          <RadioButton />
        </Block>
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>Slider Linear</Text>
          <Spacer width={10} />
          <Block block>
            <Text>{sliderProgress}</Text>
            <Slider onChangeLinear={setSliderProgress} type={'linear'} />
          </Block>
        </Block>
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>Slider Range</Text>
          <Spacer width={10} />
          <Block block>
            <Text>
              {sliderRangeProgress.lower} - {sliderRangeProgress.upper}
            </Text>
            <Spacer height={20} />
            <Slider
              initialRange={[0, 50]}
              onChangeRange={setSliderRangeProgress}
              type={'range'}
            />
          </Block>
        </Block>
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>TextInput</Text>
          <Spacer width={10} />
          <Block block>
            <TextInput label={'TextInput'} />
          </Block>
        </Block>
        <Spacer height={10} />
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>TouchableScale</Text>
          <Spacer width={10} />
          <TouchableScale>
            <Block color={'#bbb'} padding={5}>
              <Text>Press me!</Text>
            </Block>
          </TouchableScale>
        </Block>
        <Spacer height={10} />
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>Switch IOS</Text>
          <Spacer width={10} />
          <Switch />
        </Block>
        <Block direction={'row'} middle paddingVertical={15}>
          <Text>Switch Android</Text>
          <Spacer width={10} />
          <Switch type={'android'} />
        </Block>
      </Screen>
    </Block>
  );
};
