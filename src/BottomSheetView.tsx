import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { ParamListBase, useTheme } from '@react-navigation/native';
import * as React from 'react';
import type {
  BottomSheetDescriptorMap,
  BottomSheetNavigationConfig,
  BottomSheetNavigationHelpers,
  BottomSheetNavigationProp,
  BottomSheetNavigationState,
} from './types';

type BottomSheetModalScreenProps = BottomSheetModalProps & {
  navigation: BottomSheetNavigationProp<ParamListBase>;
};

function BottomSheetModalScreen({
  navigation,
  index,
  ...props
}: BottomSheetModalScreenProps) {
  const ref = React.useRef<BottomSheetModal>(null);
  const lastIndexRef = React.useRef(index);

  // Present on mount.
  React.useEffect(() => {
    ref.current?.present();
  }, []);

  const isMounted = React.useRef(true);
  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (index != null && lastIndexRef.current !== index) {
      ref.current?.snapToIndex(index);
    }
  }, [index]);

  const onChange = React.useCallback(
    (newIndex: number) => {
      lastIndexRef.current = newIndex;
      if (newIndex >= 0) {
        navigation.snapTo(newIndex);
      }
    },
    [navigation],
  );

  const onDismiss = React.useCallback(() => {
    // BottomSheetModal will call onDismiss on unmount, be we do not want that since
    // we already popped the screen.
    if (isMounted.current) {
      navigation.goBack();
    }
  }, [navigation]);

  return (
    <BottomSheetModal
      ref={ref}
      index={index}
      onChange={onChange}
      onDismiss={onDismiss}
      {...props}
    />
  );
}

type Props = BottomSheetNavigationConfig & {
  state: BottomSheetNavigationState<ParamListBase>;
  navigation: BottomSheetNavigationHelpers;
  descriptors: BottomSheetDescriptorMap;
};

export function BottomSheetView({ state, descriptors }: Props) {
  const { colors } = useTheme();
  const themeBackgroundStyle = React.useMemo(
    () => ({
      backgroundColor: colors.card,
    }),
    [colors.card],
  );
  const themeHandleIndicatorStyle = React.useMemo(
    () => ({
      backgroundColor: colors.border,
    }),
    [colors.border],
  );

  return (
    <BottomSheetModalProvider>
      {state.routes.map((route, i) => {
        const { options, navigation, render } = descriptors[route.key];

        // Top route is the content the bottom sheet is going to be rendered over.
        if (i === 0) {
          return render();
        }

        const {
          index,
          backgroundStyle,
          handleIndicatorStyle,
          snapPoints,
          ...sheetProps
        } = options;

        return (
          <BottomSheetModalScreen
            key={route.key}
            // Make sure index is in range, it could be out if snapToIndex is persisted
            // and snapPoints is changed.
            index={Math.min(
              route.snapToIndex ?? index ?? 0,
              snapPoints.length - 1,
            )}
            snapPoints={snapPoints}
            navigation={navigation}
            backgroundStyle={[themeBackgroundStyle, backgroundStyle]}
            handleIndicatorStyle={[
              themeHandleIndicatorStyle,
              handleIndicatorStyle,
            ]}
            {...sheetProps}
          >
            {render()}
          </BottomSheetModalScreen>
        );
      })}
    </BottomSheetModalProvider>
  );
}
