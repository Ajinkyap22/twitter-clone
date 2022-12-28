import React, { useEffect } from "react";

import BookmarksHeader from "components/BookmarksHeader/BookmarksHeader";
import Tweets from "components/Tweets/Tweets";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

import { useAppSelector } from "app/hooks";
import { selectCurrentUser } from "features/user/userSlice";
import { TTweet } from "features/tweet/tweetSlice";

import { getDoc } from "firebase/firestore";

import { withAuthenticationRequired } from "@auth0/auth0-react";

const Bookmarks = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [bookmarks, setBookmarks] = React.useState<TTweet[]>([]);

  useEffect(() => {
    document.title = "Bookmarks / Twitter";
  }, []);

  // feetch bookmarks to display on bookmarks page
  useEffect(() => {
    const fetchBookmarks = async () => {
      // get user bookmarks
      const userBookmarks = currentUser?.bookmarks;

      if (userBookmarks && userBookmarks.length) {
        const bookmarksArr = [];

        // get bookmark data from tweet reference
        for (const tweetRef of userBookmarks) {
          const bookmarkDoc = await getDoc(tweetRef);

          if (!bookmarkDoc.exists()) continue;

          const bookmark = bookmarkDoc.data() as TTweet;

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

      <Tweets tweets={bookmarks} isBookmarks={true} />
    </div>
  );
};

export default withAuthenticationRequired(Bookmarks, {
  onRedirecting: () => <LoadingSpinner />,
});
