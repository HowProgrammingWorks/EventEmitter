package main

import (
	"fmt"

	"../emitter"
)

func main() {
	application := emitter.NewEnhancedEmitter()

	application.On("smth", func(data ...interface{}) {
		fmt.Println("Certain event")
		fmt.Println(data...)
	})

	application.OnAny(func(name string, data ...interface{}) {
		fmt.Println("Any event")
		fmt.Println(name, data)
	})

	application.Emit("smth", struct{ A int }{5})
	application.Emit("smth2", struct{ A int }{500})
	application.Emit("*", struct{ A int }{5})
}
