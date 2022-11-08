// 메인 페이지에 대한 script입니다.

// 서버에 대한 요청 예시
axios
  // post 형식으로 /api/user 주소로 요청을 보내는데 {data: "myData"}라는 데이터와 같이 보냅니다.
  .post("/api/user", { data: "myData" })
  // 이후 요청에대한 응답이 서버로 부터 오면 then 이후의 코드가 실행됩니다.
  .then((data) => {
    console.log(data);
  })
  // 일련의 과정중 에러가 생긴다면 여기로 들어오게 됩니다.
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

//   만약 로그인에 대한 요청을 보내신다면
// 1. 로그인을 위해 필요한 데이터를 담아서 서버로 보냅니다.
// ex) id, pw => {id: "testId", pw : "testPw"}
// 이에 대해 원하는 응답을 담당자에게 전달해주시면 담당자가 해당 응답을 전해주게 됩니다.
// 응답은 then 이후의 data 에 담겨서 정달 되게 됩니다.
// 응답 예시 data.data = {data : "로그인 가능"}

// 로그아웃 기능
