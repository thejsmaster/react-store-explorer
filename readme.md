# React Store Explorer

React Store Explorer is a tool designed to visualize and interact with the state of your React application. It allows you to explore state changes, log previous states, and inspect how the state evolves over time. It is useful for debugging and understanding the flow of your application's state management.

## Features

- **State Inspection**: Visualize the current state of your application, with support for complex nested objects and arrays.
- **Change Logging**: Keep track of state changes and view a log of modifications, additions, and deletions.
- **Previous State Views**: Access the history of previous states and inspect how state evolved over time.
- **Collapsible UI**: Group state variables into collapsible sections to make the interface more organized.
- **DevTools Integration**: Integrates directly into the React DevTools, providing a seamless debugging experience.

## Installation

To install React Store Explorer in your project, use npm or yarn:

```bash
npm install react-store-explorer
```

or

```bash
yarn add react-store-explorer
```

## Usage

To integrate React Store Explorer into your application, wrap your component tree with the `StoreExplorer` component and pass your application's stores.

```javascript
import { StoreExplorer } from "react-store-explorer";

// Example Store Implementation
const store = {
  getState: () => ({ count: 0 }),
  subscribe: (callback) => {
    // Call the callback on state changes
    const unsubscribe = () => {
      // Unsubscribe logic
    };
    return unsubscribe;
  },
};

// Add Store Explorer to your component tree
function App() {
  return (
    <StoreExplorer stores={{ store }}>
      <YourComponent />
    </StoreExplorer>
  );
}
```

### DevTools Integration

The explorer includes a collapsible interface and logs for state changes. When enabled, you can toggle the interface by clicking an icon that appears in the corner of the window. To open or close the panel programmatically, use the `keepOpen` prop.

```javascript
<StoreExplorer keepOpen={true} />
```

## API

### `StoreExplorer`

Props:

- **`stores`**: An object containing your application's stores, where each store must have `getState()` and `subscribe()` methods.
- **`keepOpen`**: Boolean to keep the panel open by default.
- **`maxLogCount`**: Number of state changes to store in the log history.
- **`hideIcon`**: Option to hide the toggle icon.
- **`disableToggleESCKey`**: Disables the ESC key for toggling the interface.

## Components

### `ErrorBoundary`

Catches errors in the component tree and displays a fallback UI.

### `Collapsable`

A collapsible wrapper that shows state details and allows toggling visibility.

### `Treeview`

Displays nested objects and arrays in an expandable tree structure.

### `Switch`

Tab-based UI to switch between state views, change logs, and previous states.

## Development

To contribute to React Store Explorer, clone the repository and install dependencies:

```bash
git clone https://github.com/your-repo/react-store-explorer
cd react-store-explorer
npm install
```

Run the development server:

```bash
npm start
```

## License

This project is licensed under the MIT License.
