import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import type {
  DefaultNavigatorOptions,
  Descriptor,
  NavigationHelpers,
  NavigationProp,
  NavigationState,
  ParamListBase,
  RouteProp,
  StackActionHelpers,
} from '@react-navigation/native';

// TODO: Sheet open / close / snap / events.
export type BottomSheetNavigationEventMap = {};

export type BottomSheetNavigationState<ParamList extends ParamListBase> = Omit<
  NavigationState<ParamList>,
  'routes'
> & {
  type: 'bottom-sheet';
  routes: (NavigationState<ParamList>['routes'][number] & {
    snapToIndex?: number | null;
  })[];
};

export type BottomSheetActionHelpers<ParamList extends ParamListBase> =
  StackActionHelpers<ParamList> & {
    // TODO: index should not be optional, but this causes a type error.
    /**
     * Snap the drawer to a point.
     */
    snapTo(index?: number): void;
  };

export type BottomSheetNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string,
  NavigatorID extends string | undefined = undefined,
> = NavigationProp<
  ParamList,
  RouteName,
  NavigatorID,
  BottomSheetNavigationState<ParamList>,
  BottomSheetNavigationOptions,
  BottomSheetNavigationEventMap
> &
  BottomSheetActionHelpers<ParamList>;

export type BottomSheetScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string,
  NavigatorID extends string | undefined = undefined,
> = {
  navigation: BottomSheetNavigationProp<ParamList, RouteName, NavigatorID>;
  route: RouteProp<ParamList, RouteName>;
};

export type BottomSheetNavigationHelpers = NavigationHelpers<
  ParamListBase,
  BottomSheetNavigationEventMap
>;

// We want it to be an empty object because navigator does not have any additional props
export type BottomSheetNavigationConfig = {};

export type BottomSheetNavigationOptions = Omit<
  BottomSheetModalProps,
  // Remove some props that aren't useful as navigation options.
  | 'containerHeight'
  | 'snapPoints'
  | 'gestureEventsHandlersHook'
  | 'animatedPosition'
  | 'animatedIndex'
  | 'onChange'
  | 'onAnimate'
  | 'onClose'
  | 'children'
  | '$modal'
  | 'waitFor'
  | 'simultaneousHandlers'
> & {
  /**
   * Points for the bottom sheet to snap to. It accepts array of number, string or mix.
   * String values should be a percentage.
   * @example
   * snapPoints={[200, 500]}
   * snapPoints={[200, '%50']}
   * snapPoints={['%100']}
   * @type Array<string | number>
   */
  snapPoints?: Array<string | number>;
};

export type BottomSheetNavigatorProps = DefaultNavigatorOptions<
  ParamListBase,
  BottomSheetNavigationState<ParamListBase>,
  BottomSheetNavigationOptions,
  BottomSheetNavigationEventMap
> &
  BottomSheetNavigationConfig;

export type BottomSheetDescriptor = Descriptor<
  BottomSheetNavigationOptions,
  BottomSheetNavigationProp<ParamListBase>,
  RouteProp<ParamListBase>
>;

export type BottomSheetDescriptorMap = {
  [key: string]: BottomSheetDescriptor;
};
