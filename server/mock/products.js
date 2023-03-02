const products = [
  {
    title: "Кроссовки женские Nike Air Zoom Pegasus 37",
    price: 109.95,
    description:
      "Кроссовки Nike Air Zoom Pegasus 37 помогут открыть второе дыхание, даже если силы на исходе. Классическая удобная посадка в сочетании с мгновенной амортизацией — идеальный выбор для ежедневных пробежек",
    category: "female",
    image: "/assets/productCard/id_1/1.jpg",
    rating: 4,
    article: "4A8BCABDW2",
    amortization:
      "Пеноматериал Nike React и вставка Air Zoom в передней части стопы для мгновенной амортизации.",
    color: ["black"],
    images: [
      {
        black: [
          "/assets/productCard/id_1/1.jpg",
          "/assets/productCard/id_1/2.jpg",
          "/assets/productCard/id_1/3.jpg",
        ],
      },
    ],
    size: ["35", "36", "37", "38", "39", "40"],
  },
  {
    title: "Кроссовки женские Nike Downshifter 11",
    price: 75.95,
    description:
      "Легкие и гибкие кроссовки Nike Downshifter 11 — универсальный выбор для бега. Модель обеспечивает комфорт и поддержку на протяжении всей дистанции.",
    category: "female",
    image: "/assets/productCard/id_2/1.jpg",
    rating: 3,
    article: "H0EPNIIOHW",
    amortization: "Подошва из пеноматериала гасит ударные нагрузки.",
    color: ["white", "pink"],
    images: [
      {
        white: [
          "/assets/productCard/id_2/3.jpg",
          "/assets/productCard/id_2/4.jpg",
        ],
      },
      {
        pink: [
          "/assets/productCard/id_2/1.jpg",
          "/assets/productCard/id_2/2.jpg",
        ],
      },
    ],
    size: ["35", "36", "37", "38", "39", "40"],
  },
  {
    title: "Кроссовки женские Nike Air Max 270",
    price: 80.95,
    description:
      "Легкие и гибкие кроссовки Nike Downshifter 11 — универсальный выбор для бега. Модель обеспечивает комфорт и поддержку на протяжении всей дистанции.",
    category: "female",
    image: "/assets/productCard/id_3/1.jpg",
    rating: 4,
    article: "K4W3KEPI5E",
    amortization:
      "Кроссовки Nike Air Max 270 выполнены в стиле оригинальной модели Air Max 180 1991 года. Розовая воздушная подушка обеспечивает комфорт и добавляет в дизайн ярких красок.",
    color: ["pink"],
    images: [
      {
        pink: [
          "/assets/productCard/id_3/1.jpg",
          "/assets/productCard/id_3/2.jpg",
        ],
      },
    ],
    size: ["35", "36", "37", "38", "39", "40"],
  },
  {
    title: "Кроссовки мужские Nike Crater Remixa",
    price: 70.95,
    description:
      "Кроссовки Nike Crater Remixa — это идеальное сочетание спортивной эстетики и современных технологий.",
    category: "men's",
    image: "/assets/productCard/id_4/1.jpg",
    rating: 4.4,
    article: "IY1ADZR3WA",
    amortization:
      "Толстая подошва из супермягкого пеноматериала Crater для превосходной амортизации и гибкости.",
    color: ["white", "black"],
    images: [
      {
        white: [
          "/assets/productCard/id_4/1.jpg",
          "/assets/productCard/id_4/2.jpg",
        ],
      },
      {
        black: [
          "/assets/productCard/id_4/3.jpg",
          "/assets/productCard/id_4/4.jpg",
        ],
      },
    ],
    size: ["39", "40", "41", "42", "43", "44", "45"],
  },
  {
    title: "Кроссовки мужские Nike Zoom Fly 4",
    price: 90.95,
    description:
      "Беговые кроссовки Nike станут отличным выбором для интенсивных тренировок.",
    category: "men's",
    image: "/assets/productCard/id_5/1.jpg",
    rating: 4,
    article: "0F13M7GFLL",
    amortization:
      "Пеноматериал Nike React гарантирует мягкость и мгновенную амортизацию.",
    color: ["orange"],
    images: [
      {
        orange: [
          "/assets/productCard/id_5/1.jpg",
          "/assets/productCard/id_5/2.jpg",
          "/assets/productCard/id_5/3.jpg",
          "/assets/productCard/id_5/4.jpg",
        ],
      },
    ],
    size: ["39", "40", "41", "42", "43", "44", "45"],
  },
  {
    title: "Кроссовки мужские Nike Air Zoom Superrep 3",
    price: 50.95,
    description:
      "Легкие кроссовки Nike Air Zoom SuperRep 3 разработаны для круговых тренировок и тренировок по системе ВИИТ.",
    category: "men's",
    image: "/assets/productCard/id_6/1.jpg",
    rating: 2,
    article: "NUBUVFMUYY",
    amortization:
      "2 вставки Zoom Air эффективно гасят ударные нагрузки и возвращают энергию каждого шага. Подошва распределяет энергию, помогая стабилизировать стопу.",
    color: ["black"],
    images: [
      {
        black: [
          "/assets/productCard/id_6/1.jpg",
          "/assets/productCard/id_6/2.jpg",
          "/assets/productCard/id_6/3.jpg",
        ],
      },
    ],
    size: ["39", "40", "41", "42", "43", "44", "45"],
  },
  {
    title: "Кроссовки мужские Nike Air Max Pre-Day",
    price: 60.95,
    description:
      "Легкие кроссовки Nike Air Zoom SuperRep 3 разработаны для круговых тренировок и тренировок по системе ВИИТ.",
    category: "men's",
    image: "/assets/productCard/id_7/1.jpg",
    rating: 0,
    article: "RK6YJ64PNU",
    amortization:
      "Амортизация Nike Air, изначально разработанная для скоростного бега, обеспечивает комфорт при движении.",
    color: ["orange"],
    images: [
      {
        orange: [
          "/assets/productCard/id_7/1.jpg",
          "/assets/productCard/id_7/2.jpg",
          "/assets/productCard/id_7/3.jpg",
        ],
      },
    ],
    size: ["39", "40", "41", "42", "43", "44", "45"],
  },
  {
    title: "Кроссовки женские Nike Air Max AP",
    price: 70.95,
    description:
      "Что-то новое и что-то хорошо знакомое. Кроссовки Nike Air Max AP — это идеальный баланс между прошлым и настоящим. Фирменные детали напоминают о легендарных Air Max 97, а обтекаемый силуэт создает современный образ.",
    category: "female",
    image: "/assets/productCard/id_8/1.jpg",
    rating: 0,
    article: "CCTD4QOO54",
    amortization:
      "Полноразмерная вставка Air и подошва из мягкого пеноматериала эффективно амортизируют, обеспечивая комфорт в каждом шаге.",
    color: ["white"],
    images: [
      {
        white: [
          "/assets/productCard/id_8/1.jpg",
          "/assets/productCard/id_8/2.jpg",
          "/assets/productCard/id_8/3.jpg",
        ],
      },
    ],
    size: ["35", "36", "37", "38", "39", "40"],
  },
  {
    title: "Кроссовки женские Nike Air Max Command",
    price: 70.95,
    description:
      "Кроссовки Nike Air Max Command, выполненные в винтажном стиле, — то что нужно для лаконичного спортивного образа.",
    category: "female",
    image: "/assets/productCard/id_9/1.jpg",
    rating: 0,
    article: "RI1QFHRMN6",
    amortization:
      "Полноразмерная промежуточная подошва из пеноматериала служит для амортизации и стабилизации стопы. Воздушная подушка Nike Air Max смягчает каждый твой шаг.",
    color: ["pink", "white", "black", "gray"],
    images: [
      {
        pink: [
          "/assets/productCard/id_9/1.jpg",
          "/assets/productCard/id_9/2.jpg",
          "/assets/productCard/id_9/3.jpg",
        ],
      },
      {
        white: [
          "/assets/productCard/id_9/4.jpg",
          "/assets/productCard/id_9/5.jpg",
          "/assets/productCard/id_9/6.jpg",
        ],
      },
      {
        black: [
          "/assets/productCard/id_9/7.jpg",
          "/assets/productCard/id_9/8.jpg",
          "/assets/productCard/id_9/9.jpg",
        ],
      },
      {
        gray: [
          "/assets/productCard/id_9/10.jpg",
          "/assets/productCard/id_9/11.jpg",
          "/assets/productCard/id_9/12.jpg",
        ],
      },
    ],
    size: ["35", "36", "37", "38", "39", "40"],
  },
  {
    title: "Кроссовки женские Nike Air Huarache",
    price: 90.95,
    description:
      "Возвращение одного из хитов культового дизайнера Nike Тинкера Хэтфилда. Кроссовки Nike Air Huarache, перевернувшие в 91-м представление о комфорте, остаются верны своим идеалам.",
    category: "female",
    image: "/assets/productCard/id_10/1.jpg",
    rating: 2,
    article: "FO1R5ZZEXR",
    amortization:
      "Изначально разработанная для бега система Nike Air для непревзойденной амортизации и легкости. Подошва из мягкого пеноматериала обеспечивает упругость и возвращает энергию во время ходьбы.",
    color: ["white", "black"],
    images: [
      {
        white: [
          "/assets/productCard/id_10/1.jpg",
          "/assets/productCard/id_10/2.jpg",
          "/assets/productCard/id_10/3.jpg",
        ],
      },
      {
        black: [
          "/assets/productCard/id_10/4.jpg",
          "/assets/productCard/id_10/5.jpg",
          "/assets/productCard/id_10/6.jpg",
        ],
      },
    ],
    size: ["35", "36", "37", "38", "39", "40"],
  },
  {
    title: "Кроссовки женские Nike Space Hippie 04",
    price: 90.95,
    description:
      "Создай эффектный образ в спортивном стиле и сделай свой вклад в заботу о природе вместе с Nike Space Hippie 04!",
    category: "female",
    image: "/assets/productCard/id_11/1.jpg",
    rating: 2,
    article: "T8LUME7NYT",
    amortization:
      "Подошва из пеноматериала Crater Foam эффективно поглощает ударные нагрузки и стабилизирует стопу.",
    color: ["pink", "gray"],
    images: [
      {
        pink: [
          "/assets/productCard/id_11/1.jpg",
          "/assets/productCard/id_11/2.jpg",
          "/assets/productCard/id_11/3.jpg",
        ],
      },
      {
        gray: [
          "/assets/productCard/id_11/4.jpg",
          "/assets/productCard/id_11/5.jpg",
          "/assets/productCard/id_11/6.jpg",
        ],
      },
    ],
    size: ["35", "36", "37", "38", "39", "40"],
  },
  {
    title: "Кроссовки женские Nike Joyride Dual Run",
    price: 90.95,
    description:
      "Беги, отдыхая вместе с Nike Joyride Dual Run! Технологичные кроссовки гарантируют непревзойденную амортизацию на протяжении всей дистанции.",
    category: "female",
    image: "/assets/productCard/id_12/1.jpg",
    rating: 5,
    article: "KXCAJ0FX9P",
    amortization:
      "Капсулы из пеноматериала, размещенные в 2 отсеках под пяткой и в средней части стопы, адаптируются к каждому шагу, улучшая стабилизацию и амортизацию. Прочный и легкий пеноматериал в передней части стопы поглощает ударные нагрузки и обеспечивает плавность движений.",
    color: ["white", "gray"],
    images: [
      {
        white: [
          "/assets/productCard/id_12/1.jpg",
          "/assets/productCard/id_12/2.jpg",
          "/assets/productCard/id_12/3.jpg",
        ],
      },
      {
        gray: [
          "/assets/productCard/id_12/4.jpg",
          "/assets/productCard/id_12/5.jpg",
          "/assets/productCard/id_12/6.jpg",
        ],
      },
    ],
    size: ["35", "36", "37", "38", "39", "40"],
  },
  {
    title: "Кроссовки женские Nike Wildhorse 7",
    price: 120.95,
    description:
      "Кроссовки Nike Wildhorse 7 отлично подходят для сложных и экстремальных пробежек по пересеченной местности.",
    category: "female",
    image: "/assets/productCard/id_13/1.jpg",
    rating: 5,
    article: " KJ7698N2JU",
    amortization:
      "Промежуточная подошва из пеноматериала Nike React гарантирует мягкость и гасит удары. На пятке предусмотрены дополнительные амортизирующие вставки.",
    color: ["gray"],
    images: [
      {
        gray: [
          "/assets/productCard/id_13/1.jpg",
          "/assets/productCard/id_13/2.jpg",
          "/assets/productCard/id_13/3.jpg",
        ],
      },
    ],
    size: ["35", "36", "37", "38", "39", "40"],
  },
];

module.exports = products;
