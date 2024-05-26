import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import unlikedIcon from "../../../assets/bx_like.png";
import likedIcon from "../../../assets/likeRed.png";
import addGroupPostFn from "../../../lib/groups/addPost";
import getGroupPostFn from "../../../lib/groups/getPosts";
import { ResGetPosts } from "../../../types/groups/resGetPost";
import { formatTimestampDiff } from "../../global/formatTimeDiff";
import { StaticInlineNotice } from "../../global/inlineNotice";
import { MultiImagePicker } from "../../global/multiImagePicker";

export const GroupPosts = ({ id }: { id: number }) => {
  const [resPosts, setResPosts] = useState<ResGetPosts>();
  const [postLike, setPostLike] = useState(0);
  const [formPost, setFormPost] = useState("");
  const [formPostImg, setFormPostImg] = useState<string[]>([]);
  const [errMsg, setErrMsg] = useState("");
  const [imgsLength, setImgsLength] = useState(0);
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

  let content: string = "";
  if (imgsLength === 0) {
    content = "No image selected";
  } else if (imgsLength === 1) {
    content = "1 image selected";
  } else if (imgsLength >= 1 && imgsLength <= 5) {
    content = `${imgsLength} images selected`;
  } else {
    content = "No image selected";
  }

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
              {post.imgs &&
                post.imgs.length > 0 &&
                post.imgs.map((img, index) => {
                  // Check if img is not null
                  if (img !== null) {
                    return (
                      <Image
                        key={index.toString()}
                        source={{ uri: img }}
                        style={{
                          width: 100,
                          height: 100,
                        }}
                      />
                    );
                  } else {
                    // Handle null case, you can render a placeholder image or do something else
                    return null; // Or return a placeholder image
                  }
                })}
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
                style={[styles.headerBox, styles.commentBox]}
                key={comment.comment_id}
              >
                <View>
                  <Image
                    source={{ uri: comment.commentator_img }}
                    style={[styles.owner_img, { width: 30, height: 30 }]}
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

    if (formPost === "" && formPostImg.length === 0) return;

    const formData = new FormData();
    formData.append("post", formPost);
    formData.append("fk_group_id", id.toString());
    formData.forEach((uri) => {
      formData.append("imgs", {
        type: "image/jpeg",
        uri,
        name: "image.jpg", // Adjust name as needed (e.g., use original filenames)
      } as unknown as Blob);
    });

    try {
      const response = await addGroupPostFn({
        formDataBody: formData,
        setErrMsg,
      });
      console.log(response);
      response &&
        showMessage({
          message: response.message,
          type: "info",
        });

      // Reset form
      setFormPost("");
      setFormPostImg([]);
    } catch (error) {
      // disable empty object error
    }
  };

  return (
    <View>
      <View>
        <TextInput
          onChangeText={setFormPost}
          value={formPost}
          placeholder="Create post"
          style={styles.textInput}
        />
        <MultiImagePicker
          setImgsLength={setImgsLength}
          setFormPostImg={setFormPostImg}
        />
        <Text>{content}</Text>
        <Pressable onPress={handleSubmit}>
          <Text>Post</Text>
        </Pressable>
      </View>
      {errMsg ? (
        <StaticInlineNotice
          msg={errMsg}
          color="#fff"
          bgColor="red"
        />
      ) : (
        postContent
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#F7FBFF",
    borderRadius: 10,
    marginBottom: 10,
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
  commentBox: {
    marginVertical: 10,
  },
});
