import { Checkbox, TextField, InputLabel, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import WcIcon from '@material-ui/icons/Wc';
import FaceIcon from '@material-ui/icons/Face';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import LocationFilter from '../shared/LocationFilter';
import FilterSelect from './FilterSelect';


function MembersFilter(props) {

  function changeNumber(e){ 
    if(e.target.value<0){
      return ;
    } 
    const { inputHandler }=props;
    if(inputHandler){
      inputHandler(e)
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item container direction='row' alignItems='center'>
          <LocationOnIcon fontSize='large' />
          &ensp;
          <InputLabel>Filter by city:</InputLabel>
          <Grid item xs={12}>
            <LocationFilter  
              placeholder='Enter a city...' 
              onChange={props.locationsHandler} 
              value={props.filters.locationValues}
            />
          </Grid>
        </Grid>
        <Grid item container direction='row' alignItems='center'>
          <EmojiPeopleIcon fontSize='large' />
          &ensp;
          <InputLabel>Filter by age groups:</InputLabel>
          <Grid item xs={12}>
            <FilterSelect
              fetchURL='/api/get-age-group-types'
              optionMap={(x) => {
                return { label: x.name, value: x.id };
              }} 
              placeholder='Ages...'
              name='ageGroupIds'
              onChange={props.selectHandler}
              value={props.filters.ageGroupValues}
            />
          </Grid>
        </Grid>
        <Grid item container direction='row' alignItems='center'>
          <WcIcon fontSize='large' />
          &ensp;
          <InputLabel>Filter by gender:</InputLabel>
          <Grid item xs={12}>
            <FilterSelect
              fetchURL='/api/get-gender-types'
              optionMap={(x) => {
                return { label: x.name, value: x.id };
              }}
              placeholder='Genders...'
              name='genderIds'
              onChange={props.selectGender}
              value={props.filters.genderValues}
            />
          </Grid>
        </Grid>
        <Grid item container direction='row' alignItems='center'>
          <FaceIcon fontSize='large' />
          &ensp;
          <InputLabel>Filter by family status:</InputLabel>
          <Grid item xs={12}>
            <FilterSelect
              fetchURL='/api/get-family-status-types'
              optionMap={(x) => {
                return { label: x.name, value: x.id };
              }}
              placeholder='Family status...'
              name='familyStatusIds'
              onChange={props.familyHandler}
              value={props.filters.familyStatusValues}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container direction='row' alignItems='center'>
          <Grid item xs>
            <GroupAddIcon fontSize='large' />
          </Grid>
          <Grid item xs={5} container justify='flex-start'>
            <InputLabel>Home Capacity:</InputLabel>
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              type='number'
              min={0}
              name='minHomeCapacity'
              autoComplete='minHomeCapacity'
              value={props.filters.minHomeCapacity}
              onChange={changeNumber}
            />
          </Grid>
          <Grid item xs container justify='center'>
            -
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              type='number'
              min={0}
              name='maxHomeCapacity'
              autoComplete='maxHomeCapacity'
              value={props.filters.maxHomeCapacity}
              onChange={changeNumber}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container direction='row' alignItems='center'>
          <Grid item xs>
            <AttachMoneyIcon fontSize='large' />
          </Grid>
          <Grid item xs={5} container justify='flex-start'>
            <InputLabel>Monthly Budget:</InputLabel>
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              type='number'
              name='minMonthlyBudget'
              autoComplete='minMonthlyBudget'
              value={props.filters.minMonthlyBudget}
              onChange={changeNumber}
            />
          </Grid>
          <Grid item xs container justify='center'>
            -
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              type='number'
              name='maxMonthlyBudget'
              autoComplete='maxMonthlyBudget'
              value={props.filters.maxMonthlyBudget}
              onChange={changeNumber}
            />
          </Grid>
        </Grid>
        <Grid item container direction='row' alignItems='center'>
          <PlaylistAddIcon fontSize='large' />
          &ensp;
          <InputLabel>Additional Filters:</InputLabel>
          <Grid item xs={12}>
            <List>
              <ListItem dense disableGutters button onChange={props.checkboxHandler}>
                <ListItemIcon>
                  <Checkbox name='petRestrictions' checked={props.filters.petRestrictions} disableRipple />
                </ListItemIcon>
                <ListItemText primary='Pet Friendly' />
              </ListItem>
              <ListItem dense disableGutters button onChange={props.checkboxHandler}>
                <ListItemIcon>
                  <Checkbox name='religionRestrictions' checked={props.filters.religionRestrictions} disableRipple />
                </ListItemIcon>
                <ListItemText primary='Religious' />
              </ListItem>
              <ListItem dense disableGutters button onChange={props.checkboxHandler}>
                <ListItemIcon>
                  <Checkbox name='smokingRestrictions' checked={props.filters.smokingRestrictions} disableRipple />
                </ListItemIcon>
                <ListItemText primary='Smoking Friendly' />
              </ListItem>
              <ListItem dense disableGutters button onChange={props.checkboxHandler}>
                <ListItemIcon>
                  <Checkbox name='hasHousing' checked={props.filters.hasHousing} disableRipple />
                </ListItemIcon>
                <ListItemText primary='Has Housing' />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default MembersFilter;
