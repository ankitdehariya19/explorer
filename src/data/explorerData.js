const explorer = {
  id: 1,
  name: "root",
  isFolder: true,
  items: [
    {
      id: 1.1,
      name: "src",
      isFolder: true,
      items: [
        {
          id: 1.12,
          name: "app",
          isFolder: true,
          items: [],
        },
        {
          id: 1.11,
          name: "hooks",
          isFolder: true,
          items: [],
        },
      ],
    },
    {
      id: 1.2,
      name: "index.js",
      isFolder: false,
    },
  ],
};

export default explorer;
