package emitter

type Listener = func(...interface{})
type EventEmitter map[string][]Listener

func (ee EventEmitter) On(name string, listener Listener) {
	ee[name] = append(ee[name], listener)
}

func (ee EventEmitter) Emit(name string, data ...interface{}) {
	for _, listener := range ee[name] {
		listener(data...)
	}
}
