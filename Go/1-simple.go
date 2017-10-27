package main

import (
	"fmt"

	"./emitter"
)

func main() {
	application := make(emitter.EventEmitter)

	application.On("smth", func(data ...interface{}) {
		fmt.Println(data...)
	})

	application.Emit("smth", struct{ A int }{A: 5})
}
