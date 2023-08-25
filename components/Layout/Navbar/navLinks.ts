type Category = {
  name: string;
  _count: {
    posts: number;
  };
};

// export const navLinksSigned = [
//   {
//     name: "Home",
//     link: "/",
//   },
//   {
//     name: "Add Post",
//     link: "/add-post",
//   },
//   {
//     name: "My Profile",
//     link: "/my-profile",
//   },
// ];

export const navLinksSigned = (categories: Category[]) => {
  return [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Categories",
      subLinks: categories.map((categoty) => ({
        name: categoty.name,
        link: `/category/${categoty.name.toLowerCase()}`,
      })),
    },
    {
      name: "Add Post",
      link: "/add-post",
    },
    {
      name: "My Profile",
      link: "/my-profile/posts",
      subLinks: [
        {
          name: "Posts",
          link: "/my-profile/posts",
        },
        //   {
        //   name: 'Activity Log',
        //   link: `/category/activity-log`,
        // },
        {
          name: "Edit Profile",
          link: "/my-profile/edit-profile",
        },
        {
          name: "Account Setting",
          link: "/my-profile/account-setting",
        },
      ],
    },
  ];
};

export const navLinksUnsigned = (categories: Category[]) => {
  return [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Categories",
      subLinks: categories.map((categoty) => ({
        name: categoty.name,
        link: `/category/${categoty.name.toLowerCase()}`,
      })),
    },
  ];
};
