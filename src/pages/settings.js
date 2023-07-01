import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ComboBox from './autocomplete';
import React, { useEffect } from 'react';

const Page = () => {
  const [state, setState] = React.useState('')

  function autoComplete(val){
    setState(val?.label);
  }
  useEffect(()=>{
    const category = sessionStorage.getItem('categories')
    setState(category)
  },[])
  
return (

  <>
    <Head>
      <title>
        Settings | Devias Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
        <ComboBox autoComplete={autoComplete}/>
      
          <Typography variant="h4">
            {state ? state : "Please select category!"}
          </Typography>
         
          <SettingsNotifications />
          {/* <SettingsPassword /> */}
        </Stack>
      </Container>
    </Box>
  </>
    
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
