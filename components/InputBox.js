import { useSession } from "next-auth/client";
import Image from "next/image";
import {
  CameraIcon,
  EmojiHappyIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import { db, storage } from "../firebase.js";

function InputBox() {
  const [session] = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = (e) => {
    e.preventDefault();
    // don't let users post if posts are empty
    if (!inputRef.current.value) return;

    // post the posts if they are not empty and store it in firebase db
    db.collection("posts")
      .add({
        name: session.user.name,
        email: session.user.email,
        message: inputRef.current.value,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        // upload the image if user has uploaded an Image
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");

          removeImageFromPost();

          uploadTask.on(
            "state_change",
            null,
            (error) => {
              console.error("ImageUpload error ", error);
            },
            () => {
              // when the upload completes , set the image url as a downloadable image url

              storage
                .ref("/posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts")
                    .doc(doc.id)
                    .set({ postImage: url }, { merge: true });
                });
            }
          );

          inputRef.current.value = "";
        }
      });
  };

  const addImageToPost = (e) => {
    e.preventDefault();
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    // when image loads fully , upodate the post image ref
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImageFromPost = () => {
    setImageToPost(null);
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
            ref={inputRef}
            placeholder={`Whats on your mind ${session.user.name} ?`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>

        {/* rendering the uploaded image  */}
        {imageToPost && (
          <div
            onClick={removeImageFromPost}
            className="flex flex-col filter
           hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img className="h-10 object-contain" src={imageToPost} alt="" />
            <p className="text-xs text-red-500 text-center"> Remove</p>
          </div>
        )}
      </div>

      <div className="flex p-3 border-t justify-evenly">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-blue-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          {/* <label for="imageUpload" className="text-xs sm:text-sm xl:text-base">
            Photo/Video
          </label> */}
          <input
            id="imageUpload"
            hidden={true}
            ref={filePickerRef}
            onChange={addImageToPost}
            type="file"
          />
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
