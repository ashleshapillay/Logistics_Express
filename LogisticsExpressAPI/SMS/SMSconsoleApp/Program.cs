using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;


class Program
{
    static void Main(string[] args)
    {
        
        string accountSid = "AC811ba5df9a8884289999dd4278364774";
        string authToken = "8e25a5c69e5919024e1ebb0165707a94";

        TwilioClient.Init(accountSid, authToken);

        var message = MessageResource.Create(
            body: "Jesslyn Carriers: Delivery Scheduled for" + "15th July before 5:00pm",
            from: new Twilio.Types.PhoneNumber("+12059645509"),
            to: new Twilio.Types.PhoneNumber("+27635086732")
        );

        Console.WriteLine(message.Sid);
    }
}