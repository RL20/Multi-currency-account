function Inputs({ text, value, parentCallBack, placeholder }) {
  return (
    <div>
      {text}
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          parentCallBack(e.target.value);
        }}
      />
    </div>
  );
}
export default Inputs;
