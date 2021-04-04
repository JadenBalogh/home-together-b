import { useHistory } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const year = new Date().getFullYear();

function MemberList(props) {
  let history = useHistory();

  let handleMemberClicked = (id) => {
    history.push('/member/' + id);
  };

  return (
    <>
      {props.members.map((member) => (
        <Grid
          key={member.id}
          className='member-row'
          container
          alignItems='center'
          justify='space-between'
          onClick={() => handleMemberClicked(member.id)}
        >
          <Grid item xs={12} container spacing={2} alignItems='center' justify='flex-start'>
            <Grid item>
              <Typography variant='h6'>{`${member.firstName} ${member.lastName}`}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>({`${member.gender}, ${year - member.birthYear}`})</Typography>
            </Grid>
            <ChevronRightIcon />
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default MemberList;
