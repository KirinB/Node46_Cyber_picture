import { Input } from "antd";

export const InputWithLabel = ({
  label,
  placeholder,
  name,
  id,
  value,
  handleChange,
  handleBlur,
  error,
  touch,
  type,
  disabled = false,
  className,
}) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="mb-2">{label}</label>
        <Input
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          onChange={handleChange}
          value={value}
          onBlur={handleBlur}
          className={className}
        />
        {error && touch && (
          <span className="mt-1 text-sm text-red-500 px-2">{error}</span>
        )}
      </div>
    </>
  );
};

export const InputPasswordWithLabel = ({
  label,
  placeholder,
  name,
  id,
  value,
  handleChange,
  handleBlur,
  error,
  touch,
}) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="mb-2">{label}</label>
        <Input.Password
          placeholder={placeholder}
          name={name}
          id={id}
          onChange={handleChange}
          value={value}
          onBlur={handleBlur}
        />
        {error && touch && (
          <span className="mt-1 text-sm text-red-500 px-2">{error}</span>
        )}
      </div>
    </>
  );
};

export const InputGhost = ({
  label,
  placeholder,
  name,
  id,
  value,
  handleChange,
  handleBlur,
  error,
  touch,
}) => {
  return (
    <>
      <div className="border-b py-2">
        <input
          placeholder={placeholder}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border-none outline-none w-full text-2xl font-bold "
        />
      </div>
    </>
  );
};
