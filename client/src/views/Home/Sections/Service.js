/*
 * @Author: AA
 * @Date: 2021-01-28 16:04:34
 * @LastEditors: AA
 * @LastEditTime: 2021-01-29 05:39:29
 * @FilePath: /src/views/Home/Sections/Service.js
 */
import React from "react";
// Import plugin resources
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";

// This plugin resources

// Import  dependent resources of this component
import "./assets/scss/Service.scss";

export default function Service() {
  return (
    <section className="section">
      <Container className="home-service text-center">
        <div className="text-primary">Areas of Services</div>
        <Typography className="mb-20" variant="h4" component="h2">
          Our Services
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <Card className="aa-card p-20">
              <CardContent className="text-center">
                <div className="service-icon">
                  <i className="fa fa-cogs" aria-hidden="true"></i>
                </div>
                <Typography className="mt-20" variant="h5" component="h2">
                  A
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </CardContent>
              <CardActions className="text-center">
                <Button className="m-auto" size="small">
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className="aa-card p-20">
              <CardContent className="text-center">
                <div className="service-icon">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                </div>
                <Typography className="mt-20" variant="h5" component="h2">
                  A
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </CardContent>
              <CardActions className="text-center">
                <Button className="m-auto" size="small">
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className="aa-card p-20">
              <CardContent className="text-center">
                <div className="service-icon">
                  <i className="fa fa-cloud" aria-hidden="true"></i>
                </div>
                <Typography className="mt-20" variant="h5" component="h2">
                  A
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </CardContent>
              <CardActions className="text-center">
                <Button className="m-auto" size="small">
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
