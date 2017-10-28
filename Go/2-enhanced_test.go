package emitter

import "fmt"

func ExampleEnhancedEmitter() {
	application := NewEnhancedEmitter()

	application.On("smth", func(data ...interface{}) {
		fmt.Println("Certain event")
		fmt.Println(data...)
	})

	application.OnAny(func(name string, data ...interface{}) {
		fmt.Println("Any event")
		fmt.Print(name + " ")
		fmt.Println(data...)
	})

	application.Emit("smth", struct{ A int }{5})
	application.Emit("smth2", struct{ A int }{500})
	application.Emit("*", struct{ A int }{5})
	// Output:
	// Certain event
	// {5}
	// Any event
	// smth {5}
	// Any event
	// smth2 {500}
	// Any event
	// * {5}
}
