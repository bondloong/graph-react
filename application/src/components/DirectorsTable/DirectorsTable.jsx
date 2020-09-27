import React from 'react';
import withHocs from './DirectorsTableHoc';
import { Link} from "react-router-dom";
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0px auto;
  flex-direction: column;
  flex-wrap: wrap;
}
`

const Director = styled.div`
  min-width: 220px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: center;
}
`
const DirectorPhoto = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 15px 10px;
}
`

const DirectorInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-basis: 65%;
}
`
const DirectorInfoName = styled.h2`
  display: flex;
  margin: 10px 0;
}
`
const DirectorInfoAge = styled.h3`
  display: flex;
  margin: 5px 0;
}
`
const DirectorInfoMovies = styled.h4`
  display: flex;
  margin: 10px 0;
}
`
const DirectorInfoBIO = styled.div`
  display: flex;
}
`
class DirectorsTable extends React.Component {
  state = {
    movies: []
  };
  // handleShowMovies = (movies) => {
  //   this.setState({movies: movies})
  // }
  render() {
    const { data } = this.props;
    const { directors = [] } = data

    return (
      <Wrapper>
        {directors.map(director => {
          return (
            <Director key={director.id}>
              <DirectorPhoto><Link to={`/director/${director.id}`}><img src={director.photo} alt=""/></Link></DirectorPhoto>
              <DirectorInfo>
                <DirectorInfoName>{director.name}</DirectorInfoName>
                <DirectorInfoAge>{director.age} лет</DirectorInfoAge>
                <DirectorInfoMovies>Фильмов снято: {director.movies.length}<Link to={`/director/${director.id}`}>(подробнее)</Link></DirectorInfoMovies>
                <DirectorInfoBIO>{director.bio} </DirectorInfoBIO>
              </DirectorInfo>
            </Director>
          );
        })}
      </Wrapper>
    );
  }
};

export default withHocs(DirectorsTable);
