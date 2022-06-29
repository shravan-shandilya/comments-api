async function seed(knex) {
  await knex("users").insert([
    {
      id: 1,
      fname: "Issa",
      sname: "Odonnell",
      display_picture:
        "https://res.cloudinary.com/liveweb/image/upload/ghost/1.jpg",
    },
    {
      id: 2,
      fname: "Roseanna",
      sname: "Bains",
      display_picture:
        "https://res.cloudinary.com/liveweb/image/upload/ghost/2.jpg",
    },
    {
      id: 3,
      fname: "Esme",
      sname: "Bean",
      display_picture:
        "https://res.cloudinary.com/liveweb/image/upload/ghost/3.jpg",
    },
    {
      id: 4,
      fname: "Niamh",
      sname: "Muir",
      display_picture:
        "https://res.cloudinary.com/liveweb/image/upload/ghost/4.jpg",
    },
    {
      id: 5,
      fname: "Raphael",
      sname: "Reese",
      display_picture:
        "https://res.cloudinary.com/liveweb/image/upload/ghost/5.jpg",
    },
    {
      id: 6,
      fname: "Ayat",
      sname: "Childs",
      display_picture:
        "https://res.cloudinary.com/liveweb/image/upload/ghost/6.jpg",
    },
    {
      id: 7,
      fname: "Hammad",
      sname: "Lynn",
      display_picture:
        "https://res.cloudinary.com/liveweb/image/upload/ghost/7.jpg",
    },
    {
      id: 8,
      fname: "Solomon",
      sname: "Osborne",
      display_picture:
        "https://res.cloudinary.com/liveweb/image/upload/ghost/8.jpg",
    },
    {
      id: 9,
      fname: "Hammad",
      sname: "Lynn",
      display_picture:
        "https://res.cloudinary.com/liveweb/image/upload/ghost/9.jpg",
    },
    {
      id: 10,
      fname: "Solomon",
      sname: "Osborne",
      display_picture:
        "https://res.cloudinary.com/liveweb/image/upload/ghost/10.jpg",
    },
  ]);
}

export { seed };
