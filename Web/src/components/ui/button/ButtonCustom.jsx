export const ButtonIcon = ({ children, onClick, type = "button" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="rounded-full hover:bg-gray-200 p-2"
    >
      <span className="">{children}</span>
    </button>
  );
};

export const ButtonPrimary = ({
  children,
  onClick,
  className,
  type = "button",
  disabled,
}) => {
  return (
    <button
      className={`py-2 px-4 rounded-full text-white bg-[#e60023] hover:bg-[#b60000] ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
