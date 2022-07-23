using System.ComponentModel.DataAnnotations;



namespace DeliveryNote.Model
{
   
 public class DeliveryNotes
    {

        [Key]
        public int DeliveryNoteID { get; set; }
        public int DeliveryID { get; set; }
        public int QuotationID { get; set; }
        public DateTime DateSubmitted { get; set; }
        public image POD_image { get; set; }
        //public Quotation? Quotation { get; set; }
        //public Delivery? Delivery { get; set; }
    }
}