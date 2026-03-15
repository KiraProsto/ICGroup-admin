export default function MainInfo() {
  return (
    <div className="add-main">
      <div className="add__block">
        <h2 className="add__title">Заголовок</h2>
        <input type="text" className="add__input-title" />
      </div>
      <div className="add__block">
        <h2 className="add__title">Автор</h2>
        <input type="text" className="add__input-search" />
      </div>
    </div>
  );
}
