import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../../types/global/root";
import { useState } from "react";
import {
  FInputNames,
  FProductUpload,
  FUStatus,
} from "../../types/sell/fUploadProduct";
import { Picker } from "@react-native-picker/picker";
import { OneImagePicker } from "../global/multiImagePicker";
import uploadProductFn from "../../lib/products/upload";
import { showMessage } from "react-native-flash-message";
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Sell">;
};

export const UploadProduct = ({ navigation }: Props) => {
  const [formData, setFormData] = useState<FProductUpload>({
    name: "",
    subHeading: "",
    description: "",
    category: "others",
    price: undefined,
    stock_no: undefined,
    status: FUStatus.Nigerian,
    xs: "0",
    s: "0",
    m: "0",
    l: "0",
    xl: "0",
    xxl: "0",
    x3l: "0",
    blue: "0",
    red: "0",
    yellow: "0",
    green: "0",
    brown: "0",
    orange: "0",
    white: "0",
    black: "0",
    purple: "0",
  });

  const [formPostImg, setFormPostImg] = useState("");
  const [errMsg, setErrMsg] = useState<Record<string, string>>({
    uploadProduct: "",
  });

  function handleChange(name: FInputNames, value: string) {
    console.log(name, value);

    setFormData({ ...formData, [name]: value });
    console.log({ formData: formData });
  }

  const createFormData = (data: FProductUpload): FormData => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "price" || key === "stock_no") {
        formData.append(key, value?.toString() || "1");
      } else if (key === "subHeading") {
        formData.append("sub_heading", value);
      } else {
        formData.append(key, value);
      }
    });

    // Append image if available
    formData.append("imgs", {
      type: "image/jpeg",
      uri: formPostImg,
      name: "file.jpg",
    } as unknown as Blob);

    return formData;
  };

  const handleSubmit = async () => {
    console.log("clicked");
    console.log({ "req.files": formPostImg });

    if (
      formData.name === "" ||
      formData.subHeading === "" ||
      formData.description === "" ||
      formData.price === undefined ||
      formData.stock_no === undefined ||
      formPostImg === "" ||
      formData.category === "" ||
      (formData.xs === "0" &&
        formData.s === "0" &&
        formData.m === "0" &&
        formData.l === "0" &&
        formData.xl === "0" &&
        formData.x3l === "0" &&
        formData.xxl === "0") ||
      (formData.blue === "0" &&
        formData.red === "0" &&
        formData.yellow === "0" &&
        formData.green === "0" &&
        formData.brown === "0" &&
        formData.orange === "0" &&
        formData.white === "0" &&
        formData.black === "0" &&
        formData.purple === "0")
    ) {
      showMessage({
        message: "Please fill in all required fields",
        type: "danger",
      });
      return;
    }
    try {
      const res = await uploadProductFn({
        formData: createFormData(formData),
        setErrMsg,
      });

      if (res && res.message.includes("success")) {
        console.log("success");
        showMessage({
          message: res.message,
          type: "success",
          duration: 8000,
        });

        // Reset form
        setFormPostImg("");
        setFormData({
          name: "",
          subHeading: "",
          description: "",
          category: "others",
          price: undefined,
          stock_no: undefined,
          status: FUStatus.Nigerian,
          xs: "0",
          s: "0",
          m: "0",
          l: "0",
          xl: "0",
          xxl: "0",
          x3l: "0",
          blue: "0",
          red: "0",
          yellow: "0",
          green: "0",
          brown: "0",
          orange: "0",
          white: "0",
          black: "0",
          purple: "0",
        });
      }
    } catch (error) {
      // disable empty object error
    }
  };

  return (
    <View>
      {errMsg.uploadProduct && errMsg.uploadProduct !== "" && (
        <>
          {showMessage({
            message: errMsg.uploadProduct,
            type: "danger",
            hideOnPress: true,
            autoHide: false,
          })}
        </>
      )}
      <View style={styles.inputBox}>
        <Text>Name</Text>
        <TextInput
          onChangeText={(value) => handleChange(FInputNames.name, value)}
          value={formData.name}
          placeholder="Search"
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputBox}>
        <Text>Sub Heading</Text>
        <TextInput
          onChangeText={(value) => handleChange(FInputNames.subHeading, value)}
          value={formData.subHeading}
          placeholder="Search"
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputBox}>
        <Text>Description</Text>
        <TextInput
          onChangeText={(value) => handleChange(FInputNames.description, value)}
          value={formData.description}
          placeholder="Search"
          style={styles.textInput}
        />
      </View>
      <View>
        <Text>Category</Text>
        <Picker
          selectedValue={formData.category}
          onValueChange={(itemValue) =>
            setFormData({ ...formData, category: itemValue })
          }
        >
          <Picker.Item
            label="Hotels"
            value="hotels"
          />
          <Picker.Item
            label="Building"
            value="building"
          />
          <Picker.Item
            label="Fashion"
            value="fashion"
          />
          <Picker.Item
            label="Gadget"
            value="gadget"
          />
          <Picker.Item
            label="Electronics"
            value="electronics"
          />
          <Picker.Item
            label="Others"
            value="others"
          />
        </Picker>
      </View>
      <View style={styles.inputBox}>
        <Text>Price</Text>
        <TextInput
          onChangeText={(value) => handleChange(FInputNames.price, value)}
          value={formData.price ? formData.price.toLocaleString() : ""}
          placeholder="Search"
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputBox}>
        <Text>Stock no.</Text>
        <TextInput
          onChangeText={(value) => handleChange(FInputNames.stock_no, value)}
          value={formData.stock_no ? formData.stock_no.toString() : ""}
          placeholder="Search"
          style={styles.textInput}
        />
      </View>
      <View>
        <Text>Made in</Text>
        <Picker
          selectedValue={formData.status}
          onValueChange={(itemValue) =>
            setFormData({ ...formData, status: itemValue })
          }
        >
          <Picker.Item
            label={FUStatus.Nigerian}
            value={FUStatus.Nigerian}
          />
          <Picker.Item
            label={FUStatus.Imported}
            value={FUStatus.Imported}
          />
        </Picker>
      </View>
      <View>
        <Text>Sizes</Text>
        <View>
          <Text>XS</Text>
          <Picker
            selectedValue={formData.xs}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, xs: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text>S</Text>
          <Picker
            selectedValue={formData.s}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, s: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text>M</Text>
          <Picker
            selectedValue={formData.m}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, m: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text>L</Text>
          <Picker
            selectedValue={formData.l}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, l: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text>XL</Text>
          <Picker
            selectedValue={formData.xl}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, xl: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text>XXL</Text>
          <Picker
            selectedValue={formData.xxl}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, xxl: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text>X3L</Text>
          <Picker
            selectedValue={formData.x3l}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, x3l: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View>
        <Text>Colours</Text>
        <View>
          <Text>Black</Text>
          <Picker
            selectedValue={formData.black}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, black: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text>Blue</Text>
          <Picker
            selectedValue={formData.blue}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, blue: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text>Brown</Text>
          <Picker
            selectedValue={formData.brown}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, brown: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text>Green</Text>
          <Picker
            selectedValue={formData.green}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, green: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text>Orange</Text>
          <Picker
            selectedValue={formData.orange}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, orange: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text>Purple</Text>
          <Picker
            selectedValue={formData.purple}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, purple: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text>Red</Text>
          <Picker
            selectedValue={formData.red}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, red: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text>White</Text>
          <Picker
            selectedValue={formData.white}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, white: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text>Yellow</Text>
          <Picker
            selectedValue={formData.yellow}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, yellow: itemValue })
            }
          >
            {["Available", "Unavailable"].map((option, index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option === "Available" ? "1" : "0"}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View>
        <OneImagePicker
          formPostImg={formPostImg}
          setFormPostImg={setFormPostImg}
        />
      </View>
      <View>
        <Pressable
          onPress={handleSubmit}
          style={styles.uploadBtn}
        >
          <Text style={styles.uploadBtnText}>Upload</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: "column",
    rowGap: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  textInput: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
  },
  uploadBtn: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  uploadBtnText: {
    color: "#fff",
    fontWeight: "500",
  },
});
