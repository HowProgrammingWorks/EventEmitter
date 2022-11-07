#include "eventemitter.h"
#include <iostream>

int main() {
  EventEmitter<std::string> ee;
  ee.on("event", []() {
    std::cout << 1;
  });
  auto cancel2 = ee.on("event", []() {
    std::cout << 2;
  });
  ee.on("event", []() {
    std::cout << 3;
  });
  std::cout << "Number of existing event names:" <<
            ee.names().size() << std::endl;
  std::cout <<
            "Number of listeners listening to the event using EventEmitter::count:" <<
            ee.count("event") << std::endl;
  std::cout <<
            "Number of listeners listening to the event using EventEmitter::listeners:" <<
            ee.listeners("event").size() << std::endl;
  ee.emit("event");
  std::cout << std::endl;
  cancel2();
  ee.emit("event");
  std::cout << std::endl;
  ee.clear("event");
  ee.emit("event");

  EventEmitter<std::string, std::string> eeWithArgs;
  eeWithArgs.on("event", [](std::string data) {
    std::cout << data;
  });
  eeWithArgs.emit("event", "hello ");
  eeWithArgs.emit("event", "there");
}
