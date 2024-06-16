import AsyncStorage from "@react-native-async-storage/async-storage";
export const addProductFunction = async (data) => {

    const formData = new FormData();

    data?.images?.forEach((image, index) => {
        formData.append('productImages[]', {
            uri: image.uri,
            type: image.type,
            name: image.fileName
        });
    });

    // Adding other product details (example)
    formData.append('name', data?.name);
    formData.append('price', data?.price);
    formData.append('mrp', data?.mrp);
    formData.append('rating', Number(data?.rating));
    formData.append('category', data?.category);
    formData.append('type', data?.type);
    formData.append('description', data?.description);
    console.log(formData);
    try {
        const token = await AsyncStorage.getItem('Authorization');
        const headers = {
            'Authorization': `${token}`, // Ensure the token is correctly formatted
            'Content-Type': 'multipart/form-data' 
        };

        const response = await fetch('https://prediction.capitallooks.com/php_backend/products/add_product_mobile.php', {
            method: 'POST',
            headers: headers,
            body: formData,
        });
console.log(response)
        const responseData = await response.json();
        console.log(responseData)
        return responseData;
    } catch (error) {
        console.error('Upload Error:', error);
        Alert.alert('Upload failed', 'There was an error uploading your images.');
    }
};
