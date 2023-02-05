import React, { useReducer } from 'react';
import axios from 'axios';
import {saveAs} from "file-saver";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';

const setGreyscaleImage = (state, action) => {
  return action.payload
}

function App() {

  const [greyscaleImage, dispatchGreyscaleImage] = useReducer(setGreyscaleImage, null);

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);

    try {
      const response = await axios.post('http://localhost:5000/save-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },

      });

      const imageURL = `http://localhost:5000/read-grey-image/${response.data['filename']}`
      dispatchGreyscaleImage({payload: imageURL});
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = ()=>{
    saveAs(greyscaleImage, "greyscaleImage");
   }

  return (
    <Container
    >
      <Box mt={20} mb={2}>
        <Typography variant="h2" color="secondary" >Image Converter</Typography>
      </Box >
      <form>
          <Input type="file" color="secondary" onChange={handleImageUpload} />
        </form>
        {greyscaleImage && (
          <>
          <Box mt={2} >
            <Typography variant="h4" color="secondary">Greyscale Image:</Typography>
          </Box>
              <Box
            component="img"
            sx={{ maxWidth: 800 ,maxHeight:800}}
            alt="The house from the offer."
            src={greyscaleImage}
          />
            <Box mt={1}>
            <Button variant="contained" size="small" color="secondary" disableElevation onClick={handleClick}>Dowload image</Button>
            </Box>
            </>
        )}
      </Container>
  );
}

export default App;
