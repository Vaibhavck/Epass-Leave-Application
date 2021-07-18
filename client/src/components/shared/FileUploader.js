import React from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const Uploader = (props) => {
  var [file, setFile] = React.useState();
  return (
    <Dropzone
        maxFiles={1}
        // getUploadParams={() => ({ url: 'https://httpbin.org/post' })} // specify upload params and url for your files
        onChangeStatus={({ meta, file }, status) => { setFile({status, meta, file}) }}
        onSubmit={(files) => { 
            // console.log(files.map(f => f.meta)) // typeof - object
            console.log("file : ", file);
            props.handleFileUpload(file);
        }}
        maxSizeBytes={10000000}
        accept="image/*,audio/*,video/*,.pdf"
    />
  )
}

export default Uploader;