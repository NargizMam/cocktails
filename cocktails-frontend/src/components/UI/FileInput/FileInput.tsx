import React, {useRef, useState} from 'react';
import {Button, Grid, TextField} from '@mui/material';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  name: string;
  label: string;
  filename?: string;
}

const FileInput: React.FC<Props> = ({onChange, name,onClear, label, filename }) => {
    const [filesName, setFilesName] = useState(filename);
    const inputRef = useRef<HTMLInputElement>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFilesName(e.target.files[0].name);
        } else {
            setFilesName('');
        }
        onChange(e);
    };
  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const onClearInput = () => {
      setFilesName('');
      if(onClear) onClear();
  }

  return (
      <>
        <input
            style={{display: 'none'}}
            type="file"
            name={name}
            onChange={onFileChange}
            ref={inputRef}
        />
        <Grid container direction="row" spacing={2} alignItems="center">
          <Grid item xs>
            <TextField
              style={{fontFamily: 'monospace'}}
              disabled
              label={label}
              value={filesName || ''}
              onClick={activateInput}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={activateInput}>Browse</Button>
          </Grid>
          {onClear &&
              (<Grid item>
                <Button variant="contained" onClick={onClearInput}>Clear</Button>
              </Grid>)}
        </Grid>
      </>
  );
};

export default FileInput;
