import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import withHocs from './DirectorMoviesListHoc';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0px auto;
  flex-direction: column;
  flex-wrap: wrap;
}
`

const Movies = styled.div`
  min-width: 220px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 20px;
  padding: 0px 20px;
  justify-content: center;
}
`
const MovieInfoName = styled.h3`
  display: flex;
  margin: 10px 0;
}
`

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;
}
`

const MovieDirector = styled.h2`
  display: flex;
  margin: 10px 0;
}
`
const MovieInfoRate = styled.h4`
  display: flex;
  margin: 5px 0;
}
`
const MovieInfoGenre = styled.h5`
  display: flex;
  margin: 10px 0;
}
`


const MoviesList = (props) => {
  const [directorInfo, setDirectors] = useState([])
  const {id} = props.match.params;
  const { data } = props;
  const { directors = [] } = data

  useEffect(() => {
    if (!data.loading){
      const [director] = directors.filter(item => item.id === id)
      setDirectors(director.movies)
    }
  }, [data])

    return (
      <Wrapper>
        <Movies>
        <MovieDirector>Фильмография</MovieDirector>
        {
            directorInfo.map((movie, key) => (
                <MovieInfo key={movie.name}>
                  <MovieInfoName>{`${key+1}. `}Название: {movie.name}</MovieInfoName>
                  <MovieInfoRate>Рейтинг: {movie.rate}</MovieInfoRate>
                  <MovieInfoGenre>Жанр: {movie.genre}</MovieInfoGenre>
                </MovieInfo>
              ))
        }
        <Link to="/">назад</Link>
        </Movies>
      </Wrapper>
    );
}

export default withHocs(MoviesList);