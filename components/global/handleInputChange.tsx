// export const handleInputChange = <T extends {}>(
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//     setFormDetails: React.Dispatch<React.SetStateAction<T>>
//   ) => {
//     const { name, value, type } = e.target;
//     console.log(`${name}: ${value}`);

//     if (type === "file") {
//       const fileList = (e.target as HTMLInputElement).files;
//       if (fileList) {
//         setFormDetails((prevFormData) => ({
//           ...prevFormData,
//           [name]: fileList,
//         }));
//       }
//     } else {
//       setFormDetails((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
//     }
//   };
