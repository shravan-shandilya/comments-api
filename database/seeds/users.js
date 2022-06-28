async function seed(knex) {
  await knex("users").insert([
    {
      id: 1,
      fname: "Issa",
      sname: "Odonnell",
      display_picture: "https://api.lorem.space/image/face?w=150&h=150",
    },
    {
      id: 2,
      fname: "Roseanna",
      sname: "Bains",
      display_picture: "https://api.lorem.space/image/face?w=150&h=150",
    },
    {
      id: 3,
      fname: "Esme",
      sname: "Bean",
      display_picture: "https://api.lorem.space/image/face?w=150&h=150",
    },
    {
      id: 4,
      fname: "Niamh",
      sname: "Muir",
      display_picture: "https://api.lorem.space/image/face?w=150&h=150",
    },
    {
      id: 5,
      fname: "Raphael",
      sname: "Reese",
      display_picture: "https://api.lorem.space/image/face?w=150&h=150",
    },
    {
      id: 6,
      fname: "Ayat",
      sname: "Childs",
      display_picture: "https://api.lorem.space/image/face?w=150&h=150",
    },
    {
      id: 7,
      fname: "Hammad",
      sname: "Lynn",
      display_picture: "https://api.lorem.space/image/face?w=150&h=150",
    },
    {
      id: 8,
      fname: "Solomon",
      sname: "Osborne",
      display_picture: "https://api.lorem.space/image/face?w=150&h=150",
    },
  ]);
}

export { seed };
