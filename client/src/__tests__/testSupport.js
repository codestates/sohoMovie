(function () {
  // const log = console.error;
  console.error = (msg, ...args) => {
    console.log(
      `테스트에 문제가 없을 수 있지만, React 관련 에러가 있습니다.
    `,
      msg,
      ...args
    );
    return;
  };
})();
