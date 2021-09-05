import Image from "next/image";

function SidebarRow({ src, Icon, title }) {
  return (
    <div className="flex items-center space-x-2 p-4 cursor-pointer hover:bg-gray-500 rounded-xl">
      {src && (
        <Image
          className="rounded-full"
          src={src}
          width={40}
          height={40}
          layout="fixed"
        />
      )}

      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
}

export default SidebarRow;
