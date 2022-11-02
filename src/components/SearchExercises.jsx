import React, { useState, useEffect } from 'react';

import { fetchData, exerciseOptions } from '../utils/fetchData';

import HorizontalScrollBar from './HorizontalScrollBar';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';


const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

      setBodyParts(['all', ...bodyPartsData]);  
    };

    fetchExercisesData();
  }, [])
  

  const handleSearch = async () => {
    if(search) {
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      console.log(exercisesData);

      const searchedExercises = exercisesData.filter((exercise) => 
      exercise.name.toLowerCase().includes(search) || 
      exercise.target.toLowerCase().includes(search) || 
      exercise.equipment.toLowerCase().includes(search) || 
      exercise.bodyPart.toLowerCase().includes(search));

      setSearch('');
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems='center' mt='37px' justifyContent='center' p='20px'>
      <Typography fontWeight={700} mb='50px' textAlign='center' sx={{
        fontSize: { lg: '44px', xs: '30px'}
      }}> 
        Awesome Exercises You <br/> Should Know 
      </Typography>
      <Box position='relative' mb='72px'>
        <TextField height='76px' 
          type='text' placeholder='Search Exercises' value={search} 
          onChange={(e) => { setSearch(e.target.value.toLowerCase())}}  sx={{
            input: { fontWeight: '700', border: 'none', borderRadius: '4px'},
            width: { lg: '800px', 'xs': '350px'},
            backgroundColor: '#fff', borderRadius: '40px'
          }} />
        <Button className='search-btn' sx={{
            bgcolor: '#ff2625', color: '#fff', textTransform: 'none',
            width: { lg: '170px', xs: '80px'}, 
            fontSize: { lg: '20px', xs: '14px'},
            height: '56px', position: 'absolute', right: '0',   borderTopLeftRadius: '0', borderBottomLeftRadius: '0'
          }} onClick={handleSearch}>
          Search
        </Button>
      </Box>

      <Box sx={{
        position: 'relative',
        width: '100%',
        padding: '20px'
      }}>
        <HorizontalScrollBar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart}/>
      </Box>
    </Stack>
  )
}

export default SearchExercises;