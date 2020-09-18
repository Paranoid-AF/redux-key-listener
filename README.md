# Redux Key Listener
This is a simple middleware for Redux, which detects changes in state for specific keys that you specified, then trigger whatever you want if things get different.

## Installation
Run the following command:
```
npm i redux-key-listener --save-dev
```
or
```
yarn add redux-key-listener --dev
```
(Depending on which package manager you're using)

## Usage
Steps are below.
### Applying the middleware
When you're creating a store, apply this middleware to it.
```javascript
import keyListenerGenerator from 'redux-key-listener' // You may want to import it first.

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    keyListenerGenerator(ListenerList) // Apply this middleware.
  )
)
```
Wait, you might get an error since you haven't created the `ListenerList` yet. Don't panic, let's move on.

### Creating Listener and ListenerList
`ListenerList` contains multiple instances of `Listener`.
#### ListenerList
**ListenerList** is an object that contains a key-value pair of **a string of key that you want to listen to** and **Listener - a function to handle changes**.

It may look like this:
```javascript
const ListenerList = {
  isVisible: function(){ /* I am a Listener */},
  'user.info.age': function(){ /* I am a Listener */},
  'user.token': function(){ /* I am a Listener */}
}
```
The key in `ListenerList` is the key path in your store's state of Redux, you need to divide the keys with dot to simulate a path.

#### Listener
**Listener** is simply a function that you declare to handle changes.
```typescript
type Listener = (currentValue?: any, previousValue?: any, currentStore?: any, previousStore?: any) => any
```
- `currentValue` is the current value of the key that you're listening here.
- `previousValue` is the previous value, before the action gets dispatched.
- `currentStore` is the current store of Redux.
- `previousStore` is the previous store of Redux, before the action gets dispatched.

You could write something like this:

```javascript
const ListenerList = {
  isVisible: function(currentValue){
    console.log(`Visibility: ${currentValue}`)
  },
  ...
}
```

Now as long as `isVisible` in your Redux's store's state changes, this function will be triggered and make an output to your console.

> PS: You could skip as many arguments as you want, or even include no argument at all.

## TypeScript
This module does support TypeScript, and has definition file built in. Check it out if needed.