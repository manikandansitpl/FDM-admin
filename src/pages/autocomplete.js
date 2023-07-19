import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeOption } from 'src/redux/reducer';

function ComboBox(props) {
    const dispatch = useDispatch();
    const {autoComplete} = props;
    const [named, setNamed] = React.useState("")
    const handleChange = (newvalue) => {
        dispatch(changeOption({name : newvalue}))

        if (newvalue) {
            sessionStorage.setItem('categories', newvalue?.label)
            setNamed(newvalue)
        }
        else{
            sessionStorage.setItem('categories', "Please select category!")
            setNamed(newvalue)
        }
    }
    useEffect(() => {
        autoComplete(named);
    }, [named])
    return (
        <Autocomplete
            onChange={(e, newvalue) => handleChange(newvalue)}
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Categories"  />}
        />
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    // { label: 'Astro', id: 'astro' },
    // { label: 'NEWS', id: 'news' },
    // { label: 'Songs (lyrics)', id: 'songs' },
    // { label: 'Movies', id: 'movies' },
    // { label: 'Stocks', id: 'stocks' },
    // { label: 'Trading', id: 'trading' },
    { label: 'Post Latest NEWS', id: 'latestNews' },
    { label: 'Post Trending NEWS', id: 'trendingNews' },
];
export default ComboBox