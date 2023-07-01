import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Button,
  CardActions,
  Divider,
  Stack,
  Unstable_Grid2 as Grid
} from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


export const SettingsNotifications = () => {
  const [Title, setTitle] = useState("");
  const [News, setNews] = useState("");
  const [Img, setImg] = useState("");
  const sorce = "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"

  const handleSubmit = (e) => {
    e.preventDefault();
    toast("Uploading...")
   sendImage()
  }
  const sendImage=()=>{
    const url = "http://localhost:8000/api/person/fdmNews"
    axios.post(url, { Title, News, Img })
      .then(res =>
        toast(res.data.message),
        setTitle(""),
        setNews(""),
        setImg("")
      )
      .catch(er => console.log(er))
  }
  const handleChange = async (e) => {
    const file = e.target.files[0]
    const base64 = await new base64Conversion(file)
    setImg(base64)

  }

  return (
    <form >
      <div>
        <ToastContainer 
          theme='dark'
          Type='success'
          pauseOnHover
          draggable
          rtl={false}
          progressClassName="toastProgress"
          bodyClassName="toastBody"
        />
        
        <Grid
          container
          spacing={6}
          wrap="wrap"
        >
          <Grid
            xs={12}
            sm={6}
            md={4}
          >
            <Stack spacing={1}>
              <Box
                sx={{
                  width: 10000,
                  maxWidth: '100%',
                }}
              >
                <label htmlFor='myFile' className='img-lable'>
                  <img src={Img ? Img : sorce} alt='' />
                </label>
                <input
                  type='file'
                  label="Image"
                  name='file-upload'
                  id='myFile'
                  onChange={(e) => handleChange(e)}
                  className='input'
                  accept='.jpeg , .png , .jpg'
                />
                <TextField value={Title} fullWidth label="Title" onChange={(e) => setTitle(e.target.value)} id="fullWidth" />
                <textarea value={News} className='text-news' onChange={(e) => setNews(e.target.value)} placeholder='type news here'></textarea>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </div>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-start' }}>
        <Button variant="contained" onClick={handleSubmit}>
          Post
        </Button>
      </CardActions>
    </form>
  );
};

function base64Conversion(file) {
  return new Promise((resolve, reject) => {
    const filReader = new FileReader();
    filReader.readAsDataURL(file)
    filReader.onload = () => {
      resolve(filReader.result)
    }
    filReader.onerror = (err) => {
      reject(err)
    }
  })
}