import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetModalProvider,
  BottomSheetView as RNBottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { ParamListBase, useTheme } from '@react-navigation/native';
import * as React from 'react';
import { FullWindowOverlay } from 'react-native-screens';
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
  contentHeight,
  handleHeight,
  index,
  navigation,
  snapPoints,
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
      contentHeight={contentHeight}
      handleHeight={handleHeight}
      index={index}
      snapPoints={snapPoints}
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

const initialDynamicSnapPoints = ['CONTENT_HEIGHT', 'CONTENT_HEIGHT'];

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

  // Avoid rendering provider if we only have one screen.
  const shouldRenderProvider = React.useRef(false);
  shouldRenderProvider.current =
    shouldRenderProvider.current || state.routes.length > 1;

  const firstScreen = descriptors[state.routes[0].key];

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialDynamicSnapPoints);

  return (
    <>
      {firstScreen.render()}
      {shouldRenderProvider.current && (
        <FullWindowOverlay>
          <BottomSheetModalProvider>
            {state.routes.slice(1).map((route) => {
              const { options, navigation, render } = descriptors[route.key];

              const {
                index,
                backgroundStyle,
                handleIndicatorStyle,
                snapPoints = animatedSnapPoints.value,
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
                  contentHeight={animatedContentHeight}
                  handleHeight={animatedHandleHeight}
                  snapPoints={snapPoints}
                  navigation={navigation}
                  backgroundStyle={[themeBackgroundStyle, backgroundStyle]}
                  handleIndicatorStyle={[
                    themeHandleIndicatorStyle,
                    handleIndicatorStyle,
                  ]}
                  {...sheetProps}
                >
                  <RNBottomSheetView onLayout={handleContentLayout}>
                    {render()}
                  </RNBottomSheetView>
                </BottomSheetModalScreen>
              );
            })}
          </BottomSheetModalProvider>
        </FullWindowOverlay>
      )}
    </>
  );
}
