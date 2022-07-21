using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Iteration_6.Models
{
    public class ClientFeedback
    {
        [Key]
        public int FeedbackID { get; set; }
        public string Description { get; set; } = String.Empty;
        public string Rating { get; set; } = String.Empty;

        [JsonIgnore]
        public Customer? Customer { get; set; } //MANY feedbacks from ONE Customer
        public int CustomerId { get; set; }

        
    }
}
