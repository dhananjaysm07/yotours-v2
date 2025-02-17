const Address = () => {
  const addressContent = [
    {
      id: 1,
      colClass: 'col-lg-3',
      title: 'India Office Address',
      content: (
        <>
          Wanderung Guides Private Limited <br />
          <span className="italic font-light">
            205 Global Business Hub, Kharadi, Pune, 411014, India
          </span>
        </>
      ),
    },
    {
      id: 2,
      colClass: 'col-lg-3',
      title: 'EU Office Address',
      content: (
        <>
          Yo Tours BV <br />
          <span className="italic font-light">
            Utrechtseweg 341, 3818 EL Amersfoort, The Netherlands
          </span>
        </>
      ),
    },
    {
      id: 3,
      colClass: 'col-auto',
      title: 'Customer Support Number',
      content: <a href="tel:+918448448434">+91 8448448434</a>,
    },
    {
      id: 4,
      colClass: 'col-auto',
      title: 'Need live support?',
      content: <a href="mailto:connect@yotours.in">connect@yotours.in</a>,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {addressContent.map((item) => (
        <div key={item.id} className={item.colClass}>
          <h3 className="text-sm font-medium text-gray-600">{item.title}</h3>
          <p className="text-md font-semibold mt-2">{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Address;
