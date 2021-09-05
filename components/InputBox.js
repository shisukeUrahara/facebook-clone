import { useSession } from "next-auth/client";
import Image from "next/image";
import {
  BellIcon,
  CameraIcon,
  ChatIcon,
  ChevronDownIcon,
  EmojiHappyIcon,
  HomeIcon,
  UserGroupIcon,
  VideoCameraIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

function InputBox() {
  const [session] = useSession();
  const sendPost = (e) => {
    e.preventDefault();
    alert("post submitted");
  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex items-center space-x-4 p-4">
        <Image
          className="rounded-full cursor-pointer"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`Whats on your mind ${session.user.name} ?`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>
      </div>

      <div className="flex p-3 border-t justify-evenly">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div className="inputIcon">
          <CameraIcon className="h-7 text-blue-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-500" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
