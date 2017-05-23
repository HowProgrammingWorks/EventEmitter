using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HowProgrammingWorks.CSharpEvents
{
    public static class ConsoleEventsTest
    {
        public static void SimpleEventFlowTest()
        {
            var simpleEventFlow = new SimpleEventFlow();

            simpleEventFlow.Subscribe();
            simpleEventFlow.Invoke();
            simpleEventFlow.Unsubscribe();

            try
            {
                //Throw exception, because there is no handlers
                simpleEventFlow.Invoke();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception happend. Exception message - {ex.Message}");
            }

            Console.ReadLine();
        }

        public static void JsStyleEmitterTest()
        {
            var emitter = new JsStyleEventEmitter();
            emitter.On("smth", (o =>
            {
                Console.WriteLine("1");
            }));
            emitter.On("smth2", (o =>
            {
                Console.WriteLine("2");
            }));
            emitter.On("*", (o =>
            {
                Console.WriteLine("3");
            }));

            //Emit only 'smth'
            emitter.Emit("smth", new object());

            //Emit all events
            emitter.Emit("*", new object());

            Console.ReadLine();
        }
    }
}
