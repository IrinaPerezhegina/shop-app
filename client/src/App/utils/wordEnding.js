export const wordEnding = (number) => {
    if (number) {
        return ["2", "3", "4"].some((item) => {
            return (
                item === number.toString().slice(number.toString().length - 1)
            );
        }) &&
            !["12", "13", "14"].some((item) => {
                return (
                    item ===
                    number
                        .toString()
                        .slice(
                            number.toString().length - 2,
                            number.toString().length
                        )
                );
            })
            ? " eдиницы"
            : ["1"].some((item) => {
                  return (
                      item ===
                      number.toString().slice(number.toString().length - 1)
                  );
              }) &&
              !["11"].some((item) => {
                  return (
                      item ===
                      number
                          .toString()
                          .slice(
                              number.toString().length - 2,
                              number.toString().length
                          )
                  );
              })
            ? " единицa"
            : " eдиниц";
    } else return "единица";
};
