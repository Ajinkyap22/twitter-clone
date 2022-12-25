import React, { useEffect } from "react";
import BookmarksHeader from "components/BookmarksHeader/BookmarksHeader";
import { selectCurrentUser } from "features/user/userSlice";
import { useAppSelector } from "app/hooks";
import Tweets from "components/Tweets/Tweets";
import { getDoc } from "firebase/firestore";
import { TTweet } from "features/tweet/tweetSlice";

const Bookmarks = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [bookmarks, setBookmarks] = React.useState<TTweet[]>([]);

  // feetch bookmarks to display on bookmarks page
  useEffect(() => {
    const fetchBookmarks = async () => {
      // get user bookmarks
      const userBookmarks = currentUser?.bookmarks;

      if (userBookmarks && userBookmarks.length) {
        const bookmarksArr = [];

        // get bookmark data from tweet reference
        for (const tweetRef of userBookmarks) {
          const bookmarkDOc = await getDoc(tweetRef);
          const bookmark = bookmarkDOc.data() as TTweet;

          bookmarksArr.push(bookmark);
        }

        const sortedBookmarks = bookmarksArr.sort(
          (a, b) => b.date.seconds - a.date.seconds
        );

        // set bookmarks
        setBookmarks(sortedBookmarks);
      } else {
        setBookmarks([]);
      }
    };

    if (currentUser) fetchBookmarks();
  }, [currentUser]);

  return (
    <div className="min-vh-100">
      {currentUser ? <BookmarksHeader name={currentUser.name} /> : null}

      <Tweets tweets={bookmarks} />
    </div>
  );
};

export default Bookmarks;
