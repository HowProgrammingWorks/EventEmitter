package emitter

type AnyListener func(string, ...interface{})

type Emitter interface {
	On(name string, listener Listener)
	Emit(name string, data ...interface{})
}

type EnhancedEmitter struct {
	EventEmitter
	anyListeners []AnyListener
}

func (eee EnhancedEmitter) Emit(name string, data ...interface{}) {
	ee := eee.EventEmitter
	if name != "*" {
		ee.Emit(name, data...)
	}
	for _, listener := range eee.anyListeners {
		listener(name, data...)
	}
}

func (eee *EnhancedEmitter) OnAny(listener AnyListener) {
	eee.anyListeners = append(eee.anyListeners, listener)
}

func NewEnhancedEmitter() *EnhancedEmitter {
	ee := make(EventEmitter)
	return &EnhancedEmitter{
		ee,
		[]AnyListener{},
	}
}
