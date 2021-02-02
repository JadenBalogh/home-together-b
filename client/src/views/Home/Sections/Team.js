/*
 * @Author: AA
 * @Date: 2021-01-28 17:06:00
 * @LastEditors: AA
 * @LastEditTime: 2021-01-29 05:51:58
 * @FilePath: /src/views/Home/Sections/Team.js
 */
import React from "react";
// Import plugin resources
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";

// This plugin resources
import image1 from "./assets/images/team/1.jpg";
import image2 from "./assets/images/team/2.jpg";
import image3 from "./assets/images/team/3.jpg";
import image4 from "./assets/images/team/4.jpg";

// Import  dependent resources of this component
import "./assets/scss/Team.scss";

export default function Team() {
  return (
    <section className="section bg-light">
      <Container className="home-team">
        <div className="text-primary text-center"> Who We Are</div>
        <Typography className="mb-20 text-center" variant="h4" component="h2">
          Meet The Team
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <Card className="aa-card">
              <CardActionArea>
                <CardMedia
                  image={image1}
                  title="Miss AA"
                  style={{
                    height: "240px",
                  }}
                />
                <CardContent className="pl-20 pr-20 pb-0">
                  <Typography variant="h5" component="h2">
                    Ms. AA
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus neque lorem, eget dictum leo porttitor quis. Vestibulum at leo ultrices, euismod sapien in, vehicula ante. Suspendisse potenti. Praesent condimentum ornare justo vitae iaculis. Etiam dignissim iaculis massa, nec semper magna lobortis id. Aliquam in leo sed quam consequat tempor quis eu dui.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="pl-20 pr-20">
                <Button size="small">Read More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className="aa-card">
              <CardActionArea>
                <CardMedia
                  image={image2}
                  title="Miss AA"
                  style={{
                    height: "240px",
                  }}
                />
                <CardContent className="pl-20 pr-20 pb-0">
                  <Typography variant="h5" component="h2">
                  Ms. AA
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus neque lorem, eget dictum leo porttitor quis. Vestibulum at leo ultrices, euismod sapien in, vehicula ante. Suspendisse potenti. Praesent condimentum ornare justo vitae iaculis. Etiam dignissim iaculis massa, nec semper magna lobortis id. Aliquam in leo sed quam consequat tempor quis eu dui.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="pl-20 pr-20">
                <Button size="small">Read More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className="aa-card">
              <CardActionArea>
                <CardMedia
                  image={image3}
                  title="Miss AA"
                  style={{
                    height: "240px",
                  }}
                />
                <CardContent className="pl-20 pr-20 pb-0">
                  <Typography variant="h5" component="h2">
                  Ms. AA
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus neque lorem, eget dictum leo porttitor quis. Vestibulum at leo ultrices, euismod sapien in, vehicula ante. Suspendisse potenti. Praesent condimentum ornare justo vitae iaculis. Etiam dignissim iaculis massa, nec semper magna lobortis id. Aliquam in leo sed quam consequat tempor quis eu dui.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="pl-20 pr-20">
                <Button size="small">Read More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className="aa-card">
              <CardActionArea>
                <CardMedia
                  image={image4}
                  title="Miss AA"
                  style={{
                    height: "240px",
                  }}
                />
                <CardContent className="pl-20 pr-20 pb-0">
                  <Typography variant="h5" component="h2">
                  Ms. AA
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus neque lorem, eget dictum leo porttitor quis. Vestibulum at leo ultrices, euismod sapien in, vehicula ante. Suspendisse potenti. Praesent condimentum ornare justo vitae iaculis. Etiam dignissim iaculis massa, nec semper magna lobortis id. Aliquam in leo sed quam consequat tempor quis eu dui.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="pl-20 pr-20">
                <Button size="small">Read More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
