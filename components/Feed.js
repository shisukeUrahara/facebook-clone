import Stories from "./Stories";
import InputBox from "./InputBox";
import Posts from "./Posts";

function Feed() {
  return (
    <div className="flex-grow h-screen pb-44 pl-6 pt-10 mr-4 xl:mr-40 overflow-y-auto">
      <div className="mx-auto max-w-md md:max-w-lg">
        {/* Stories */}
        <Stories />
        {/* Input box */}
        <InputBox />
        {/* Posts */}
        <Posts />
      </div>
    </div>
  );
}

export default Feed;
