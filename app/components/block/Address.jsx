const Address = () => {
  const addressContent = [
    {
      id: 1,
      colClass: "col-lg-3",
      title: "India Office Address",
      content: (
        <>
          Wanderung Guides Private Limited <br />
          <span className="italic fw-400">
            205 Global Business Hub, Kharadi, Pune, 411014, India
          </span>
        </>
      ),
    },
    {
      id: 4,
      colClass: "col-lg-3",
      title: "EU Office Address",
      content: (
        <>
          Yo Tours BV <br />{" "}
          <span className="italic fw-400">
            Utrechtseweg 341, 3818 EL Amersfoort, The Netherlands
          </span>
        </>
      ),
    },
    {
      id: 2,
      colClass: "col-auto",
      title: "Customer Support Number",
      content: (
        <>
          <a href="tel:+918448448434">+918448448434</a>
        </>
      ),
    },
    {
      id: 3,
      colClass: "col-auto",
      title: "Need live support?",
      content: (
        <>
          {" "}
          <a href="mailto:connect@yotours.in">connect@yotours.in</a>
        </>
      ),
    },
  ];
  return (
    <>
      {addressContent.map((item) => (
        <div className={`${item.colClass}`} key={item.id}>
          <div className="text-14 text-light-1">{item.title}</div>
          <div className="text-16 fw-500 mt-10">{item.content}</div>
        </div>
      ))}
    </>
  );
};

export default Address;
