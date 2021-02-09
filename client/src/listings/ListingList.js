import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import '../shared/List.css';
import './Listings.css';
import Ratings from '../shared/ratings';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '1000px',
    paddingTop: '25px',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 0,
  },
  img: {
    maxWidth: '250px',
    maxHeight: '250px',
    borderRadius: '5%',
  },
  accordionImg: {
    marginRight: '25px',
    maxWidth: '75px',
    maxHeight: '75px',
    borderRadius: '50%',
  },
}));

export default function ListingGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center" justify="space-between">
            <img className={classes.accordionImg} alt="Sample Image" src={require("../shared/img.png").default} />
            <Grid item>
              <Typography className={classes.heading}>Grass-Co - Gardening, Yard-Work, Yard Maintenance</Typography>
            </Grid>
            <Grid item><Ratings Ratings={Ratings}></Ratings></Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} >
            <Grid item>
              <img className={classes.img} alt="Sample Image" src={require("../shared/img.png").default} />
            </Grid>

            <Grid item xs container >

              <Grid item xs container direction="column" spacing={1}>
                <Grid item xs={12} sm container spacing={1} alignItems="baseline" justify="space-between">
                  <Grid item xs>
                    <Paper className={classes.paper}>
                      <Typography variant="h6">About: </Typography>
                      <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={0} sm container spacing={1}>
                  <Grid item xs>
                    <Paper className={classes.paper}><Typography variant="body2">Website: GrassCo.com </Typography></Paper>
                  </Grid>
                  <Grid item xs>
                    <Paper className={classes.paper}><Typography variant="body2">E-Mail: contact@GrassCo.com </Typography></Paper>
                  </Grid>
                  <Grid item xs={3.5}>
                    <Paper className={classes.paper}><Typography variant="body2">Phone #: 250-555-1234 </Typography></Paper>
                  </Grid>
                </Grid>
                <Grid item container spacing={0} alignItems="baseline" justify="center">
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="primary">
                      Contact</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Report</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={0} >
              <Grid item xs={12} alignItems="flex-start" >
                <Paper className={classes.paper}><Typography variant="body2">Published: March 3rd, 2021 by @Business</Typography></Paper>
              </Grid>
            </Grid>
          </Grid>

        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center" justify="space-between">
            <img className={classes.accordionImg} alt="Sample Image" src={require("../shared/img.png").default} />
            <Grid item>
              <Typography className={classes.heading}>Listing Name - Sub-Category</Typography>
            </Grid>
            <Grid item><Ratings Ratings={Ratings}></Ratings></Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} >
            <Grid item>
              <img className={classes.img} alt="Sample Image" src={require("../shared/img.png").default} />
            </Grid>

            <Grid item xs container >

              <Grid item xs container direction="column" spacing={1}>
                <Grid item xs={12} sm container spacing={1} alignItems="baseline" justify="space-between">
                  <Grid item xs>
                    <Paper className={classes.paper}>
                      <Typography variant="h6">About: </Typography>
                      <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={0} sm container spacing={1}>
                  <Grid item xs>
                    <Paper className={classes.paper}><Typography variant="body1">Website: </Typography></Paper>
                  </Grid>
                  <Grid item xs>
                    <Paper className={classes.paper}><Typography variant="body1">E-Mail: </Typography></Paper>
                  </Grid>
                  <Grid item xs>
                    <Paper className={classes.paper}><Typography variant="body1">Phone #: </Typography></Paper>
                  </Grid>
                </Grid>
                <Grid item container spacing={0} alignItems="baseline" justify="center">
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Contact</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Report</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={0} >
              <Grid item xs={12} alignItems="flex-start" >
                <Paper className={classes.paper}><Typography variant="body2">Published: March 3rd, 2021 by @Business</Typography></Paper>
              </Grid>
            </Grid>
          </Grid>

        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center" justify="space-between">
            <img className={classes.accordionImg} alt="Sample Image" src={require("../shared/img.png").default} />
            <Grid item>
              <Typography className={classes.heading}>Listing Name - Sub-Category</Typography>
            </Grid>
            <Grid item><Ratings Ratings={Ratings}></Ratings></Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} >
            <Grid item>
              <img className={classes.img} alt="Sample Image" src={require("../shared/img.png").default} />
            </Grid>

            <Grid item xs container >

              <Grid item xs container direction="column" spacing={1}>
                <Grid item xs={12} sm container spacing={1} alignItems="baseline" justify="space-between">
                  <Grid item xs>
                    <Paper className={classes.paper}>
                      <Typography variant="h6">About: </Typography>
                      <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={0} sm container spacing={1}>
                  <Grid item xs>
                    <Paper className={classes.paper}><Typography variant="body1">Website: </Typography></Paper>
                  </Grid>
                  <Grid item xs>
                    <Paper className={classes.paper}><Typography variant="body1">E-Mail: </Typography></Paper>
                  </Grid>
                  <Grid item xs>
                    <Paper className={classes.paper}><Typography variant="body1">Phone #: </Typography></Paper>
                  </Grid>
                </Grid>
                <Grid item container spacing={0} alignItems="baseline" justify="center">
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Contact</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Report</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={0} >
              <Grid item xs={12} alignItems="flex-start" >
                <Paper className={classes.paper}><Typography variant="body2">Published: March 3rd, 2021 by @Business</Typography></Paper>
              </Grid>
            </Grid>
          </Grid>

        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center" justify="space-between">
            <img className={classes.accordionImg} alt="Sample Image" src={require("../shared/img.png").default} />
            <Grid item>
              <Typography className={classes.heading}>Listing Name - Sub-Category</Typography>
            </Grid>
            <Grid item><Ratings Ratings={Ratings}></Ratings></Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} >
            <Grid item>
              <img className={classes.img} alt="Sample Image" src={require("../shared/img.png").default} />
            </Grid>

            <Grid item xs container >

              <Grid item xs container direction="column" spacing={1}>
                <Grid item xs={12} sm container spacing={1} alignItems="baseline" justify="space-between">
                  <Grid item xs>
                    <Paper className={classes.paper}>
                      <Typography variant="h6">About: </Typography>
                      <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={0} sm container spacing={1}>
                  <Grid item xs>
                    <Paper className={classes.paper}><Typography variant="body1">Website: </Typography></Paper>
                  </Grid>
                  <Grid item xs>
                    <Paper className={classes.paper}><Typography variant="body1">E-Mail: </Typography></Paper>
                  </Grid>
                  <Grid item xs>
                    <Paper className={classes.paper}><Typography variant="body1">Phone #: </Typography></Paper>
                  </Grid>
                </Grid>
                <Grid item container spacing={0} alignItems="baseline" justify="center">
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Contact</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Report</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={0} >
              <Grid item xs={12} alignItems="flex-start" >
                <Paper className={classes.paper}><Typography variant="body2">Published: March 3rd, 2021 by @Business</Typography></Paper>
              </Grid>
            </Grid>
          </Grid>

        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center" justify="space-between">
            <img className={classes.accordionImg} alt="Sample Image" src={require("../shared/img.png").default} />
            <Grid item>
              <Typography className={classes.heading}>Listing Name - Sub-Category</Typography>
            </Grid>
            <Grid item><Ratings Ratings={Ratings}></Ratings></Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} >
            <Grid item>
              <img className={classes.img} alt="Sample Image" src={require("../shared/img.png").default} />
            </Grid>

            <Grid item xs container >

              <Grid item xs container direction="column" spacing={1}>
                <Grid item xs={12} sm container spacing={1} alignItems="baseline" justify="space-between">
                  <Grid item xs>
                    <Paper className={classes.paper}>
                      <Typography variant="h6">About: </Typography>
                      <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={0} sm container spacing={1}>
                  <Grid item xs>
                    <Paper className={classes.paper}><Typography variant="body1">Website: </Typography></Paper>
                  </Grid>
                  <Grid item xs>
                    <Paper className={classes.paper}><Typography variant="body1">E-Mail: </Typography></Paper>
                  </Grid>
                  <Grid item xs>
                    <Paper className={classes.paper}><Typography variant="body1">Phone #: </Typography></Paper>
                  </Grid>
                </Grid>
                <Grid item container spacing={0} alignItems="baseline" justify="center">
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Contact</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Report</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                  <Grid item xs>
                    <Button size="Medium" variant="outlined" color="secondary">
                      Reviews</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={0} >
              <Grid item xs={12} alignItems="flex-start" >
                <Paper className={classes.paper}><Typography variant="body2">Published: March 3rd, 2021 by @Business</Typography></Paper>
              </Grid>
            </Grid>
          </Grid>

        </AccordionDetails>
      </Accordion>
    </div>

  );
}
