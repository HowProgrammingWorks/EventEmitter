#include <map>
#include <list>
#include <functional>

template <typename EventName, typename... Arguments> class EventEmitter {
 private:
  std::map<EventName, std::map<int, std::function<void(Arguments...)>>>
  events;
  unsigned long long listenerKey = 0;
 public:
  std::function<void()> on(EventName event,
                           std::function<void(Arguments...)> listener) {
    auto key = listenerKey;
    auto unsubscribe = [ =, this ]() {
      events[event].erase(key);
    };
    events[event][key] = listener;
    listenerKey++;
    return unsubscribe;
  }
  void emit(EventName event, Arguments... args) {
    if (events.contains(event)) {
      for (auto listener : events[event]) {
        listener.second(args...);
      }
    }
  }
  void clear(EventName event) {
    events[event].clear();
  }
  int count(EventName event) {
    return events.contains(event) ? events[event].size() : 0;
  }
  std::list<std::function<void(Arguments...)>> listeners(EventName event) {
    std::list<std::function<void(Arguments...)>> result;

    if (events.contains(event))
      for (auto listener : events[event]) {
        result.push_back(listener.second);
      }

    return result;
  }
  std::list<EventName> names() {
    std::list<EventName> result;

    for (auto event : events) {
      result.push_back(event.first);
    }

    return result;
  }
};
