// import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';


function SkeletonComponent(props: { loading?: boolean }) {
  const { loading = false } = props;

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ margin: 1 }}>
        {loading && (
  <Skeleton variant="circular">
    <Avatar />
  </Skeleton>
 ) }
         
        </Box>
        <Box sx={{ width: '100%' }}>
          {loading && (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) }
        </Box>
      </Box>
      { loading && (
        <Skeleton variant="rectangular" width="100%">
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>)}
    
    
    </div>
  );
}

export default function SkeletonChildren() {
  return (
    <Grid container spacing={8}>
      <Grid item xs>
        <SkeletonComponent loading />
      </Grid>
      <Grid item xs>
        <SkeletonComponent />
      </Grid>
    </Grid>
  );
}
