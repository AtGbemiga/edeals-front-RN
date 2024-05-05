// DELETE
// import { ResGroupPostComment } from "../../types/groups/resGetComments";

// async function getGroupPostCommentsFn({
//   groupPostID,
//   setErrMsg,
// }: {
//   groupPostID: number;
//   setErrMsg: React.Dispatch<React.SetStateAction<string>>;
// }): Promise<ResGroupPostComment | undefined> {
//   const url = `https://fav-work.loca.lt/api/v1/groups/getGroupComments/${groupPostID}`;

//   const res = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     const exactErrorMsg = await res.json();
//     const errorMsgString = JSON.stringify(exactErrorMsg);
//     const errorMsg = JSON.parse(errorMsgString).error;

//     // Set the error message in the state
//     setErrMsg(errorMsg);

//     // Throw an error to stop further execution
//     return;
//   }

//   const data: ResGroupPostComment = await res.json();

//   return data;
// }
// export default getGroupPostCommentsFn;
