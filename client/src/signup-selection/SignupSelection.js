import { Typography, Grid, Link, IconButton, Card } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';

export default function SignupSelection() {
  return (
    <Card className='page'>
      <Grid container justify='center'>
        <Typography component='h1' variant='h5'>
          Select Account Type
        </Typography>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={6} container direction='column' alignItems='center' justify='center'>
          <Link href='/signup'>
            <IconButton>
              <PersonIcon style={{ fontSize: 200 }} />
            </IconButton>
          </Link>
        </Grid>
        <Grid item xs={6} container direction='column' alignItems='center' justify='center'>
          <Link href='/business-signup'>
            <IconButton>
              <WorkIcon style={{ fontSize: 200 }} />
            </IconButton>
          </Link>
        </Grid>
        <Grid item xs={6} container direction='column' alignItems='center' justify='center'>
          <Typography component='h1' variant='h5'>
            Personal Account
          </Typography>
        </Grid>
        <Grid item xs={6} container direction='column' alignItems='center' justify='center'>
          <Typography component='h1' variant='h5'>
            Business Account
          </Typography>
        </Grid>
        <Grid item xs={6} container direction='column' alignItems='center' justify='center'>
          <p>
            Accounts for users looking to homeshare. Users can look for other members to homeshare with and share their
            homes.
          </p>
        </Grid>
        <Grid item xs={6} container direction='column' alignItems='center' justify='center'>
          <p>
            Accounts for users looking to create listings. Businesses can create and manage listings for services
            related to homesharing.
          </p>
        </Grid>
      </Grid>
    </Card>
  );
}
