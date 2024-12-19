const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "Customer Support Number",
      action: "tel:+918448448434",
      text: "+918448448434",
    },
    {
      id: 2,
      title: "Booking Support",
      action: "mailto:connect@yotours.in",
      text: "connect@yotours.in",
    },
    {
      id: 3,
      title: "Partnerships Support",
      action: "mailto:info@yotours.in",
      text: "info@yotours.in",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mt-0" key={item.id}>
          <div className={"text-14 mt-0"}>{item.title} </div>
          <a
            href={item.action}
            className="text-16 fw-700 text-blue-1 mt-2"
            style={{ color: "#C9305F" }}
          >
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
