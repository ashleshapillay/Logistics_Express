using System.ComponentModel.DataAnnotations;



namespace DeliveryNote.Model
{
   
 public class DeliveryNotes
    {

        [Key]
        public int deliveryNoteID { get; set; }
        public int deliveryID { get; set; }
        public int quotationID { get; set; }
        public DateTime dateSubmitted { get; set; }

        public string cosginee { get; set; }

        public string deliverTo { get; set; }
        public string collectFrom { get; set; }
        public int quantity { get; set; }
        public int weight { get; set; }
        public string description { get; set; }
        public bool recievedQuality { get; set; }
        public string driverName { get; set; }
        public string vehReg { get; set; }
        public DateTime time { get; set; }

        public string printName { get; set; }
        public string trailerReg { get; set; }

        //public image POD_image { get; set; }
        //public Quotation? Quotation { get; set; }
        //public Delivery? Delivery { get; set; }
    }
}