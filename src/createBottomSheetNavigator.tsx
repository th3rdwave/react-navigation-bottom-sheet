import {
  createNavigatorFactory,
  ParamListBase,
  StackNavigationState,
  useNavigationBuilder,
} from '@react-navigation/native';
import * as React from 'react';
import {
  BottomSheetRouter,
  BottomSheetRouterOptions,
} from './BottomSheetRouter';
import { BottomSheetView } from './BottomSheetView';
import type {
  BottomSheetActionHelpers,
  BottomSheetNavigationEventMap,
  BottomSheetNavigationOptions,
  BottomSheetNavigationState,
  BottomSheetNavigatorProps,
} from './types';

function BottomSheetNavigator({
  id,
  children,
  screenListeners,
  screenOptions,
  ...rest
}: BottomSheetNavigatorProps) {
  const { state, descriptors, navigation, NavigationContent } =
    useNavigationBuilder<
      BottomSheetNavigationState<ParamListBase>,
      BottomSheetRouterOptions,
      BottomSheetActionHelpers<ParamListBase>,
      BottomSheetNavigationOptions,
      BottomSheetNavigationEventMap
    >(BottomSheetRouter, {
      id,
      children,
      screenListeners,
      screenOptions,
    });

  return (
    <NavigationContent>
      <BottomSheetView
        {...rest}
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
    </NavigationContent>
  );
}

export const createBottomSheetNavigator = createNavigatorFactory<
  StackNavigationState<ParamListBase>,
  BottomSheetNavigationOptions,
  BottomSheetNavigationEventMap,
  typeof BottomSheetNavigator
>(BottomSheetNavigator);
