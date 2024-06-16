import { PermissionsAndroid, Platform } from "react-native";
import RNFetchBlob from "rn-fetch-blob";

export const fetchAppUpdate = async () => {
    let url = 'https://prediction.capitallooks.com/php_backend/app/app_update.php';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(
            `There was a problem with the fetch operation: ${error.message}`,
        );
    }
};


const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to download files.',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  export const downloadApk = async (url, setIsModalVisible) => {
    if (Platform.OS === 'android') {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file.');
        return;
      }
    }

    const { config, fs } = RNFetchBlob;
    const { DownloadDir } = fs.dirs;

    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${DownloadDir}/e-shop.apk`,
        description: 'Downloading APK',
      },
    };
    config(options)
        .fetch('GET', `${url}`)
        .then((res) => {
            setIsModalVisible(false);
            Alert.alert('Download Complete', 'APK has been downloaded successfully.');
        })
        .catch((error) => {
            console.error(error);
            Alert.alert('Download Error', 'An error occurred while downloading the APK.');
        });
};
