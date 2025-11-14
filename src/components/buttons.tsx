import clsx from "clsx";

interface TabButton {
  children: React.ReactNode;
  className?: string;
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({
  children,
  className,
  isActive,
  onClick,
  ...rest
}: TabButton) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={clsx(
        " py-2 px-4 block hover:text-blue-500 focus:outline-none border-b-2",
        className,
        { "text-gray-600": !isActive },
        { "text-blue-500 border-b-2 font-medium border-blue-500": isActive }
      )}
    >
      {children}
    </button>
  );
}
