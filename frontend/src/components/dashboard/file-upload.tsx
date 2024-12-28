
import { Alert, AlertIcon, background, Icon } from '@chakra-ui/react';
import React, {useMemo, useRef} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { FaFilePdf } from 'react-icons/fa'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#1A202C',
  borderStyle: 'dashed',
  backgroundColor: '#ccc',
  color: '#000',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  width: '100%',
  maxWidth: '600px',
  minHeight: '250px',
  cursor: 'pointer',
};

const focusedStyle = {
  borderColor: '#2196f3',  
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function DropzoneFileUpload(props) {
  console.log('DropzoneFileUpload');
  const {required, name} = props; 
  const hiddenInputRef = useRef(null);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone(
    {
        accept: {'application/pdf': []},
        onDrop: (incomingFiles) => {
            if (hiddenInputRef.current) {
              const dataTransfer = new DataTransfer();
              incomingFiles.forEach((v) => {
                dataTransfer.items.add(v);
              });
              hiddenInputRef.current.files = dataTransfer.files;
            }
            console.log(incomingFiles);
        }

    });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);
  
  const files = acceptedFiles.map(file => (
    <li  key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div style={{"flex":"1"}} className="container">
      <div {...getRootProps({style})}>
        <input type ="file" name={name} required={required} style ={{opacity: 0,width:"100%"}}  ref={hiddenInputRef}/>
        <input {...getInputProps()} />
            <Icon as={FiUpload} textAlign={'center'} mr={5} boxSize={8} mb={4} />            
        <p style={{textAlign:'center'}}>
          {
            files.length > 0 ?(
              <>            
                <Icon as={FaFilePdf} textAlign={'center'} color={'green.500'} mr={5} boxSize={8} mb={0} />
                <ul  style={{ listStyle: "none", color:'green'  }}>
                  {files}
                </ul>
            </>
            )
            : (<span>
                  Arrastra un archivo PDF aqui, o haz click para seleccionar uno.
              </span>)
          }
            <br />
        </p>        
        {
        files.length > 0 && (
          <Alert style={{border:"1px solid #38A169"}} status='success' variant='solid'>
            <AlertIcon />
            Solo se analizaran 5 páginas por PDF, si necesitas más contacta con Oscar.
        </Alert>)
        }                
      </div>
    </div>
  );
}


export default DropzoneFileUpload;

  