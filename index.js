const keysDiff = require('object-keys-diff')
const keyListenerGenerator = (Listeners) => {
  return keyListener = store => next => action => {
    const previousStore = store.getState()
    next(action)
    const currentStore = store.getState()
    if(previousStore !== currentStore){
      const ListenerNames = Object.keys(Listeners)
      const Result = keysDiff(previousStore, currentStore, ListenerNames)
      for(let key in Result){
        if(Result[key].different){
          Listeners[key](Result[key].value2, Result[key].value1, currentStore, previousStore)
        }
      }
    }
  }
}

module.exports = keyListenerGenerator