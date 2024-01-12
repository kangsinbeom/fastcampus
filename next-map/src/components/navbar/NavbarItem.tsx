import Link from "next/link";

interface NavbarItemProps {
  url: string;
  title: string;
  className?: string;
}

const NavbarItem = ({ url, title, className }: NavbarItemProps) => {
  return (
    <Link
      href={url}
      className={`cursor-pointer hover:text-gray-700 ${className}`}
    >
      {title}
    </Link>
  );
};

export default NavbarItem;
