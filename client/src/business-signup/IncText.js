import TextField from '@material-ui/core/TextField';

export default function RadioText(props) {
  if (props.check === 'true') {
    return (
      <TextField
        variant='outlined'
        margin='normal'
        fullWidth
        id={props.name}
        label={props.text}
        name={props.name}
        value={props.value}
      />
    );
  } else return null;
}
