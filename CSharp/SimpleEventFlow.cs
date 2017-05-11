using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HowProgrammingWorks.CSharpEvents
{
    public class SimpleEventFlow
    {
        private event EventHandler SimpleEvent;

        public void Subscribe()
        {
            SimpleEvent += DoWork;
        }

        public void Unsubscribe()
        {
            SimpleEvent -= DoWork;
        }

        public void Invoke()
        {
            SimpleEvent.Invoke(this,new EventArgs());
        }

        private void DoWork(object sender, EventArgs e)
        {
            Console.WriteLine($"Event invoked by sender {sender}. Event arguments - {e}");
        }
    }
}
