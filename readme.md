# Dev tools for zustand, redux and get-set-react

This library helps you visualise, log, debug, track state of any react application that uses **zustand**, **redux** or [get-set-react](https://www.npmjs.com/package/get-set-react). This opens dev tools inside the app so you don't need to open console to see what the state is.

Simply use **<StoreExplorer />** at app level in order to render dev tools. press **Esc** key to open it or you can click on the three dot icon.

**you can control on which environment or domain you want to render these dev tools.**

## using with zustand

[stackblitz demo link](https://stackblitz.com/edit/vitejs-vite-3nn61v?file=src%2FApp.tsx)

```javascript
import { create, useStore } from "zustand";
import { StoreExplorer } from "react-store-explorer";

const store = create(() => ({ count: 0 }));

const incr = () => {
  store.setState((s) => ({ count: s.count + 1 }));
};
const stores = { store };

function App() {
  const { count } = useStore(store);
  return (
    <StoreExplorer
      stores={stores}
      iconColor={"green"}
      enableDevTools={true}
    >
      <div className="card">
        <button onClick={() => incr()}>count is {count}</button>
      </div>
    </StoreExplorer>
  );
}

export default App;
```

## Installation

To install React Store Explorer in your project, use npm or yarn:

```bash
npm install react-store-explorer
```

or

```bash
yarn add react-store-explorer
```

## using with get-set-react

[Stackblitz example](https://stackblitz.com/edit/vitejs-vite-y9jndics?file=src%2FApp.tsx)

```javascript
import { create, useGet } from "get-set-react";
import { StoreExplorer } from "react-store-explorer";

const store = create({ count: 0 });

const incr = () => {
  store.update((s) => s.count++));
};
const stores = { store };

function App() {
  const { count } = useGet(store);
  return (
    <StoreExplorer
      stores={stores}
      iconColor={"green"}
      enableDevTools={true}
    >
      <div className="card">
        <button onClick={() => incr()}>count is {count}</button>
      </div>
    </StoreExplorer>
  );
}

export default App;
```

## using with redux

[stackblitz demo link](https://stackblitz.com/edit/vitejs-vite-jqw6dq?file=src%2FApp.tsx)

```javascript
import React from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import { StoreExplorer } from "react-store-explorer";

// Action Types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// Action Creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// Initial State
const initialState = {
  count: 0,
};

// Reducer
const counterReducer = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Store
const store = createStore(counterReducer);

// Counter Component
const Counter = () => {
  const count = useSelector((state: { count: number }) => state.count);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "50px", width: "100%" }}>
      <h3>Counter: {count}</h3>
      <button
        onClick={() => dispatch(increment())}
        style={{ fontSize: "20px", marginRight: "10px" }}
      >
        +
      </button>
      <button
        onClick={() => dispatch(decrement())}
        style={{ fontSize: "20px", marginLeft: "10px" }}
      >
        -
      </button>
    </div>
  );
};

// App Component
const App = () => {
  return (
    <Provider store={store}>
      <StoreExplorer stores={{ store }}>
        <Counter />
      </StoreExplorer>
    </Provider>
  );
};

export default App;
```

## Features

- **State Inspection**: Visualize the current state of your application, with support for complex nested objects and arrays.
- **Change Logging**: Keep track of state changes and view a log of modifications, additions, and deletions.
- **Previous State Views**: Access the history of previous states and inspect how state evolved over time.

### DevTools Integration

The explorer includes a collapsible interface and logs for state changes. When enabled, you can toggle the interface by clicking an icon that appears in the corner of the window. To open or close the panel programmatically, use the `keepOpen` prop.

```javascript
<StoreExplorer keepOpen={true} />
```

## API

### `StoreExplorer`

**`Props:`**

- **`stores`**: An object containing your application's stores, where each store must have `getState()` and `subscribe()` methods.
- **`iconColor`**: string: css color value to customise the icon's color
- **`hideIcon`** : boolean: to hide the icon, you can use esc key to show or hide the panel.
- **`XIconPosition`** : { bottom: "50px", right: "50px" } : to position the icon.
- **`keepOpen`**: boolean : to keep the panel open by default.
- **`maxLogCount`**: number : of state changes to store in the log history.
- **`hideIcon`**: boolean : Option to hide the toggle icon. when icon is hidden, press 'Esc' key to toggle open.
- **`disableToggleESCKey`**: boolean: Disables the ESC key for toggling the interface.

## Development

To contribute to React Store Explorer, clone the repository and install dependencies:

```bash
git clone https://github.com/thejsmaster/react-store-explorer
cd react-store-explorer
npm install
```

to build the package:

```bash
npm run build
```

## License

This project is licensed under the MIT License.