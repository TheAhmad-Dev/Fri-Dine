const restaurants = [
  {
    name: " Monal Lahore",
    seats: 200,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/f5/29/da/view-from-monal-s-courtyard.jpg?w=900&h=500&s=1",
    address: "Monal Lahore,Pir Sohawa Rd, Lahore",
    opening: "12:00",
    closing: "23:59",
  },
  {
    name: " Andaaz Restaurant",
    seats: 100,
    image: "https://theorangewall.com/wp-content/uploads/2020/11/img-20201026-wa0013.jpg",
    address: " Andaaz Restaurant,Walled,City",
    opening: "12:00",
    closing: "23:00",
  },
    {
    name: "  Haveli Restaurant",
    seats: 120,
    image: "https://www.haveli.com.pk/static/media/sultant-galry1.63794d092a68a74cf675.jpeg",
    address: " Haveli Restaurant, Food Street,Lhr",
    opening: "12:00",
    closing: "23:30",
  },
  {
    name: "Butt Karahi – Lakshmi Chowk",
    seats: 80,
    image: "https://static.where-e.com/Pakistan/Lahore/Lahore/Butt-Karahi-Tikka-By-Nadeem-Butt_24591fcb9e3ea1b512b60b5ca196163f.jpg",
    address: " Butt Karahi,Lakshmi Chowk,Lahore",
    opening: "11:00",
    closing: "01:00",
  },
  {
    name: "Salt’n Pepper Village",
    seats: 150,
    image: "https://lh3.googleusercontent.com/p/AF1QipN_aXTeTkhbWZ2mQVZSE1QrhIrtl5vxTJOjPM7n=s680-w680-h510-rw",
    address: "   Salt’n Pepper Village,Gulberg,Lhr",
    opening: "12:00",
    closing: "23:00",
  },

  {
    name: "Cuckoo’s Den",
    seats: 70,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/70/e1/2b/photo4jpg.jpg?w=800&h=500&s=1",
    address: "  Cuckoo’s Den ,Food Street,Lhr",
    opening: "12:00",
    closing: "23:00",
  },
  {
    name: " Cafe Aylanto",
    seats: 60,
    image: "https://scontent.flhe9-1.fna.fbcdn.net/v/t39.30808-6/480998423_683074854384664_8819440899725762760_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=102&ccb=1-7&_nc_sid=2a1932&_nc_ohc=Wv9TFX9A2uoQ7kNvwE12YIh&_nc_oc=Adlw7w2lQCCWLY_hidJ1LcCohT9RB8pl_f-b4GiDw5L5OrYTzsQfjRB9l1cfsdTm1eo&_nc_zt=23&_nc_ht=scontent.flhe9-1.fna&_nc_gid=qJn__9-faLRLHAvZ6ks_Ag&oh=00_AfseWssC2j9b6n7D6rEFkkravKleNVflQaH5plIHVDFFmw&oe=69A31C9B",
    address: "  Cafe Aylanto ,MM Alam Road,Lhr",
    opening: "12:00",
    closing: "23:00",
  },
  {
    name: " Spice Bazaar",
    seats: 100,
    image: "https://static.tossdown.com/site/61918822-fd4c-4541-9048-da6a6d9c8b9f.webp",
    address: "  Spice Bazaar ,Gulberg, Lahore",
    opening: "12:00",
    closing: "23:00",
  },
  {
    name: "Tuscany Courtyard",
    seats: 90,
    image: "https://images.mindtrip.ai/restaurants/89eb/a747/6682/fd21/a007/fe59/be81/83dd",
    address: " Tuscany Courtyard,Lhr",
    opening: "12:00",
    closing: "23:00",
  },
  {
    name: "Arcadian Cafe",
    seats: 110,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/93/8f/47/arcadian-gulberg-new.jpg?w=900&h=500&s=1",
    address: " Arcadian Cafe , Gulberg, Lahore",
    opening: "11:00",
    closing: "23:00",
  },
 {
  name: "McDonald's – Liberty Market",
  seats: 90,
  image: "https://officieldelafranchise.fr/wp-content/uploads/2025/04/Shutterstock_2453997929-1024x710.jpg",
  address: " McDonald's,Gulberg III, Lahore",
  opening: "10:00",
  closing: "02:00",
},

];

const carouselImages = [
  {
    images: [
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
      "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
      "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg" ,
      "https://tripako.com/wp-content/uploads/2021/01/bf8f3e3f639e6e42c4d70d65b84f1481.jpg" ,

    ],
    res_id: "restaurants/restaurant_1"
  },
  {
    images: [
      "https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg",
      "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg",
      "https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg",
      "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg"
    ],
    res_id: "restaurants/restaurant_2"
  },
  {
    images: [
        "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqWD87qmSzCvb0HsI1UM2_6_jRwJjcK1NQTgMYuGWBG9kKPlYMtCxN78tqAvlgORFXw_tL5yG0PqJASV6af7QSnCMu-LrLAHCbSAYFAYGxoag8UuriANufCGOM_5e2Z1odeoaYLuYF_sIJ5=s680-w680-h510-rw",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerAC9IbdN3RH5vY8cPPXMJKnWgznbGhLCZrSd2LdHYE8xTt9A-dKpMiV2TdB4grI2tTn14tcWZXZed5GRC8Z1v45BgZgCDQmfvjMcChMbB0bjiNZwznxllJPJJE3dfy7xeRGlyN91ZDVEy-=s680-w680-h510-rw",
      "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoF_Qwpw5zcIA5aQ_dJZ2lEr5GlqnRVHXxZJaTUiYEa6p81KkBr2IjIHPk36ebWOJG9_1NQHA41k5maX1RoFf22jUfiRyyce4iasFHvPWdvOq6eIo_lmlb_3C08xNLacHrs8yn3vAwHisLb=s680-w680-h510-rw",
      "https://images.pexels.com/photos/1596888/pexels-photo-1596888.jpeg",
      "https://lh3.googleusercontent.com/gps-cs-s/AHVAweo2-sJaImw-T4cdTaiPFk9SPFSIYd2GXpM9p4uAi94LAt4UpU8AqceYv1XPfawc87mUr62fSawzNcLqivEx5RStKdrZL8Bj5Ki2cfQOsf3ICd2WQfw3BfhK1xiLcJc8DXGjThyu=s680-w680-h510-rw",
      "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg" ,
    
    ],
    res_id: "restaurants/restaurant_3"
  },
  {
    images: [
      "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg",
      "https://images.pexels.com/photos/4193840/pexels-photo-4193840.jpeg",
      "https://images.pexels.com/photos/5638735/pexels-photo-5638735.jpeg",
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
    ],
    res_id: "restaurants/restaurant_4"
  },
  {
    images: [
      "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg",
      "https://images.pexels.com/photos/139746/pexels-photo-139746.jpeg",
      "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg",
      "https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg"
    ],
    res_id: "restaurants/restaurant_5"
  },
  {
    images: [
      "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg",
      "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
      "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg"
    ],
    res_id: "restaurants/restaurant_6"
  },
  {
    images: [
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg",
      "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
      "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg"
    ],
    res_id: "restaurants/restaurant_7"
  },
  {
    images: [
      "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg",
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg",
      "https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg"
    ],
    res_id: "restaurants/restaurant_8"
  },
  {
    images: [
      "https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg",
      "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg",
      "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg"
    ],
    res_id: "restaurants/restaurant_9"
  },
  {
    images: [
      "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
      "https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg",
      "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg",
      "https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg"
    ],
    res_id: "restaurants/restaurant_10"
  },
  {
    images: [
      "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg",
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg",
      "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg"
    ],
    res_id: "restaurants/restaurant_11"
  }
];
 const slots = [
  {
    ref_id: "restaurants/restaurant_1",
    slot: ["12:00", "13:30", "15:30", "17:30", "19:30", "21:30"]
  },

  {
    ref_id: "restaurants/restaurant_2",
    slot: ["12:00", "13:00", "14:30", "16:00", "19:00", "23:00"]
  },

  {
    ref_id: "restaurants/restaurant_3",
    slot: ["12:00", "13:00", "15:00", "17:00", "19:00", "21:00", "23:30"]
  },

  {
    ref_id: "restaurants/restaurant_4",
    slot: ["11:00", "13:00", "15:00", "17:00", "19:00", "01:00"]
  },

  {
    ref_id: "restaurants/restaurant_5",
    slot: ["12:00", "13:30", "15:00", "18:00", "20:00" , "23:00"]
  },

  {
    ref_id: "restaurants/restaurant_6",
    slot: ["12:30", "13:30", "15:30", "18:00","20:00", "23:00"]
  },

  {
    ref_id: "restaurants/restaurant_7",
    slot: ["12:00", "13:30", "15:00", "17:00", "19:00" ,"23:00"]
  },

  {
    ref_id: "restaurants/restaurant_8",
    slot: ["12:15", "14:15", "16:15", "18:15", "20:15" ,"23:00"]
  },

  {
    ref_id: "restaurants/restaurant_9",
    slot: ["12:30", "14:45", "16:45", "18:45" , " 22:00"]
  },

  {
    ref_id: "restaurants/restaurant_10",
    slot: ["11:30", "13:30", "15:30", "17:30", "19:30" ,"21:00"]
  },

  {
    ref_id: "restaurants/restaurant_11",
    slot: ["12:00", "14:00", "16:00", "18:00", "20:00"]
  }
];

export  {restaurants , carouselImages , slots};