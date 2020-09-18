export type Listener = (currentValue?: any, previousValue?: any, currentStore?: any, previousStore?: any) => any
export interface ListenerList {
  [index: string]: Listener
}
export type keyListener = () => any

export default function keyListenerGenerator(Listeners: ListenerList): keyListener