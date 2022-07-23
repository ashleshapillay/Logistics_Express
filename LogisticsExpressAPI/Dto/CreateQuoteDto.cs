namespace LogisticsExpressAPI.Dto
{
    public class CreateQuoteDto
    {
        public int quoteid { get; set; }
        public string PickUpAddress { get; set; }
        public string DropOffAddress { get; set; }
        public int Rate { get; set; }
        public DateTime Quote_Date { get; set; }
        public string Description { get; set; }
        public int customerId { get; set; }
    }
}
