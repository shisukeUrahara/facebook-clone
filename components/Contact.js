import Image from "next/image";

function Contact({ src, name }) {
  return (
    <div
      className="flex items-center space-x-3 mb-2 relative
     hover:bg-gray-300 cursor-pointer p-2 rounded-xl"
    >
      <Image
        className="rounded-full"
        objectFit="cover"
        height={40}
        width={40}
        src={src}
        layout="fixed"
      />
      <p>{name}</p>
      <div className="absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full animate-bounce"></div>
    </div>
  );
}

export default Contact;
