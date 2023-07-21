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
import Load from './loader';


export const SettingsNotifications = () => {
  const option = useSelector(state => state.option.value)
  const [Title, setTitle] = useState("");
  const [News, setNews] = useState("");
  const [Img, setImg] = useState("");
  const [showImg, setShowImg] = useState("");
  const [state, setState] = useState(false);
  const [toastClass, setToastClass] = useState("")
  const sorce = "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"

  const handleSubmit = (e) => {
    setState(true)
    e.preventDefault();
    let url;
    // const formData = new FormData()

    // const url = serviceApi.latestPost;
    if (option?.name?.label === "Post Latest NEWS") {
      url = "https://breakable-puce-lobster.cyclic.app/api/person/fdmNews";
      // formData.append('photo', )
      // formData.append('Title', Title)
      // formData.append('News', News)
    } else if (option?.name?.label === "Post Trending NEWS") {
      url = "https://breakable-puce-lobster.cyclic.app/api/person/trendingNews";
      // formData.append('trend', Img)
      // formData.append('Title', Title)
      // formData.append('News', News)
    } else if (option?.name?.label === null || option?.name?.label === undefined) {
      toast.warning("Please select category!", {toastId:'toast1'})
    }

    let data = {
      Img,
      Title,
      News
    }

    if (data.Img && data.News && data.Title && option?.name?.label) {
      axios.post(url, data)
        .then(res =>
          resValidation(res),
        )
        .catch(er => 
        handleError(er?.response?.data)
        )
    } else {
      toast.warning("Please fill all the fields.", {toastId:'toast2'})
      setState(false)
      setToastClass("toastWarn")
    }
  }

  const handleError = (er) => {
    setToastClass("toastRed")
      if(er.message){
      toast.error(er.message)
      setState(false)
    }
  }
  const resValidation = (res) => {
    if (res.status === 201) {
      setToastClass("toastGreen")
      toast.success(res.data.message)
      setTitle("")
      setNews("")
      setImg("")
      setShowImg("")
      setState(false)
      window.scroll(0 ,0)
    }
  }

  const handleChange = async (e) => {
    const file = e.target.files[0]
    const base64 = await new base64Conversion(file)
    setImg(base64)
    setShowImg(URL.createObjectURL(file))
  }

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
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <ToastContainer
          theme='dark'
          Type='success'
          pauseOnHover
          draggable
          rtl={false}
          progressClassName={toastClass}
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
            md={12}
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
                <textarea value={News} className='text-news' onChange={(e) => setNews(e.target.value)} placeholder='type news here' ></textarea>
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
        {state ? <Load /> : null}
      </CardActions>
    </form>
  );
};



