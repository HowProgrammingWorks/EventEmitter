package emitter

type Listener = func(...interface{})
type EventEmitter map[string][]Listener

func (ee EventEmitter) On(name string, listener Listener) {
	var newListeners []Listener
	if listeners, ok := ee[name]; ok {
		newListeners = append(listeners, listener)
	} else {
		newListeners = []Listener{listener}
	}
	ee[name] = newListeners
}

func (ee EventEmitter) Emit(name string, data ...interface{}) {
	if listeners, ok := ee[name]; ok {
		for _, listener := range listeners {
			listener(data...)
		}
	}
}
