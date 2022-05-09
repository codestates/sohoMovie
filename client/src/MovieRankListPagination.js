export default function MovieRankListPagination({ params, setParams }) {
  const handleSelect = (event) => {
    // TODO: select.page-select를 제어하는 handleSelect 함수를 작성하세요.
    // controlled component가 될 수 있어야 합니다.
    return;
  };

  const handleButton = (event) => {
    // TODO: button.previous-page, button.next-page를 클릭하면 작동하는 handleButton 함수를 작성하세요.
    return;
  };

  return (
    <div className='pagination'>
      {/* TODO: select.page-select 엘리먼트를 생성하세요. */}
      <button className='previous-page'>&#60;</button>
      <span>{1}</span>
      <button className='next-page'>&#62;</button>
    </div>
  );
}
