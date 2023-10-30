export const data = {
  id: 1,
  name: "alex",
  email: "alex@gmail.com",
  phone: "5675436791",
  role: "CEO",
  teams: [
    {
      id: 2,
      name: "jiya",
      email: "jiya@gmail.com",
      phone: "5675436791",
      role: "head of HR",
      teams: [
        {
          id: 3,
          name: "Charlie",
          role: "team",
          teams: [
            {
              id: 4,
              role: "Lead",
              name: "jhon",
              email: "jhon@gmail.com",
              phone: "5675436791",
            },
            {
              id: 5,
              role: "member",
              name: "kelly",
              email: "kelly@gmail.com",
              phone: "5675436791",
            },
            {
              id: 6,
              role: "member",
              name: "raymond",
              email: "raymond@gmail.com",
              phone: "5675436791",
            },
          ],
        },
      ],
    },
    {
      id: 7,
      role: "head of engineering",
      name: "Laila",
      email: "laila@gmail.com",
      phone: "5675436791",
      teams: [
        {
          id: 8,
          name: "Beta",
          role: "team",
          teams: [
            {
              id: 9,
              role: "lead",
              name: "Krishtan",
              email: "krishtan@gmail.com",
              phone: "5675436791",
            },
            {
              id: 10,
              role: "member",
              name: "trish",
              email: "trish@gmail.com",
              phone: "5675436791",
            },
          ],
        },
      ],
    },
  ],
};
