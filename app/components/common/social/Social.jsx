const Social = () => {
  const socialContent = [
    {
      id: 1,
      icon: "icon-facebook",
      link: "https://www.facebook.com/freewalkingtourindia/",
    },
    { id: 2, icon: "icon-twitter", link: "https://twitter.com/yotours_india" },
    {
      id: 3,
      icon: "icon-instagram",
      link: "https://www.instagram.com/yotoursindia/?hl=en",
    },
    {
      id: 4,
      icon: "icon-play",
      link: "https://www.youtube.com/channel/UCXK7BQwtrC9cTQyljZKu1Vg",
    },
  ];
  return (
    <>
      {socialContent.map((item) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
        >
          <i className={`${item.icon} text-14`} />
        </a>
      ))}
    </>
  );
};

export default Social;
