# @th3rdwave/react-navigation-bottom-sheet

Bottom sheet navigator for React Navigation.

Integrates [@gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet) with [React Navigation](https://github.com/react-navigation/react-navigation).

## Installation

```sh
yarn add @th3rdwave/react-navigation-bottom-sheet @react-navigation/native @gorhom/bottom-sheet
```

If you don't have those already, you will also need to install the [@gorhom/bottom-sheet dependencies](https://gorhom.github.io/react-native-bottom-sheet/#dependencies) react-native-reanimated and react-native-gesture-handler.

## Usage

```js
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";

// ...

const BottomSheet = createBottomSheetNavigator();

<BottomSheet.Navigator
  // Default options
  screenOptions={{ snapPoints: ["60%", "90%"] }}
>
  {/* The first screen should be your app content */}
  <BottomSheet.Screen name="app" component={MyApp} />
  <BottomSheet.Screen name="firstSheet" component={FirstSheetComponent} />
  <BottomSheet.Screen
    name="secondSheet"
    component={SecondSheetComponent}
    // Can pass any prop from @gorhom/bottom-sheet
    options={{ snapPoints: [200, "100%"], index: 1 }}
  />
</BottomSheet.Navigator>;

// ...

// Open like any regular react-navigation screen.
navigation.navigate("firstSheet", { id: 1 });

```

See the [example app](./example/src/SimpleExample.tsx) for full usage details.

## API

### Navigation options

#### `snapPoints`

```ts
Array<string | number>
```

Points for the bottom sheet to snap to, points should be sorted from bottom to top. It accepts array of number and string.

Defaults to `['66%']`.

#### Other options

Most props from bottom sheet are exposed as navigation options. See the [@gorhom/bottom-sheet website](https://gorhom.github.io/react-native-bottom-sheet/props) for full documentation.

### Navigation helpers

Navigation helpers are available on the `navigation` object.

#### `snapTo`

```ts
(index: number) => void
```

Snaps the current sheet to `index`.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
