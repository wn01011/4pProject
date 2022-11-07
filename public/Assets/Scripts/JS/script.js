// 서버에 대한 요청 예시

axios
  .post("/api/product", { data: "과일" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
axios
  .post("/api/product", { data: "건어물" })
  .then((data) => {
    console.log(data);
    document.value = data.data[0].allergy;
  })
  .catch((err) => {
    console.error(err);
  });

axios
  .post("/api/product", { data: "수산" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

axios
  .post("/api/product", { data: "정육" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

axios
  .post("/api/product", { data: "국" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

axios
  .post("/api/product", { data: "샐러드" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

axios
  .post("/api/product", { data: "면" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

axios
  .post("/api/product", { data: "생수" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

axios
  .post("/api/product", { data: "쿠키" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
//   만약 로그인에 대한 요청을 보내신다면
// 1. 로그인을 위해 필요한 데이터를 담아서 서버로 보냅니다.
// ex) id, pw => {id: "testId", pw : "testPw"}
// 이에 대해 원하는 응답을 담당자에게 전달해주시면 담당자가 해당 응답을 전해주게 됩니다.
// 응답은 then 이후의 data 에 담겨서 정달 되게 됩니다.
// 응답 예시 data.data = {data : "로그인 가능"}

// 로그아웃 기능
document.getElementById("user_info_dropdown_logout").onclick =
  async function () {
    try {
      const data = await axios.get("/api/user/logout");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
