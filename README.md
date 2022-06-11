# @th3rdwave/react-navigation-bottom-sheet

Bottom sheet component for React Navigation

## Installation

```sh
yarn install @th3rdwave/react-navigation-bottom-sheet @react-navigation/native @gorhom/bottom-sheet
```

If you don't have those already, you will also need to install the [@gorhom/bottom-sheet dependencies react-native-reanimated and react-native-gesture-handler](https://gorhom.github.io/react-native-bottom-sheet/#dependencies).

## Usage

```js
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";

// ...

const BottomSheet = createBottomSheetNavigator();

<BottomSheet.Navigator
  // Default options
  screenOptions={{ snapPoints: ["60%", "90%"] }}
>
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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
