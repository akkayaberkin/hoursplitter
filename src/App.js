import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Swal from 'sweetalert2';

function App() {
  const [intervalValue, setIntervalValue] = useState('');
  const [startHour, setStartHour] = useState('10');
  const [endHour, setEndHour] = useState('18');
  const [includeHourStart, setIncludeHourStart] = useState(false);
  const [timeData, setTimeData] = useState([]);

  const handleIntervalChange = (e) => {
    setIntervalValue(e.target.value);
  };

  const handleStartHourChange = (e) => {
    setStartHour(e.target.value);
  };

  const handleEndHourChange = (e) => {
    setEndHour(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIncludeHourStart(e.target.checked);
  };

  const generateTimeData = () => {
    const interval = parseInt(intervalValue, 10);
    if (isNaN(interval) || interval <= 0) {
      Swal.fire('Error', 'Please enter a valid interval.', 'error');
      return;
    }

    const start = parseInt(startHour, 10) || 10;
    const end = parseInt(endHour, 10) || 18;

    if (start >= end) {
      Swal.fire('Error', 'Start hour must be less than end hour.', 'error');
      return;
    }

    const data = [];
    for (let hour = start; hour <= end; hour++) {
      const times = [];
      if (includeHourStart) {
        for (let minutes = 0; minutes < 60; minutes += interval) {
          times.push(`${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
        }
      } else {
        let startMinutes = (hour === start) ? 0 : interval;
        while (startMinutes < 60) {
          times.push(`${hour.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}`);
          startMinutes += interval;
        }
      }
      data.push({ hour, times });
    }

    setTimeData(data);
  };

  const handleButtonClick = (time) => {
    Swal.fire('Selected Time', `You selected: ${time}`, 'info');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Time Divider</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TextField
          type="number"
          label="Start Hour"
          variant="outlined"
          value={startHour}
          onChange={handleStartHourChange}
        />
        <TextField
          type="number"
          label="End Hour"
          variant="outlined"
          value={endHour}
          onChange={handleEndHourChange}
        />
        <TextField
          type="number"
          label="Minute Interval"
          variant="outlined"
          value={intervalValue}
          onChange={handleIntervalChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeHourStart}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="Include hour start"
        />
      </div>
      <Button variant="contained" color="primary" onClick={generateTimeData}>
        Generate Table
      </Button>

      {timeData.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                {timeData.map((hourData, index) => (
                  <TableCell key={index} align="center">
                    {hourData.hour}:00
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {timeData.map((hourData, index) => (
                  <TableCell key={index} align="center">
                    {hourData.times.map((time, i) => (
                      <Button
                        key={i}
                        variant="outlined"
                        color="primary"
                        style={{ margin: '5px' }}
                        onClick={() => handleButtonClick(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default App;
