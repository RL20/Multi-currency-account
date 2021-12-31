function Inputs({ text, value, parentCallBack }) {
  return (
    <div>
      {text}
      <input
        value={value}
        onChange={(e) => {
          parentCallBack(e.target.value);
        }}
      />
    </div>
  );
}
export default Inputs;
