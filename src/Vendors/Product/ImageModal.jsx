import React from 'react';
import BottomModal from '../../../component/Modal/BottomModal';
import {SafeAreaView} from 'react-native';
import AddImage from './AddImage';

export const ImageModal = ({isLoginModal, handleLoginModal,selectedImage,  setSelectedImage}) => {
  return (
    <BottomModal
      title={'Image Upload'}
      isVisible={isLoginModal}
      onClose={handleLoginModal}>
      <SafeAreaView style={{width: '100%', padding: 10}}>
        <AddImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} handleLoginModal={handleLoginModal}/>
      </SafeAreaView>
    </BottomModal>
  );
};
