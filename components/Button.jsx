const Button = ({
  children,
  disabled,
  onClick,
  className,
  submit,
  loading,
  href,
}) => {
  const classForButton =
    "transition duration-500 ease-in-out outline-none shadow border-pink-200 border-b-4 outline-none hover:bg-pink-200 hover:shadow-lg px-2";
  if (className) {
    className += ` ${classForButton}`;
  } else {
    className = classForButton;
  }

  className += loading ? " animate-bounce" : "";
  const type = submit ? "submit" : "";
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={className}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
