const Social = () => {
  const socialLinks = [
    {
      id: 1,
      icon: 'facebook',
      link: 'https://www.facebook.com/freewalkingtourindia/',
    },
    { id: 2, icon: 'twitter', link: 'https://twitter.com/yotours_india' },
    {
      id: 3,
      icon: 'instagram',
      link: 'https://www.instagram.com/yotoursindia/?hl=en',
    },
    {
      id: 4,
      icon: 'youtube',
      link: 'https://www.youtube.com/channel/UCXK7BQwtrC9cTQyljZKu1Vg',
    },
  ];

  return (
    <div className="flex gap-4">
      {socialLinks.map((item) => (
        <a
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i
            className={`fab fa-${item.icon} text-xl text-gray-700 hover:text-blue-600`}
          ></i>
        </a>
      ))}
    </div>
  );
};

export default Social;
