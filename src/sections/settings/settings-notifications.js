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
import { serviceApi } from 'src/api docs/api';
import { useSelector } from 'react-redux';


export const SettingsNotifications = () => {
  const option = useSelector(state => state.option.value)
  const [Title, setTitle] = useState("");
  const [News, setNews] = useState("");
  const [Img, setImg] = useState("");
  const [showImg, setShowImg] = useState("");
  const sorce = "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"

  const handleSubmit = (e) => {
    e.preventDefault();
    let url;
    // const formData = new FormData()

    // const url = serviceApi.latestPost;
    if (option?.name?.label === "Post Latest NEWS") {
      url = serviceApi.latestPost;
      // formData.append('photo', )
      // formData.append('Title', Title)
      // formData.append('News', News)
    } else if (option?.name?.label === "Post Trending NEWS") {
      url = serviceApi.trendingNews;
      // formData.append('trend', Img)
      // formData.append('Title', Title)
      // formData.append('News', News)
    }

      let data ={
        Img,
        Title,
        News
      }

    axios.post(url, data)
      .then(res =>
        toast(res.data.message),
        setTitle(""),
        setNews(""),
        setImg(""),
        setShowImg("")
      )
      .catch(er => toast(er?.response?.data))
  }
  const handleChange = async (e) => {
    const file = e.target.files[0]
    const base64 = await new base64Conversion(file)
    setImg(base64)
    // setShowImg(URL.createObjectURL(file))
  }

  return (
    <form onSubmit={handleSubmit}>
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
        <Button variant="contained" type='submit'>
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

