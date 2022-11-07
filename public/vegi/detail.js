axios
  .post("/api/product", { data: "채소" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
