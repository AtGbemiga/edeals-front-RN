import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import unlikedIcon from "../../../assets/bx_like.png";
import likedIcon from "../../../assets/likeRed.png";
import addGroupPostFn from "../../../lib/groups/addPost";
import getGroupPostFn from "../../../lib/groups/getPosts";
import { ResGetPosts } from "../../../types/groups/resGetPost";
import { formatTimestampDiff } from "../../global/formatTimeDiff";
import MultiImagePicker from "../../global/multiImagePicker";

export const GroupPosts = ({ id }: { id: number }) => {
  const [resPosts, setResPosts] = useState<ResGetPosts>();
  const [postLike, setPostLike] = useState(0);
  const [formPost, setFormPost] = useState("");
  const [formPostImg, setFormPostImg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [successMsg, setSuccessMsg] = useState("");

  // const [post, setPost] = useState("");
  // const [imageUris, setImageUris] = useState([]);

  useEffect(() => {
    let userLiked;
    (async () => {
      try {
        const res = await getGroupPostFn({
          groupID: id,
          setErrMsg,
        });

        if (res && res.result.length > 0) {
          setResPosts(res);
          console.log(resPosts?.result);

          userLiked = resPosts?.result.find(
            (user) => user.user_liked
          )?.user_liked;
          setPostLike(userLiked ? 1 : 0);

          if (resPosts?.result) {
            const resComments = await getGroupPostCommentsFn({
              groupPostID: resPosts?.result[0].id,
              setErrMsg,
            });
            setResComments(resComments);
          }
        }
      } catch (error) {
        // Handle error
      }
    })();
  }, [id, setErrMsg]);

  // const handleLikeToggle = async () => {
  //   try {
  //     const newLikeState = postLike === 1 ? 0 : 1; // Toggle between 1 and 0
  //     setPostLike(newLikeState);

  //     const response = await (newLikeState === 1
  //       ? addPostLikeFn
  //       : unlikePostFn)({ group_post_id, setErrMsg });

  //     if (response?.message.includes("success")) {
  //       setSuccessMsg(response.message);
  //     } else {
  //       const newLikeState = postLike === 1 ? 0 : 1;
  //       setPostLike(newLikeState); // Revert UI on failure
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     const newLikeState = postLike === 1 ? 0 : 1;
  //     setPostLike(newLikeState);
  //   }
  // };

  const postContent = resPosts?.result.map((post) => {
    return (
      <View
        key={post.id}
        style={styles.postContainer}
      >
        <View style={styles.headerBox}>
          <View>
            <Image
              source={{ uri: post.owner_img }}
              style={styles.owner_img}
            />
          </View>
          <View>
            <View>
              <Text>{post.account_name}</Text>
              <Text>{formatTimestampDiff(post.created_at)}</Text>
            </View>
            <View>
              <Text>{post.post}</Text>
            </View>
            <View style={styles.statBox}>
              <Text>{post.user_liked}</Text>
              <Pressable>
                {postLike === 1 ? (
                  <View style={styles.socialsBox}>
                    <Image source={likedIcon} />
                    <Text>Unlike</Text>
                  </View>
                ) : (
                  <View style={styles.socialsBox}>
                    <Image source={unlikedIcon} />
                    <Text>Like</Text>
                  </View>
                )}
              </Pressable>

              <Text>
                {post.views === 1
                  ? `${post.views} view`
                  : `${post.views} views`}
              </Text>
            </View>
          </View>
        </View>
        {post.post_comments &&
          post.post_comments?.length > 0 &&
          post.post_comments.map((comment) => {
            return (
              <View
                style={styles.headerBox}
                key={comment.comment_id}
              >
                <View>
                  <Image
                    source={{ uri: comment.commentator_img }}
                    style={styles.owner_img}
                  />
                </View>
                <View>
                  <View>
                    <Text>{comment.commentator_account_name}</Text>
                    <Text>{formatTimestampDiff(post.created_at)}</Text>
                  </View>
                  <View>
                    <Text>{comment.comment}</Text>
                  </View>
                </View>
              </View>
            );
          })}
      </View>
    );
  });

  const handleSubmit = async () => {
    console.log("clicked");
    console.log({ "req.files": formPostImg });

    if (formPost === "" && formPostImg === "") return;

    const formData = new FormData();
    formData.append("post", formPost);
    formData.append("fk_group_id", id.toString());
    formData.append("imgs", formPostImg);

    try {
      const response = await addGroupPostFn({
        formDataBody: formData,
        setErrMsg,
      });
      console.log(response);
    } catch (error) {
      console.error("Error adding group post:", error);
    }
  };

  return (
    <>
      <View>
        <TextInput
          onChangeText={setFormPost}
          value={formPost}
          placeholder="Create post"
          style={styles.textInput}
        />
        <MultiImagePicker
          formPostImg={formPostImg}
          setFormPostImg={setFormPostImg}
        />
        <Pressable onPress={handleSubmit}>
          <Text>Post</Text>
        </Pressable>
      </View>
      {postContent}
    </>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    // flexDirection: "column",
    // rowGap: 10,
    // padding: 10,
    backgroundColor: "#F7FBFF",
    // marginVertical: 10,
    borderRadius: 10,
    // height: "auto",
  },
  headerBox: {
    flexDirection: "row",
    columnGap: 10,
  },
  textInput: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
  },
  owner_img: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 50,
  },
  statBox: {
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  socialsBox: {
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
});
