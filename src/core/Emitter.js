export class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}


// example
// const emitter = new Emitter()

// const unsub = emitter.subscribe('ruslan', data => console.log('Sub:', data))
// emitter.emit('123', [1, 2])

// setTimeout(() => {
//   emitter.emit('ruslan', 'After 2 seconds')
// }, 2000)

// setTimeout(() => {
//   unsub()
// }, 3000)

// setTimeout(() => {
//   emitter.emit('ruslan', 'After 4 seconds')
// }, 4000)