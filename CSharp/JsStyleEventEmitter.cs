using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HowProgrammingWorks.CSharpEvents
{
    public class JsStyleEventEmitter
    {

        private readonly Dictionary<string, List<Action<object>>> _eventsDictionary;
        
        public JsStyleEventEmitter()
        {
            this._eventsDictionary = new Dictionary<string, List<Action<object>>>();
        }

        public void On(string name, Action<object> action)
        {
            List<Action<object>> subscribedActions;
            if (_eventsDictionary.TryGetValue(name, out subscribedActions))
            {
                subscribedActions.Add(action);
            }
            else
            {
                _eventsDictionary.Add(name, new List<Action<object>> { action });
            }
        }
        
        public void Emit(string name, object data)
        {
            if (name == "*")
            {
                foreach (var currentEvent in _eventsDictionary)
                {
                    foreach (var action in currentEvent.Value)
                    {
                        action(data);
                    }
                }
            }
            else
            {

                List<Action<object>> subscribedActions;
                if (!_eventsDictionary.TryGetValue(name, out subscribedActions))
                {
                    Console.WriteLine("Action does not exist");
                }
                else
                {
                    foreach (var action in subscribedActions)
                    {
                        action(data);
                    }
                }
            }
        }
        
        public void RemoveListener(string name, Action<object> action)
        {
            List<Action<object>> subscribedActions;
            if (!this._eventsDictionary.TryGetValue(name, out subscribedActions))
            {
                Console.WriteLine("Action does not exist");
            }
            else
            {
                var currentEvent = subscribedActions.Exists(e => e == action);
                if (currentEvent == false)
                {
                    Console.WriteLine("Event does not exist");
                }
                else
                {
                    subscribedActions.Remove(action);
                }
            }
        }
        
        public void RemoveAllListeners(string name)
        {
            List<Action<object>> subscribedActions;
            if (!this._eventsDictionary.TryGetValue(name, out subscribedActions))
            {
                Console.WriteLine("Action does not exist");
            }
            else
            {
                subscribedActions.RemoveAll(x => x != null);
            }
        }

    }
}
